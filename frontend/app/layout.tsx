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
  title: "SHPE SIT",
  description: "Stevens SHPE Website",
  icons: {
    icon: "/og-image.png",
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
