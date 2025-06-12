import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/themeprovider";
import Navbar from "./components/Navbar";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOMO Finder",
  description: "Your next great night out is one tap away—don't miss it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased vsc-initialized h-full`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <div className="flex flex-col h-full">
              <Navbar />
              <main className="flex-1 relative overflow-hidden">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
