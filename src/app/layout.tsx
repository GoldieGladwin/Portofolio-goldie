import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Provider from "@/components/hoc/Provider";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";
import ScrollToTop from "@/components/helper/ScrollToTop";
import AosInitializer from "@/components/helper/AosInitializer";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

const font = Inter({
  weight: ["100", "200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Goldie Gladwin | Portfolio",
  description: "Personal portfolio website of Goldie Gladwin - Full Stack Developer & Software Engineering Student.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en" className="scroll-smooth" suppressHydrationWarning
    >
      <body className={`min-h-full flex flex-col ${font.className}`}>
        <Provider>
          <SplashScreen />
          <AosInitializer />
          <ResponsiveNav/>
        {children}
        <Footer/>
        <ScrollToTop/>
        </Provider>
        </body>
    </html>
  );
}
