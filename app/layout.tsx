import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Inter, Raleway } from "next/font/google";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import { cn } from "@/lib/utils";

const siteUrl = "https://stevensshpe.org";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SHPE Stevens | Society of Hispanic Professional Engineers",
    template: "%s | SHPE Stevens",
  },
  description:
    "SHPE Stevens empowers Hispanic students at Stevens Institute of Technology through STEM awareness, academic support, and professional development.",
  applicationName: "SHPE Stevens",
  keywords: [
    "SHPE",
    "SHPE Stevens",
    "Society of Hispanic Professional Engineers",
    "SHPE Stevens Chapter",
    "Stevens Institute of Technology",
    "Hispanic engineers",
    "STEM",
    "diversity in engineering",
    "Hoboken",
    "professional development",
    "college chapter",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "SHPE Stevens | Society of Hispanic Professional Engineers",
    description:
      "Empowering the Hispanic community at Stevens Institute of Technology through STEM awareness, access, support, and development.",
    url: siteUrl,
    siteName: "SHPE Stevens",
    images: [
      {
        url: "/branding/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHPE Stevens | Society of Hispanic Professional Engineers",
    description:
      "Empowering the Hispanic community at Stevens Institute of Technology through STEM awareness, access, support, and development.",
    images: ["/branding/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SHPE Stevens",
    alternateName: "Society of Hispanic Professional Engineers at Stevens Institute of Technology",
    url: siteUrl,
    logo: `${siteUrl}/branding/og-image.png`,
    sameAs: [
      "https://shpe.org",
      "https://www.stevens.edu",
    ],
    description:
      "The Society of Hispanic Professional Engineers chapter at Stevens Institute of Technology, empowering the Hispanic community through STEM awareness, access, support, and professional development.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 Castle Point Terrace",
      addressLocality: "Hoboken",
      addressRegion: "NJ",
      postalCode: "07030",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en" className={cn("font-sans")} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} ${inter.variable} ${raleway.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
