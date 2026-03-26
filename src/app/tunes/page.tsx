"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Play, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TUNES = [
  { id: 1, name: "Wonderwall", artist: "Oasis", instrument: "Guitar", difficulty: "Easy", duration: "4:18" },
  { id: 2, name: "Hotel California", artist: "Eagles", instrument: "Guitar", difficulty: "Intermediate", duration: "6:30" },
  { id: 3, name: "Fur Elise", artist: "Beethoven", instrument: "Piano", difficulty: "Intermediate", duration: "3:00" },
  { id: 4, name: "Clair de Lune", artist: "Debussy", instrument: "Piano", difficulty: "Advanced", duration: "5:00" },
  { id: 5, name: "Smells Like Teen Spirit", artist: "Nirvana", instrument: "Drums", difficulty: "Easy", duration: "5:01" },
  { id: 6, name: "Bohemian Rhapsody", artist: "Queen", instrument: "Piano", difficulty: "Advanced", duration: "5:55" },
];

export default function TunesPage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 font-[var(--font-geist-sans)]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Explore instrument tunes</h1>
          <p className="text-muted-foreground text-lg">Choose a song and start learning with your AI tutor.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search songs, artists, or instruments..." className="pl-10 rounded-full border-orange-100" />
          </div>
          <Button variant="outline" className="rounded-full border-orange-100">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TUNES.map((tune) => (
            <Card key={tune.id} className="group hover:border-primary transition-all overflow-hidden border-orange-100">
              <div className="aspect-video bg-stone-200 dark:bg-stone-800 flex items-center justify-center relative">
                <Music className="h-12 w-12 text-stone-400 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 w-12 p-0">
                    <Play className="h-6 w-6 fill-current ml-1" />
                  </Button>
                </div>
                <Badge className="absolute top-4 right-4 bg-white/90 text-primary hover:bg-white">{tune.difficulty}</Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{tune.name}</CardTitle>
                    <CardDescription className="text-base font-medium">{tune.artist}</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-orange-200 text-primary">{tune.instrument}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{tune.duration}</span>
                <Button variant="link" className="text-primary p-0 h-auto">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
