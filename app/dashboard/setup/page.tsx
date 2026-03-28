'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UploadBox from '@/components/UploadBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Instrument = 'Guitar' | 'Piano';

type MentorData = {
  name: string;
  personality: string;
  intro: string;
  environment: string;
  reactions: string[];
  avatarDesc: string;
};

export default function DashboardSetupPage() {
  const router = useRouter();
  const [instrument, setInstrument] = useState<Instrument>('Guitar');
  const [idolBase64, setIdolBase64] = useState<string | null>(null);
  const [roomBase64, setRoomBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'upload' | 'analyzing' | 'building'>('upload');
  const [mentor, setMentor] = useState<MentorData | null>(null);

  const handleUploadIdol = (base64: string | null, name: string | null) => {
    setIdolBase64(base64);
  };

  const handleUploadRoom = (base64: string | null, name: string | null) => {
    setRoomBase64(base64);
  };

  const handleGenerate = async () => {
    if (!idolBase64 || !roomBase64) {
      alert('Upload both images');
      return;
    }

    setStep('analyzing');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1500));
    setStep('building');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instrument, idolBase64, roomBase64 }),
      });
      const data = await response.json();
      setMentor(data.mentor);

      localStorage.setItem('mentorSession', JSON.stringify({
        instrument,
        roomBase64,
        mentor: data.mentor,
      }));

      await new Promise((r) => setTimeout(r, 2000));
      router.push('/dashboard/learn');
    } catch (error) {
      console.error(error);
      alert('Generation failed. Using fallback. Check console/OpenAI key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">Setup Your Mentor</h1>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Personal AI Mentor</CardTitle>
          <CardDescription>Upload images to generate a custom mentor for your instrument</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-12">
          {step === 'upload' && (
            <>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Choose Instrument</h3>
                <div className="flex gap-3">
                  {(['Guitar', 'Piano'] as Instrument[]).map((item) => (
                    <Button
                      key={item}
                      variant={instrument === item ? 'default' : 'outline'}
                      onClick={() => setInstrument(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <UploadBox label="Idol Inspiration Image" onFileChange={handleUploadIdol} />
                <UploadBox label="Your Room/Music Space" onFileChange={handleUploadRoom} />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!idolBase64 || !roomBase64}
                size="lg"
                className="w-full h-14 text-lg"
              >
                Generate My Mentor
              </Button>
            </>
          )}

          {step === 'analyzing' && (
            <div className="text-center py-20">
              <div className="mx-auto h-24 w-24 animate-spin rounded-2xl bg-indigo-600" />
              <h2 className="mt-8 text-2xl font-bold">Analyzing uploads...</h2>
              <p className="mt-4 text-muted-foreground">Creating unique mentor inspired by your idol</p>
            </div>
          )}

          {step === 'building' && (
            <div className="text-center py-20">
              <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 shadow-2xl">
                🎸
              </div>
              <h2 className="mt-8 text-2xl font-bold">Building your music world...</h2>
              <p className="mt-4 text-muted-foreground">Placing mentor in your room with perfect lighting</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
