import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Provider from "@/components/hoc/Provider";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";
import ScrollToTop from "@/components/helper/ScrollToTop";

const font = Inter({
  weight: ["100", "200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Goldie DevPortofolio",
  description: "Portofolio Website using next js ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en" suppressHydrationWarning
    >
      <body className={`min-h-full flex flex-col ${font.className}`}>
        <Provider>
          <ResponsiveNav/>
        {children}
        <Footer/>
        <ScrollToTop/>
        </Provider>
        </body>
    </html>
  );
}
