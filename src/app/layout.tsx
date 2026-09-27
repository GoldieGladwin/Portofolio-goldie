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

export const metadata: Metadata = {
  title: "Goldie Gladwin | Portfolio",
  description: "Personal portfolio website of Goldie Gladwin - Full Stack Developer & Software Engineering Student.",
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
