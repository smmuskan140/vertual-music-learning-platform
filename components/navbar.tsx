'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Music, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="h-full w-64 p-4">
              <div className="mb-8 flex items-center space-x-2">
                <Music className="h-8 w-8 text-indigo-600" />
                <h1 className="text-xl font-bold">AI Music Mentor</h1>
              </div>
              <nav className="space-y-2">
                <Link href="/dashboard" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link href="/dashboard/setup" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                  <Music className="h-5 w-5" />
                  <span>Setup Mentor</span>
                </Link>
                <Link href="/dashboard/learn" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                  <Music className="h-5 w-5" />
                  <span>Practice</span>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold">Music Mentor</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
