import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Play, BookOpen, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 font-[var(--font-geist-sans)]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Musician!</h1>
          <p className="text-muted-foreground">Continue your progress and explore new tunes.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-orange-100 dark:border-stone-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Practice Time</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5 hrs</div>
              <p className="text-xs text-muted-foreground">+2 hrs from last week</p>
            </CardContent>
          </Card>
          <Card className="border-orange-100 dark:border-stone-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tunes Mastered</CardTitle>
              <Music className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
          <Card className="border-orange-100 dark:border-stone-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Instrument</CardTitle>
              <Music className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Acoustic Guitar</div>
              <Badge variant="secondary" className="mt-1 bg-orange-100 text-primary hover:bg-orange-200">Intermediate</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Recent Lessons
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="group hover:border-primary transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Play className="h-6 w-6 text-primary fill-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Basic Chords - Part {i + 1}</h3>
                        <p className="text-sm text-muted-foreground text-balance">Master the G, C, and D major chords on your guitar.</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-orange-50">Continue</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Recommended Tunes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Wonderwall", difficulty: "Easy" },
                { name: "Hotel California", difficulty: "Intermediate" },
                { name: "Sultans of Swing", difficulty: "Advanced" },
                { name: "Blinding Lights", difficulty: "Easy" },
              ].map((tune, i) => (
                <Card key={i} className="overflow-hidden border-orange-100">
                  <div className="aspect-[16/9] bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                    <Music className="h-10 w-10 text-stone-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{tune.name}</CardTitle>
                    <CardDescription>{tune.difficulty}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
