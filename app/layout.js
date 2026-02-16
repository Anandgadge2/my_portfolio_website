import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "../portfolio/components/shared/Navbar";

import { Footer } from "@/components/Footer";
import { BitsFloating } from "@/components/BitsFloating";

export const metadata = {
  title: "Anand Gadge | Full Stack Developer",
  description:
    "Full stack developer building scalable applications with MERN, Spring Boot, and AWS.",
  openGraph: {
    url: "https://anandgadge2.github.io/Personal-Portfolio-website/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-surface text-text-primary relative">
        <ThemeProvider>
          <div className="relative min-h-screen">
            <div className="grain" />
            <div className="fixed inset-0 grid-bg pointer-events-none" />
            <BitsFloating />
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
