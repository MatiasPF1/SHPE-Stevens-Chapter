import TeamSection from "@/components_team/team-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the SHPE Stevens executive board and leadership team driving professional development, outreach, and community impact.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Team | SHPE Stevens",
    description:
      "Meet the SHPE Stevens executive board and leadership team driving professional development, outreach, and community impact.",
    url: "https://stevensshpe.org/team",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team | SHPE Stevens",
    description:
      "Meet the SHPE Stevens executive board and leadership team driving professional development, outreach, and community impact.",
    images: ["/og-image.png"],
  },
};

export default function TeamPage() {
  return (
    <main>
      <TeamSection />
    </main>
  );
}
