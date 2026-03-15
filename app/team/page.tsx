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
    url: "/team",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function TeamPage() {
  return (
    <div>
      <TeamSection />
    </div>
  );
}
