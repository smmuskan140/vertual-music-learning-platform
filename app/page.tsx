<<<<<<< HEAD
import Link from "next/link";
import UserBar from "@/components/UserBar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto mb-8 flex max-w-3xl justify-end">
        <UserBar />
      </div>
      <div className="mx-auto flex max-w-2xl items-center justify-center py-12">
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">AI Music Mentor</p>
          <h1 className="mb-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Your AI music mentor that lives in your room</h1>
          <p className="mx-auto mb-8 max-w-xl text-sm text-slate-600">
            Build skill with a game-like mentor that reacts to your playing and gives real-time feedback.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/setup"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400"
            >
              Sign in
            </Link>
          </div>
        </section>
      </div>
    </main>
=======
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Your AI music mentor{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              that lives in your room
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground">
            Gamified learning with 3D-style mentor that reacts to your playing in real-time.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-2xl text-center">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 h-14 rounded-2xl shadow-xl hover:shadow-2xl">
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </Link>
        </div>

        <div className="mx-auto mt-32 max-w-4xl grid gap-8 md:grid-cols-3">
          <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all">
            <CardHeader className="pb-4">
              <Music className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold">Upload & Generate</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Upload idol inspiration and room image. AI creates your personal game mentor.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all md:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-2xl bg-indigo-100 p-3">
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Practice with Real-time Feedback</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Microphone detects playing. Mentor reacts with speech bubbles, scores, XP, tips. Feels alive.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
>>>>>>> 38018597 (feat: initial commit)
  );
}
