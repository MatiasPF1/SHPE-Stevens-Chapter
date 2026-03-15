import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  "https://shpe-stevens-chapter.vercel.app";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "700","900"],
  variable: "--font-montserrat"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SHPE Stevens | Society of Hispanic Professional Engineers",
    template: "%s | SHPE Stevens",
  },
  description:
    "The Society of Hispanic Professional Engineers at Stevens Institute of Technology empowers the Hispanic community through STEM awareness, access, support, and professional development.",
  applicationName: "SHPE Stevens",
  keywords: [
    "SHPE",
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
    url: "/",
    siteName: "SHPE Stevens",
    type: "website",
    locale: "en_US",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/og-image.png",
    apple: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
