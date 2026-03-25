<<<<<<< HEAD
import "@/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "AI Music Mentor MVP",
  description: "Your AI music mentor that lives in your room"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
=======
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'AI Music Mentor',
  description: 'Your AI music mentor that lives in your room',
};

// Navbar moved to dashboard/layout.tsx

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
>>>>>>> 38018597 (feat: initial commit)
      </body>
    </html>
  );
}
