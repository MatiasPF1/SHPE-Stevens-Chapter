import type { Metadata } from "next";
import Introduction from "@/components_Sponsors/introduction";
import Sponsors from "@/components_Sponsors/sponsors";
import BecomeSponsor from "@/components_Sponsors/becomeSponsor";
import PartnershipTiers from "@/components_Sponsors/partnershipTiers";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Support SHPE Stevens and invest in the next generation of Hispanic engineers. Explore partnership tiers and sponsorship opportunities at Stevens Institute of Technology.",
  alternates: {
    canonical: "/sponsors",
  },
  openGraph: {
    title: "Sponsors | SHPE Stevens",
    description:
      "Support SHPE Stevens and invest in the next generation of Hispanic engineers. Explore partnership tiers and sponsorship opportunities.",
    url: "/sponsors",
    type: "website",
    images: ["/branding/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsors | SHPE Stevens",
    description:
      "Support SHPE Stevens and invest in the next generation of Hispanic engineers. Explore partnership tiers and sponsorship opportunities.",
    images: ["/branding/og-image.png"],
  },
};

export default function SponsorsPage() {
  return (
    <main>
      <Introduction />
      <Sponsors />
      <PartnershipTiers />
      <BecomeSponsor />
    </main>
  );
}
