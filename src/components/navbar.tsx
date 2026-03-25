"use client";

import Link from "next/link";
import { Music, LayoutDashboard, MessageSquare, Camera, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold text-xl tracking-tight text-primary">Vocalise</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              href="/dashboard"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/chat"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              AI Tutor
            </Link>
            <Link
              href="/tunes"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tunes
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
