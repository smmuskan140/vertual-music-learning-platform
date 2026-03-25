import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music, Mic, Zap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLearnPage() {
  const session = typeof window !== 'undefined' ? localStorage.getItem('mentorSession') : null;
  const hasMentor = !!session;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">Practice Session</h1>
        <p className="text-xl text-muted-foreground">Practice with your AI mentor and get real-time feedback</p>
      </div>

      {!hasMentor && (
        <Card>
          <CardHeader>
            <CardTitle>No Mentor Setup</CardTitle>
            <CardDescription>Complete setup first to unlock practice mode.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/setup">
              <Button size="lg" className="w-full md:w-auto">
                Setup Mentor Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {hasMentor && (
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Practice Area</CardTitle>
                <Button size="sm" variant="outline">
                  <Mic className="mr-2 h-4 w-4" />
                  Listening...
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center rounded-b-xl">
                <div className="text-center">
                  <Music className="mx-auto h-24 w-24 text-indigo-500 animate-bounce mb-8" />
                  <h3 className="text-2xl font-bold mb-2">Ready to Practice!</h3>
                  <p className="text-muted-foreground mb-8">Click "Start Session" to begin</p>
                  <Button size="lg" className="px-12">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Practice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-2xl font-bold">
                  0 <Award className="h-6 w-6 text-amber-500 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">XP Earned</p>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-indigo-600">Accuracy: 0%</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full w-0 animate-pulse" style={{width: '0%'}} />
                </div>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                🎯 Streak: 0 | ⏱️ Best: 0ms
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

