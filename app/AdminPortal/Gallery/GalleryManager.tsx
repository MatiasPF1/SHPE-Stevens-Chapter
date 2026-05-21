"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2, ImagePlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────
type GalleryPhoto = {
  id: string;
  public_url: string;
  storage_path: string;
  display_order: number;
};

type GalleryEvent = {
  id: string;
  title: string;
  caption: string;
  display_order: number;
  photos: GalleryPhoto[];
};

// ─── Supabase helpers ─────────────────────────────────────────────────────────
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

async function uploadPhoto(file: File, eventId: string): Promise<{ publicUrl: string; storagePath: string }> {
  if (!ALLOWED_MIME.includes(file.type)) {
    throw new Error(`File type "${file.type}" is not allowed. Use JPEG, PNG, WebP, or GIF.`);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`);
  }
  const ext = file.name.split(".").pop() ?? "jpg";
  const storagePath = `${eventId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("gallery-photos")
    .upload(storagePath, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("gallery-photos").getPublicUrl(storagePath);
  return { publicUrl: data.publicUrl, storagePath };
}

async function fetchEvents(): Promise<GalleryEvent[]> {
  const { data, error } = await supabase
    .from("gallery_events")
    .select("id, title, caption, display_order, gallery_photos(*)")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((e: any) => ({
    id: e.id,
    title: e.title,
    caption: e.caption,
    display_order: e.display_order,
    photos: (e.gallery_photos ?? [])
      .sort((a: any, b: any) => a.display_order - b.display_order || a.created_at?.localeCompare(b.created_at))
      .map((p: any) => ({
        id: p.id,
        public_url: p.public_url,
        storage_path: p.storage_path,
        display_order: p.display_order,
      })),
  }));
}

// ─── GalleryManager ───────────────────────────────────────────────────────────
export default function GalleryManager() {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // New event form
  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [creating, setCreating] = useState(false);

  // Per-event upload state
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    try {
      setEvents(await fetchEvents());
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Create event ────────────────────────────────────────────────────────────
  const handleCreateEvent = async () => {
    const title = newTitle.trim();
    const caption = newCaption.trim();
    if (!title) return;
    setCreating(true);
    try {
      const { data, error } = await supabase
        .from("gallery_events")
        .insert({ title, caption })
        .select()
        .single();
      if (error) throw error;
      setEvents((prev) => [...prev, { ...data, photos: [] }]);
      setNewTitle("");
      setNewCaption("");
      setExpandedId(data.id);
    } catch (err) {
      console.error("Failed to create event:", err);
      alert("Could not create event. Try again.");
    } finally {
      setCreating(false);
    }
  };

  // ── Delete event ────────────────────────────────────────────────────────────
  const handleDeleteEvent = async (event: GalleryEvent) => {
    if (!confirm(`Delete "${event.title}" and all its photos? This cannot be undone.`)) return;
    setDeleting((d) => ({ ...d, [event.id]: true }));
    try {
      // Delete all storage files first
      if (event.photos.length > 0) {
        const paths = event.photos.map((p) => p.storage_path);
        await supabase.storage.from("gallery-photos").remove(paths);
      }
      const { error } = await supabase.from("gallery_events").delete().eq("id", event.id);
      if (error) throw error;
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
      if (expandedId === event.id) setExpandedId(null);
    } catch (err) {
      console.error("Failed to delete event:", err);
      alert("Could not delete event. Try again.");
    } finally {
      setDeleting((d) => ({ ...d, [event.id]: false }));
    }
  };

  // ── Upload photos ───────────────────────────────────────────────────────────
  const handleUploadPhotos = async (eventId: string, files: FileList) => {
    if (!files.length) return;
    setUploading((u) => ({ ...u, [eventId]: true }));
    try {
      const uploaded: GalleryPhoto[] = [];
      for (const file of Array.from(files)) {
        const { publicUrl, storagePath } = await uploadPhoto(file, eventId);
        const { data, error } = await supabase
          .from("gallery_photos")
          .insert({ event_id: eventId, public_url: publicUrl, storage_path: storagePath })
          .select()
          .single();
        if (error) throw error;
        uploaded.push({ id: data.id, public_url: publicUrl, storage_path: storagePath, display_order: data.display_order });
      }
      setEvents((prev) =>
        prev.map((e) => e.id === eventId ? { ...e, photos: [...e.photos, ...uploaded] } : e)
      );
    } catch (err: any) {
      console.error("Upload failed:", err);
      alert(err.message ?? "Upload failed. Try again.");
    } finally {
      setUploading((u) => ({ ...u, [eventId]: false }));
    }
  };

  // ── Delete single photo ─────────────────────────────────────────────────────
  const handleDeletePhoto = async (eventId: string, photo: GalleryPhoto) => {
    const key = photo.id;
    setDeleting((d) => ({ ...d, [key]: true }));
    try {
      await supabase.storage.from("gallery-photos").remove([photo.storage_path]);
      const { error } = await supabase.from("gallery_photos").delete().eq("id", photo.id);
      if (error) throw error;
      setEvents((prev) =>
        prev.map((e) => e.id === eventId ? { ...e, photos: e.photos.filter((p) => p.id !== photo.id) } : e)
      );
    } catch (err) {
      console.error("Failed to delete photo:", err);
      alert("Could not delete photo. Try again.");
    } finally {
      setDeleting((d) => ({ ...d, [key]: false }));
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={22} className="animate-spin" style={{ color: "var(--color-crimson)" }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">

      {/* ── New Event Form ─────────────────────────────────────────────────── */}
      <div className="rounded-xl border p-5 flex flex-col gap-4"
        style={{ backgroundColor: "var(--color-card-bg)", borderColor: "var(--color-border)" }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
          New Event
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Title</label>
            <input
              className="px-2.5 py-1.5 rounded-lg border text-xs font-medium outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-page-bg)", color: "var(--color-navy)" }}
              placeholder="Game Night"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateEvent()}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Caption</label>
            <input
              className="px-2.5 py-1.5 rounded-lg border text-xs font-medium outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-page-bg)", color: "var(--color-navy)" }}
              placeholder="Short description of the event"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateEvent()}
            />
          </div>
        </div>
        <button
          onClick={handleCreateEvent}
          disabled={creating || !newTitle.trim()}
          className="self-start flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-opacity disabled:opacity-50 cursor-pointer"
          style={{ backgroundColor: "var(--color-crimson)", color: "#fff" }}
        >
          {creating ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
          Create Event
        </button>
      </div>

      {/* ── Event List ─────────────────────────────────────────────────────── */}
      {events.length === 0 ? (
        <p className="text-sm font-medium text-center py-10" style={{ color: "var(--color-text-muted)" }}>
          No events yet. Create one above.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {events.map((event) => {
            const expanded = expandedId === event.id;
            const isDeleting = deleting[event.id];
            const isUploading = uploading[event.id];
            return (
              <div key={event.id} className="rounded-xl border overflow-hidden"
                style={{ backgroundColor: "var(--color-card-bg)", borderColor: "var(--color-border)" }}>

                {/* Event header row */}
                <div className="flex items-center justify-between px-5 py-3 gap-3">
                  <button
                    className="flex items-center gap-2 flex-1 text-left"
                    onClick={() => setExpandedId(expanded ? null : event.id)}
                  >
                    {expanded ? <ChevronUp size={14} style={{ color: "var(--color-slate)" }} /> : <ChevronDown size={14} style={{ color: "var(--color-slate)" }} />}
                    <span className="text-sm font-bold" style={{ color: "var(--color-navy)" }}>{event.title}</span>
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>— {event.caption}</span>
                    <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "var(--color-progress-track)", color: "var(--color-slate)" }}>
                      {event.photos.length} photo{event.photos.length !== 1 ? "s" : ""}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event)}
                    disabled={isDeleting}
                    className="p-1.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    style={{ color: "var(--color-crimson)" }}
                    title="Delete event"
                  >
                    {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>

                {/* Expanded photo grid */}
                {expanded && (
                  <div className="px-5 pb-5 flex flex-col gap-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <div className="pt-4 grid grid-cols-3 gap-3">
                      {event.photos.map((photo) => {
                        const isDeletingPhoto = deleting[photo.id];
                        return (
                          <div key={photo.id} className="relative aspect-[4/3] rounded-lg overflow-hidden"
                            style={{ backgroundColor: "var(--color-progress-track)" }}>
                            <Image src={photo.public_url} alt="" fill className="object-cover" sizes="200px" />
                            <button
                              onClick={() => handleDeletePhoto(event.id, photo)}
                              disabled={isDeletingPhoto}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-opacity disabled:opacity-100 cursor-pointer"
                              style={{ backgroundColor: "rgba(163,32,53,0.85)" }}
                              title="Delete photo"
                            >
                              {isDeletingPhoto ? <Loader2 size={11} className="animate-spin text-white" /> : <Trash2 size={11} className="text-white" />}
                            </button>
                          </div>
                        );
                      })}

                      {/* Upload tile */}
                      <label className="aspect-[4/3] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--color-crimson)"}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--color-border)"}
                      >
                        {isUploading
                          ? <Loader2 size={18} className="animate-spin" style={{ color: "var(--color-crimson)" }} />
                          : <><ImagePlus size={18} /><span className="text-[10px] font-bold uppercase tracking-wide">Add Photos</span></>
                        }
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          multiple
                          className="hidden"
                          disabled={isUploading}
                          onChange={(e) => e.target.files && handleUploadPhotos(event.id, e.target.files)}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
