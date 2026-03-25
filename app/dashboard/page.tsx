import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Music, Sparkles } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Music Mentor Dashboard</h1>
        <p className="text-xl text-muted-foreground">Create your AI mentor and start practicing</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/dashboard/setup">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-2xl bg-indigo-100 p-3">
                  <Music className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Setup Mentor</CardTitle>
                  <CardDescription>Upload images and generate your personal AI mentor</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5" />
              Practice Session
            </CardTitle>
            <CardDescription>No active session. Complete setup first.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="lg" asChild disabled>
              <Link href="/dashboard/learn">
                Continue Practice
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stats</CardTitle>
            <CardDescription>Your practice journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold">0 XP</div>
              <p className="text-sm text-muted-foreground">Total earned</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Sessions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
