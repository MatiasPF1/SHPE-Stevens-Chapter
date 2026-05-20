"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { LayoutDashboard, Image as ImageIcon, Briefcase, Users, Globe, LogOut, User } from "lucide-react";

type ActiveTab = "overview" | "gallery" | "sponsors" | "eboard";

const NAV_ITEMS: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "gallery",  label: "Gallery",  icon: ImageIcon },
  { id: "sponsors", label: "Sponsors", icon: Briefcase },
  { id: "eboard",   label: "E-Board",  icon: Users },
];

export default function AdminPortalPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) router.push("/login");
      else setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) router.push("/login");
      else setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-page-bg)" }}
      >
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "var(--color-crimson) transparent var(--color-crimson) transparent" }}
        />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-page-bg)", color: "var(--color-navy)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 flex flex-col justify-between border-r"
        style={{ backgroundColor: "var(--color-card-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="flex flex-col gap-6 p-6">

          {/* Brand */}
          <div className="flex flex-col gap-0.5 pb-5 border-b" style={{ borderColor: "var(--color-border)" }}>
            <span className="text-sm font-extrabold tracking-wide uppercase" style={{ color: "var(--color-navy)" }}>
              SHPE Stevens
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
              Admin Portal
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide text-left transition-colors"
                  style={{
                    backgroundColor: active ? "var(--color-crimson)" : "transparent",
                    color: active ? "#fff" : "var(--color-slate)",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = "var(--color-progress-track)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-2 p-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-2.5 px-1 mb-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center border shrink-0"
              style={{ borderColor: "var(--color-border)", color: "var(--color-crimson)" }}
            >
              <User size={13} />
            </div>
            <p className="text-[11px] font-semibold truncate" style={{ color: "var(--color-navy)" }}>
              {session.user.email}
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-colors"
            style={{ borderColor: "var(--color-border)", color: "var(--color-slate)", backgroundColor: "transparent" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-progress-track)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <Globe size={13} /> View Site
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-colors"
            style={{
              borderColor: "rgba(163, 32, 53, 0.25)",
              color: "var(--color-crimson)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(163, 32, 53, 0.06)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <LogOut size={13} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-y-auto">

        <header
          className="h-16 border-b flex items-center px-8 shrink-0"
          style={{ backgroundColor: "var(--color-card-bg)", borderColor: "var(--color-border)" }}
        >
          <h1 className="text-sm font-extrabold tracking-wide uppercase" style={{ color: "var(--color-navy)" }}>
            {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
          </h1>
        </header>

        <div className="flex-1 p-8">
          {activeTab === "overview" && (
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold" style={{ color: "var(--color-navy)" }}>
                Welcome back.
              </h2>
              <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                Select a section from the sidebar to get started.
              </p>
            </div>
          )}

          {activeTab === "gallery" && (
            <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Gallery manager - coming soon.</p>
          )}

          {activeTab === "sponsors" && (
            <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Sponsors manager - coming soon.</p>
          )}

          {activeTab === "eboard" && (
            <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>E-Board manager - coming soon.</p>
          )}
        </div>
      </main>
    </div>
  );
}
