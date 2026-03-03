import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "700","900"],
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: {
    default: "SHPE Stevens | Society of Hispanic Professional Engineers",
    template: "%s | SHPE Stevens",
  },
  description:
    "The Society of Hispanic Professional Engineers at Stevens Institute of Technology empowers the Hispanic community through STEM awareness, access, support, and professional development.",
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
  authors: [{ name: "SHPE Stevens Chapter" }],
  openGraph: {
    title: "SHPE Stevens | Society of Hispanic Professional Engineers",
    description:
      "Empowering the Hispanic community at Stevens Institute of Technology through STEM awareness, access, support, and development.",
    url: "https://github.com/MatiasPF1/SHPE-Stevens-Chapter",
    siteName: "SHPE Stevens",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SHPE Stevens Chapter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHPE Stevens | Society of Hispanic Professional Engineers",
    description:
      "Empowering the Hispanic community at Stevens Institute of Technology through STEM.",
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
      <body className={montserrat.variable} suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
