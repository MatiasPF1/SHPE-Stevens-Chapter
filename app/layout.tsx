import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import "./globals.css";
import { cn } from "@/lib/utils";

const siteUrl = "https://shpestevens.org";

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
    <html lang="en" className={cn("font-sans")}>
      <body className={`${montserrat.variable} ${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
