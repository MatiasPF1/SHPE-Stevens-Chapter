import type { Metadata } from "next";
import ContactIntroduction from "@/components_ContactUs/contact-introduction";
import ContactForm from "@/components_ContactUs/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the SHPE Stevens Chapter. Ask questions, share suggestions, report issues, or learn more about getting involved at Stevens Institute of Technology.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | SHPE Stevens",
    description:
      "Get in touch with the SHPE Stevens Chapter. Ask questions, share suggestions, or report issues.",
    url: "/contact",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | SHPE Stevens",
    description:
      "Get in touch with the SHPE Stevens Chapter. Ask questions, share suggestions, or report issues.",
    images: ["/og-image.png"],
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact SHPE Stevens Chapter",
  description:
    "Reach out to the SHPE Stevens Chapter with questions, suggestions, or issues.",
  url: "https://stevensshpe.org/contact",
  mainEntity: {
    "@type": "Organization",
    name: "SHPE Stevens Chapter",
    email: "shpe@stevens.edu",
    url: "https://stevensshpe.org",
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <main>
        <ContactIntroduction />
        <ContactForm />
      </main>
    </>
  );
}
