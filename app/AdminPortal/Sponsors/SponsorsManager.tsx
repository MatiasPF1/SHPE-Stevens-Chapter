"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ─── Types ─────────────────────────────────────────────────────────────────────
type SponsorContent = {
  id: string;
  main_image_url: string;
};

type Sponsor = {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
  width: number;
  height: number;
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

async function uploadPhoto(file: File, folder: string): Promise<string> {
  if (!ALLOWED_MIME.includes(file.type)) {
    throw new Error(`File type "${file.type}" is not allowed.`);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB).`);
  }
  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("sponsors-photos")
    .upload(fileName, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("sponsors-photos").getPublicUrl(fileName);
  return data.publicUrl;
}

// ─── Small Components ──────────────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>{label}</label>
      <input
        className="px-2.5 py-1.5 rounded-lg border text-xs font-medium outline-none w-full"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-page-bg)", color: "var(--color-navy)" }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// ─── Sponsor Row ───────────────────────────────────────────────────────────────
function SponsorRow({ sponsor, onSave, onDelete }: { sponsor: Sponsor; onSave: (s: Sponsor) => void; onDelete: (id: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState({ name: sponsor.name, image_url: sponsor.image_url, width: sponsor.width || 200, height: sponsor.height || 100 });
  const [imagePreview, setImagePreview] = useState<string>(sponsor.image_url);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setPendingFile(file);
  };

  const handleSave = async () => {
    if (!draft.name.trim()) return;
    setSaving(true);
    try {
      let imageUrl = draft.image_url;
      if (pendingFile) {
        imageUrl = await uploadPhoto(pendingFile, "logos");
        setPendingFile(null);
      }
      const { error } = await supabase.from("sponsors").update({ name: draft.name, image_url: imageUrl, width: draft.width, height: draft.height }).eq("id", sponsor.id);
      if (error) throw error;
      onSave({ ...sponsor, name: draft.name, image_url: imageUrl, width: draft.width, height: draft.height });
      setDraft((d) => ({ ...d, image_url: imageUrl }));
      setImagePreview(imageUrl);
      setEditing(false);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save sponsor.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft({ name: sponsor.name, image_url: sponsor.image_url, width: sponsor.width || 200, height: sponsor.height || 100 });
    setImagePreview(sponsor.image_url);
    setPendingFile(null);
    setEditing(false);
  };

  return (
    <div className="rounded-xl border p-4 flex flex-col gap-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card-bg)" }}>
      {editing ? (
        <div className="flex flex-col gap-3">
          <Field label="Sponsor Name *" value={draft.name} onChange={(v) => setDraft(d => ({ ...d, name: v }))} placeholder="e.g. Merck" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Width (px)" value={String(draft.width)} onChange={(v) => setDraft(d => ({ ...d, width: Number(v) || 200 }))} placeholder="200" />
            <Field label="Height (px)" value={String(draft.height)} onChange={(v) => setDraft(d => ({ ...d, height: Number(v) || 100 }))} placeholder="100" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Sponsor Logo</label>
            <div className="flex items-center gap-3">
              {imagePreview && (
                <div className="relative w-16 h-12 rounded overflow-hidden border shrink-0 bg-white" style={{ borderColor: "var(--color-border)" }}>
                  <Image src={imagePreview} alt="preview" fill className="object-contain" />
                </div>
              )}
              <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors" style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "var(--color-progress-track)" }}>
                Upload Logo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button onClick={handleCancel} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold" style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "transparent" }}>
              <X size={12} /> Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: "var(--color-crimson)", opacity: saving ? 0.7 : 1 }}>
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-12 rounded overflow-hidden border shrink-0 bg-white" style={{ borderColor: "var(--color-border)" }}>
            <Image src={sponsor.image_url} alt={sponsor.name} fill className="object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "var(--color-navy)" }}>{sponsor.name}</p>
            <p className="text-[11px] font-medium text-gray-500 mt-0.5">{sponsor.width || 200}x{sponsor.height || 100} px</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg" style={{ backgroundColor: "var(--color-progress-track)", color: "var(--color-slate)" }} title="Edit">
              <Pencil size={13} />
            </button>
            <button onClick={() => onDelete(sponsor.id)} className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(163,32,53,0.08)", color: "var(--color-crimson)" }} title="Delete">
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function SponsorsManager() {
  const [content, setContent] = useState<SponsorContent | null>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [addingSponsor, setAddingSponsor] = useState(false);
  const [newSponsor, setNewSponsor] = useState({ name: "", image_url: "", width: 200, height: 100 });
  const [newSponsorPreview, setNewSponsorPreview] = useState("");
  const [newSponsorFile, setNewSponsorFile] = useState<File | null>(null);
  const [savingSponsor, setSavingSponsor] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [contentRes, sponsorsRes] = await Promise.all([
        supabase.from("sponsors_content").select("*").limit(1).single(),
        supabase.from("sponsors").select("*").order("display_order", { ascending: true })
      ]);
      if (contentRes.data) setContent(contentRes.data);
      if (sponsorsRes.data) setSponsors(sponsorsRes.data);
    } catch (err: any) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !content) return;
    try {
      const url = await uploadPhoto(file, "main-image");
      const { error } = await supabase.from("sponsors_content").update({ main_image_url: url }).eq("id", content.id);
      if (error) throw error;
      setContent((prev) => prev ? { ...prev, main_image_url: url } : null);
    } catch (err) {
      console.error("Main image upload failed:", err);
      alert("Failed to upload main image.");
    }
  };

  const handleAddSponsor = async () => {
    if (!newSponsor.name.trim() || !newSponsorFile) {
      alert("Please provide a name and upload a logo.");
      return;
    }
    setSavingSponsor(true);
    try {
      const imageUrl = await uploadPhoto(newSponsorFile, "logos");
      const { data, error } = await supabase.from("sponsors").insert({
        name: newSponsor.name.trim(),
        image_url: imageUrl,
        display_order: sponsors.length + 1,
        width: newSponsor.width,
        height: newSponsor.height,
      }).select().single();
      if (error) throw error;

      setSponsors((prev) => [...prev, data]);
      setNewSponsor({ name: "", image_url: "", width: 200, height: 100 });
      setNewSponsorPreview("");
      setNewSponsorFile(null);
      setAddingSponsor(false);
    } catch (err) {
      console.error("Add sponsor failed:", err);
      alert("Failed to add sponsor.");
    } finally {
      setSavingSponsor(false);
    }
  };

  const handleSaveSponsor = (updated: Sponsor) => {
    setSponsors((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteSponsor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sponsor?")) return;
    const { error } = await supabase.from("sponsors").delete().eq("id", id);
    if (error) {
      alert("Failed to delete sponsor.");
      return;
    }
    setSponsors((prev) => prev.filter((s) => s.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3">
        <Loader2 size={20} className="animate-spin" style={{ color: "var(--color-crimson)" }} />
        <span className="text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>Loading Sponsors…</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-navy)" }}>Sponsors Settings</h2>
        
        {/* Main Image */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Main Introduction Image</h3>
          <div className="relative w-full h-48 rounded-xl overflow-hidden border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-progress-track)" }}>
            {content?.main_image_url ? (
              <Image src={content.main_image_url} alt="Main Sponsors Image" fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>No main image set</p>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <label className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "#fff" }}>
              {content?.main_image_url ? "Change image" : "Upload image"}
              <input type="file" accept="image/*" className="hidden" onChange={handleMainImageUpload} />
            </label>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200" style={{ backgroundColor: "var(--color-border)" }} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold" style={{ color: "var(--color-navy)" }}>Sponsor Logos</h2>
          {!addingSponsor && (
            <button onClick={() => setAddingSponsor(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold"
              style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "var(--color-card-bg)" }}>
              <Plus size={13} /> Add Sponsor
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {sponsors.length === 0 && !addingSponsor && (
            <p className="text-xs font-medium py-6 text-center" style={{ color: "var(--color-text-muted)" }}>
              No sponsors added yet.
            </p>
          )}

          {sponsors.map((s) => (
            <SponsorRow key={s.id} sponsor={s} onSave={handleSaveSponsor} onDelete={handleDeleteSponsor} />
          ))}

          {addingSponsor && (
            <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--color-crimson)", backgroundColor: "var(--color-card-bg)" }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-crimson)" }}>New Sponsor</p>
              <div className="flex flex-col gap-3">
                <Field label="Sponsor Name *" value={newSponsor.name} onChange={(v) => setNewSponsor(d => ({ ...d, name: v }))} placeholder="e.g. Merck" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Width (px)" value={String(newSponsor.width)} onChange={(v) => setNewSponsor(d => ({ ...d, width: Number(v) || 200 }))} placeholder="200" />
                  <Field label="Height (px)" value={String(newSponsor.height)} onChange={(v) => setNewSponsor(d => ({ ...d, height: Number(v) || 100 }))} placeholder="100" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Sponsor Logo *</label>
                  <div className="flex items-center gap-3">
                    {newSponsorPreview && (
                      <div className="relative w-16 h-12 rounded overflow-hidden border shrink-0 bg-white" style={{ borderColor: "var(--color-border)" }}>
                        <Image src={newSponsorPreview} alt="preview" fill className="object-contain" />
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer" style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "var(--color-progress-track)" }}>
                      Upload Logo
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setNewSponsorPreview(URL.createObjectURL(file));
                        setNewSponsorFile(file);
                      }} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button onClick={() => { setAddingSponsor(false); setNewSponsor({ name: "", image_url: "", width: 200, height: 100 }); setNewSponsorPreview(""); setNewSponsorFile(null); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "transparent" }}>
                  <X size={12} /> Cancel
                </button>
                <button onClick={handleAddSponsor} disabled={savingSponsor}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--color-crimson)", opacity: savingSponsor ? 0.7 : 1 }}>
                  {savingSponsor ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />} {savingSponsor ? "Adding…" : "Add Sponsor"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
