import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Music, Play, Camera, Sparkles, Hand } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen font-[var(--font-geist-sans)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-orange-50 to-white dark:from-stone-900 dark:to-stone-950">
        <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered 3D Music Learning
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Master Any Instrument <br className="hidden md:block" /> with Your AI 3D Tutor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10 text-balance">
            Create your custom 3D avatar, select your instrument, and step into an immersive AR world where learning feels like a game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-lg rounded-full">
              <Link href="/chat">
                Get Started Free
                <Play className="ml-2 h-5 w-5 fill-current" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 px-8 h-14 text-lg rounded-full">
              <Link href="/dashboard">Learn More</Link>
            </Button>
          </div>
          
          {/* Main Visual Placeholder */}
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-orange-200 bg-white aspect-video shadow-2xl animate-in zoom-in-95 duration-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent pointer-events-none" />
            <div className="flex items-center justify-center h-full flex-col text-muted-foreground gap-4">
              <Camera className="h-20 w-20 text-primary opacity-50" />
              <p className="text-lg">Live AR Interaction Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom AI Avatars</h3>
              <p className="text-muted-foreground">Upload an image and description to generate a unique 3D character that reflects your style.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">AR Learning Mode</h3>
              <p className="text-muted-foreground">The 3D character lives in your room through your camera, showing you exactly how to play.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                <Hand className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hand Tracking</h3>
              <p className="text-muted-foreground">Our AI detects your hand movements in real-time, correcting your posture and technique.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-stone-50 dark:bg-stone-900 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Music className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">Vocalise</span>
          </div>
          <p className="text-muted-foreground">&copy; 2026 Vocalise. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
