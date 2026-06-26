import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ThemeToggle from "../components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lingo",
  description: "Interactive courses for programming, data, science, logic, and math.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
        <ThemeToggle />
        <Navbar />
        {children}
        <span className="sm:hidden" >

        <Footer />
        </span>
      </body>
    </html>
  );
}
