import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/common/Provider";
import ResponsiveNav from "@/components/layout/ResponsiveNav";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import AosInitializer from "@/components/common/AosInitializer";
import SplashScreen from "@/components/feedback/SplashScreen";

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://goldi.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Goldie Gladwin | Portfolio & Full Stack Developer",
    template: "%s | Goldie Gladwin",
  },
  description:
    "Portofolio resmi Goldie Gladwin, siswa SMK Rekayasa Perangkat Lunak (RPL) & Full Stack Web Developer. Menampilkan proyek aplikasi web Next.js, React, Tailwind CSS, dan integrasi database Supabase.",
  keywords: [
    "Goldie Gladwin",
    "Goldie",
    "Portofolio Goldie Gladwin",
    "Portfolio Web Developer",
    "Full Stack Developer Pasuruan",
    "Siswa SMK RPL",
    "SMKN 1 Pasuruan",
    "Rekayasa Perangkat Lunak",
    "Next.js Portfolio",
    "React Developer",
    "Supabase Web App",
  ],
  authors: [{ name: "Goldie Gladwin", url: siteUrl }],
  creator: "Goldie Gladwin",
  publisher: "Goldie Gladwin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Goldie Gladwin | Portfolio & Full Stack Developer",
    description:
      "Portofolio resmi siswa SMK Rekayasa Perangkat Lunak (RPL) & Full Stack Developer, dibangun dengan Next.js dan Supabase. Jelajahi karya dan proyek aplikasi web saya.",
    url: siteUrl,
    siteName: "Portofolio Goldie Gladwin",
    images: [
      {
        url: "/images/og-image.jpg", // Banner resmi di public/images/og-image.jpg
        width: 1024,                 // Lebar piksel banner Anda
        height: 571,                 // Tinggi piksel banner Anda
        alt: "Goldie Gladwin - Full Stack Developer",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goldie Gladwin | Portfolio & Full Stack Developer",
    description:
      "Portofolio siswa SMK Rekayasa Perangkat Lunak, dibangun dengan Next.js dan Supabase.",
    images: ["/images/og-image.jpg"],
    creator: "@goldiegladwin",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`min-h-full flex flex-col ${font.className}`}>
        <Provider>
          <SplashScreen />
          <AosInitializer />
          <ResponsiveNav />
          {children}
          <Footer />
          <ScrollToTop />
        </Provider>
      </body>
    </html>
  );
}
