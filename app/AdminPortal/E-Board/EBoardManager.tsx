"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Check, ChevronDown, UserCircle, ChevronUp, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Member = {
  id: string;
  name: string;
  role: string;
  image: string;        // public URL (Supabase Storage or legacy /team/...)
  linkedin?: string;
  email?: string;
  description?: string;
  display_order: number;
};

type EBoard = {
  id: string;           // eboard_years.id
  year: string;
  groupPhoto?: string;
  members: Member[];
};

// ─── Supabase helpers ──────────────────────────────────────────────────────────

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/** Accepts only https:// URLs or empty string. Blocks javascript: and data: URIs. */
function isSafeUrl(url: string): boolean {
  if (!url) return true;
  try {
    const { protocol } = new URL(url);
    return protocol === "https:";
  } catch {
    return false;
  }
}

/** Upload a file to the eboard-photos bucket. Returns the public URL. */
async function uploadPhoto(file: File, folder: string): Promise<string> {
  if (!ALLOWED_MIME.includes(file.type)) {
    throw new Error(`File type "${file.type}" is not allowed. Use JPEG, PNG, WebP, or GIF.`);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`);
  }
  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("eboard-photos")
    .upload(fileName, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("eboard-photos").getPublicUrl(fileName);
  return data.publicUrl;
}

/** Fetch all years with nested members, ordered properly. */
async function fetchBoards(): Promise<EBoard[]> {
  const { data, error } = await supabase
    .from("eboard_years")
    .select("id, year, group_photo_url, eboard_members(*)")
    .order("created_at", { ascending: true });
  if (error) throw error;

  return (data ?? []).map((y: any) => ({
    id: y.id,
    year: y.year,
    groupPhoto: y.group_photo_url ?? undefined,
    members: (y.eboard_members ?? [])
      .sort((a: any, b: any) => a.display_order - b.display_order)
      .map((m: any) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        image: m.image_url ?? "",
        linkedin: m.linkedin ?? undefined,
        email: m.email ?? undefined,
        description: m.description ?? undefined,
        display_order: m.display_order,
      })),
  }));
}

// ─── Small helpers ─────────────────────────────────────────────────────────────
function Avatar({ src, name }: { src: string; name: string }) {
  if (src) {
    return (
      <div className="relative w-10 h-10 rounded-full overflow-hidden border shrink-0" style={{ borderColor: "var(--color-border)" }}>
        <Image src={src} alt={name} fill sizes="40px" className="object-cover object-top" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center border shrink-0" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-progress-track)" }}>
      <UserCircle size={22} style={{ color: "var(--color-text-muted)" }} />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, full }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; full?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
      <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>{label}</label>
      <input
        className="px-2.5 py-1.5 rounded-lg border text-xs font-medium outline-none"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-page-bg)", color: "var(--color-navy)" }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// ─── Member row ────────────────────────────────────────────────────────────────
function MemberRow({ member, onSave, onDelete }: { member: Member; onSave: (m: Member) => void; onDelete: (id: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState({ name: member.name, role: member.role, image: member.image, linkedin: member.linkedin ?? "", email: member.email ?? "" });
  const [imagePreview, setImagePreview] = useState<string>(member.image);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const set = (key: keyof typeof draft) => (v: string) => setDraft((d) => ({ ...d, [key]: v }));

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setPendingFile(file);
  };

  const handleSave = async () => {
    if (draft.linkedin && !isSafeUrl(draft.linkedin)) {
      alert("LinkedIn URL must start with https://");
      return;
    }
    setSaving(true);
    try {
      let imageUrl = draft.image;
      // Upload photo if a new file was selected
      if (pendingFile) {
        imageUrl = await uploadPhoto(pendingFile, "members");
        setPendingFile(null);
      }
      const updates = { name: draft.name, role: draft.role, image_url: imageUrl, linkedin: draft.linkedin || null, email: draft.email || null };
      const { error } = await supabase.from("eboard_members").update(updates).eq("id", member.id);
      if (error) throw error;
      onSave({ ...member, ...draft, image: imageUrl, description: member.description });
      setDraft((d) => ({ ...d, image: imageUrl }));
      setImagePreview(imageUrl);
      setEditing(false);
      setExpanded(false);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save member. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft({ name: member.name, role: member.role, image: member.image, linkedin: member.linkedin ?? "", email: member.email ?? "" });
    setImagePreview(member.image);
    setPendingFile(null);
    setEditing(false);
    setExpanded(false);
  };

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card-bg)" }}>
      <div className="flex items-center gap-4 px-4 py-3">
        <Avatar src={editing ? imagePreview : member.image} name={member.name} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: "var(--color-navy)" }}>{member.name || "No name"}</p>
          <p className="text-[11px] font-medium truncate" style={{ color: "var(--color-text-muted)" }}>{member.role || "—"}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {!editing && (
            <button onClick={() => { setEditing(true); setExpanded(true); }} className="p-1.5 rounded-lg" style={{ backgroundColor: "var(--color-progress-track)", color: "var(--color-slate)" }} title="Edit">
              <Pencil size={13} />
            </button>
          )}
          <button onClick={() => onDelete(member.id)} className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(163,32,53,0.08)", color: "var(--color-crimson)" }} title="Delete">
            <Trash2 size={13} />
          </button>
          <button onClick={() => setExpanded((v) => !v)} className="p-1.5 rounded-lg" style={{ backgroundColor: "var(--color-progress-track)", color: "var(--color-slate)" }}>
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t px-4 py-4 flex flex-col gap-4" style={{ borderColor: "var(--color-border)" }}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name *" value={draft.name} onChange={set("name")} placeholder="Full name" />
            <Field label="Role *" value={draft.role} onChange={set("role")} placeholder="e.g. President" />
            <Field label="LinkedIn URL" value={draft.linkedin!} onChange={set("linkedin")} placeholder="https://linkedin.com/in/..." full />
            <Field label="Email" value={draft.email!} onChange={set("email")} placeholder="user@stevens.edu" full />
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Photo</label>
              <div className="flex items-center gap-3">
                {imagePreview && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border shrink-0" style={{ borderColor: "var(--color-border)" }}>
                    <Image src={imagePreview} alt="preview" fill sizes="40px" className="object-cover object-top" />
                  </div>
                )}
                <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors" style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "var(--color-progress-track)" }}>
                  Upload photo
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              </div>
            </div>
          </div>
          {editing && (
            <div className="flex gap-2 justify-end">
              <button onClick={handleCancel} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold" style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "transparent" }}>
                <X size={12} /> Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: "var(--color-crimson)", opacity: saving ? 0.7 : 1 }}>
                {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} {saving ? "Saving…" : "Save"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function EBoardManager() {
  const [boards, setBoards] = useState<EBoard[]>([]);
  const [yearIdx, setYearIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addingYear, setAddingYear] = useState(false);
  const [newYear, setNewYear] = useState({ year: "", groupPhoto: "" });
  const [newYearFile, setNewYearFile] = useState<File | null>(null);
  const [savingYear, setSavingYear] = useState(false);

  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", image: "", linkedin: "", email: "" });
  const [newMemberPreview, setNewMemberPreview] = useState("");
  const [newMemberFile, setNewMemberFile] = useState<File | null>(null);
  const [savingMember, setSavingMember] = useState(false);

  // ── Fetch on mount ─────────────────────────────────────────────────────────
  const loadBoards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBoards();
      setBoards(data);
      // Keep yearIdx in bounds
      setYearIdx((prev) => Math.min(prev, Math.max(0, data.length - 1)));
    } catch (err: any) {
      console.error("Fetch failed:", err);
      setError(err.message ?? "Failed to load E-Board data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadBoards(); }, [loadBoards]);

  // ── Guard ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3">
        <Loader2 size={20} className="animate-spin" style={{ color: "var(--color-crimson)" }} />
        <span className="text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>Loading E-Board…</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-sm font-semibold" style={{ color: "var(--color-crimson)" }}>Error: {error}</p>
        <button onClick={loadBoards} className="text-xs font-bold px-4 py-2 rounded-lg" style={{ backgroundColor: "var(--color-progress-track)", color: "var(--color-navy)" }}>Retry</button>
      </div>
    );
  }

  const board = boards[yearIdx];
  if (!board) {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>No E-Board years found.</p>
        <button onClick={() => setAddingYear(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold" style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "var(--color-card-bg)" }}>
          <Plus size={13} /> Add First Year
        </button>
      </div>
    );
  }

  // ── Handlers (all wired to Supabase) ───────────────────────────────────────

  const handleSaveMember = (updated: Member) => {
    // Optimistic: MemberRow already did the DB call
    setBoards((prev) => prev.map((b, i) => i === yearIdx ? { ...b, members: b.members.map((m) => (m.id === updated.id ? updated : m)) } : b));
  };

  const handleDeleteMember = async (id: string) => {
    // Optimistic update
    setBoards((prev) => prev.map((b, i) => i === yearIdx ? { ...b, members: b.members.filter((m) => m.id !== id) } : b));
    const { error } = await supabase.from("eboard_members").delete().eq("id", id);
    if (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete member.");
      loadBoards(); // rollback
    }
  };

  const handleAddMember = async () => {
    if (!newMember.name.trim() || !newMember.role.trim()) return;
    if (newMember.linkedin && !isSafeUrl(newMember.linkedin)) {
      alert("LinkedIn URL must start with https://");
      return;
    }
    setSavingMember(true);
    try {
      let imageUrl = newMember.image;
      if (newMemberFile) {
        imageUrl = await uploadPhoto(newMemberFile, "members");
      }
      const { data, error } = await supabase.from("eboard_members").insert({
        year_id: board.id,
        name: newMember.name.trim(),
        role: newMember.role.trim(),
        image_url: imageUrl || null,
        linkedin: newMember.linkedin.trim() || null,
        email: newMember.email.trim() || null,
        display_order: board.members.length + 1,
      }).select().single();
      if (error) throw error;

      const member: Member = {
        id: data.id,
        name: data.name,
        role: data.role,
        image: data.image_url ?? "",
        linkedin: data.linkedin ?? undefined,
        email: data.email ?? undefined,
        description: data.description ?? undefined,
        display_order: data.display_order,
      };
      setBoards((prev) => prev.map((b, i) => i === yearIdx ? { ...b, members: [...b.members, member] } : b));
      setNewMember({ name: "", role: "", image: "", linkedin: "", email: "" });
      setNewMemberPreview("");
      setNewMemberFile(null);
      setAddingMember(false);
    } catch (err) {
      console.error("Add member failed:", err);
      alert("Failed to add member. Check console for details.");
    } finally {
      setSavingMember(false);
    }
  };

  const handleAddYear = async () => {
    if (!newYear.year.trim() || boards.some((b) => b.year === newYear.year.trim())) return;
    setSavingYear(true);
    try {
      let photoUrl = newYear.groupPhoto.trim() || null;
      if (newYearFile) {
        photoUrl = await uploadPhoto(newYearFile, "group-photos");
      }
      const { data, error } = await supabase.from("eboard_years").insert({
        year: newYear.year.trim(),
        group_photo_url: photoUrl,
      }).select().single();
      if (error) throw error;

      const entry: EBoard = { id: data.id, year: data.year, groupPhoto: data.group_photo_url ?? undefined, members: [] };
      setBoards((prev) => [...prev, entry]);
      setYearIdx(boards.length);
      setNewYear({ year: "", groupPhoto: "" });
      setNewYearFile(null);
      setAddingYear(false);
    } catch (err) {
      console.error("Add year failed:", err);
      alert("Failed to add year. Check console for details.");
    } finally {
      setSavingYear(false);
    }
  };

  const handleGroupPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadPhoto(file, "group-photos");
      const { error } = await supabase.from("eboard_years").update({ group_photo_url: url }).eq("id", board.id);
      if (error) throw error;
      setBoards((prev) => prev.map((b, i) => i === yearIdx ? { ...b, groupPhoto: url } : b));
    } catch (err) {
      console.error("Group photo upload failed:", err);
      alert("Failed to upload group photo.");
    }
  };

  const setN = (key: keyof typeof newMember) => (v: string) => setNewMember((d) => ({ ...d, [key]: v }));

  const handleNewMemberPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setNewMemberPreview(localUrl);
    setNewMemberFile(file);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-extrabold" style={{ color: "var(--color-navy)" }}>E-Board</h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <select value={yearIdx} onChange={(e) => setYearIdx(Number(e.target.value))}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border text-xs font-bold outline-none cursor-pointer"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card-bg)", color: "var(--color-navy)" }}>
              {boards.map((b, i) => <option key={b.id} value={i}>{b.year}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }} />
          </div>

          {addingYear ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              <input autoFocus className="px-2.5 py-2 rounded-lg border text-xs font-medium outline-none w-28"
                style={{ borderColor: "var(--color-crimson)", backgroundColor: "var(--color-card-bg)", color: "var(--color-navy)" }}
                placeholder="2027/2028" value={newYear.year}
                onChange={(e) => setNewYear((d) => ({ ...d, year: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddYear(); if (e.key === "Escape") setAddingYear(false); }}
              />
              <label className="flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs font-semibold cursor-pointer" style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "var(--color-card-bg)" }}>
                {newYearFile ? "Photo selected ✓" : "Group photo (optional)"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setNewYearFile(file);
                  setNewYear((d) => ({ ...d, groupPhoto: URL.createObjectURL(file) }));
                }} />
              </label>
              <button onClick={handleAddYear} disabled={savingYear} className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#16a34a" }}>
                {savingYear ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
              </button>
              <button onClick={() => { setAddingYear(false); setNewYearFile(null); }} className="p-1.5 rounded-lg" style={{ backgroundColor: "var(--color-progress-track)", color: "var(--color-slate)" }}><X size={13} /></button>
            </div>
          ) : (
            <button onClick={() => setAddingYear(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold"
              style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "var(--color-card-bg)" }}>
              <Plus size={13} /> New Year
            </button>
          )}
        </div>
      </div>

      {/* Group photo */}
      <div className="relative w-full h-36 rounded-xl overflow-hidden border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-progress-track)" }}>
        {board.groupPhoto ? (
          <Image src={board.groupPhoto} alt={`${board.year} group photo`} fill sizes="700px" className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>No group photo set</p>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
          Group Photo — {board.year}
        </span>
        {/* Upload button overlay */}
        <label className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-opacity hover:opacity-90"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "#fff" }}>
          {board.groupPhoto ? "Change photo" : "Upload photo"}
          <input type="file" accept="image/*" className="hidden" onChange={handleGroupPhotoUpload} />
        </label>
      </div>

      {/* Member list */}
      <div className="flex flex-col gap-2">
        {board.members.length === 0 && !addingMember && (
          <p className="text-xs font-medium py-6 text-center" style={{ color: "var(--color-text-muted)" }}>
            No members for {board.year}. Add the first one below.
          </p>
        )}

        {board.members.map((m) => (
          <MemberRow key={m.id} member={m} onSave={handleSaveMember} onDelete={handleDeleteMember} />
        ))}

        {addingMember ? (
          <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--color-crimson)", backgroundColor: "var(--color-card-bg)" }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-crimson)" }}>New Member</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name *" value={newMember.name} onChange={setN("name")} placeholder="Full name" />
              <Field label="Role *" value={newMember.role} onChange={setN("role")} placeholder="e.g. President" />
              <Field label="LinkedIn URL" value={newMember.linkedin} onChange={setN("linkedin")} placeholder="https://linkedin.com/in/..." full />
              <Field label="Email" value={newMember.email} onChange={setN("email")} placeholder="user@stevens.edu" full />
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Photo</label>
                <div className="flex items-center gap-3">
                  {newMemberPreview && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border shrink-0" style={{ borderColor: "var(--color-border)" }}>
                      <Image src={newMemberPreview} alt="preview" fill sizes="40px" className="object-cover object-top" />
                    </div>
                  )}
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer" style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "var(--color-progress-track)" }}>
                    Upload photo
                    <input type="file" accept="image/*" className="hidden" onChange={handleNewMemberPhoto} />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => { setAddingMember(false); setNewMember({ name: "", role: "", image: "", linkedin: "", email: "" }); setNewMemberPreview(""); setNewMemberFile(null); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold"
                style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "transparent" }}>
                <X size={12} /> Cancel
              </button>
              <button onClick={handleAddMember} disabled={savingMember}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: "var(--color-crimson)", opacity: savingMember ? 0.7 : 1 }}>
                {savingMember ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />} {savingMember ? "Adding…" : "Add Member"}
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAddingMember(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed text-xs font-bold transition-colors"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--color-crimson)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--color-border)"}
          >
            <Plus size={13} /> Add Member
          </button>
        )}
      </div>
    </div>
  );
}
