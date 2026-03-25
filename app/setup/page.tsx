<<<<<<< HEAD
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UploadBox from "@/components/UploadBox";
import UserBar from "@/components/UserBar";

type Instrument = "Guitar" | "Piano";

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error || "Upload failed");
  return data.url as string;
}

export default function SetupPage() {
  const router = useRouter();
  const [instrument, setInstrument] = useState<Instrument>("Guitar");
  const [idolFile, setIdolFile] = useState<File | null>(null);
  const [roomFile, setRoomFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    if (!idolFile || !roomFile) {
      setError("Please upload both idol and room images.");
      return;
    }

    setLoading(true);
    try {
      const [idolUrl, roomUrl] = await Promise.all([uploadImage(idolFile), uploadImage(roomFile)]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instrument, idolUrl, roomUrl })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to generate mentor");

      localStorage.setItem(
        "mentor-session",
        JSON.stringify({
          instrument,
          idolImage: idolUrl,
          roomImage: roomUrl,
          mentor: data.mentor,
          mentorSessionId: data.mentorSessionId ?? null
        })
      );
      router.push("/learn");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
=======
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UploadBox from '@/components/UploadBox';

type Instrument = 'Guitar' | 'Piano';

type MentorData = {
  name: string;
  personality: string;
  intro: string;
  environment: string;
  reactions: string[];
  avatarDesc: string;
};

export default function SetupPage() {
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
    if (!idolBase64 || !roomBase64) return alert('Upload both images');

    setStep('analyzing');
    setLoading(true);

    // Simulate analysis delay
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

      // Store session
      localStorage.setItem('mentorSession', JSON.stringify({
        instrument,
        roomBase64,
        mentor: data.mentor,
      }));

      // Final delay
      await new Promise((r) => setTimeout(r, 2000));
      router.push('/learn');
    } catch (error) {
      console.error(error);
      alert('Generation failed - check console');
>>>>>>> 38018597 (feat: initial commit)
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Home
        </Link>
        <UserBar />
      </div>
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">Setup Your Mentor</h1>
        <p className="mb-8 text-sm text-slate-600">Choose instrument and upload images to generate your AI mentor + room environment.</p>

        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-slate-700">Select Instrument</p>
          <div className="flex gap-3">
            {(["Guitar", "Piano"] as Instrument[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setInstrument(item)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  instrument === item ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <UploadBox label="Upload Idol Image" onFile={setIdolFile} />
          <UploadBox label="Upload Room Image / 360 Frame" onFile={setRoomFile} />
        </div>

        {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating Mentor..." : "Generate Mentor"}
        </button>
      </section>
=======
    <main className="min-h-screen bg-slate-50 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to Home
        </Link>
        
        <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200 md:p-12">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">Create Your Mentor</h1>
          
          {step === 'upload' && (
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Choose Instrument</h3>
                <div className="flex gap-3">
                  {(['Guitar', 'Piano'] as Instrument[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => setInstrument(item)}
                      className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                        instrument === item
                          ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500/50'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <UploadBox label="Upload Idol Image (inspiration for mentor)" onFileChange={handleUploadIdol} />
                <UploadBox label="Upload Room Image/Video Frame (your music space)" onFileChange={handleUploadRoom} />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!idolBase64 || !roomBase64}
                className="w-full rounded-2xl bg-indigo-600 px-8 py-6 text-xl font-bold text-white shadow-xl ring-1 ring-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate My Mentor
              </button>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="text-center">
              <div className="mx-auto h-24 w-24 animate-spin rounded-2xl bg-indigo-600 shadow-lg" />
              <h2 className="mt-8 text-2xl font-bold text-slate-900">Analyzing your uploads...</h2>
              <p className="mt-2 text-slate-600">Creating original game mentor inspired by your idol image</p>
            </div>
          )}

          {step === 'building' && (
            <div className="text-center">
              <div className="mx-auto h-24 w-24 rounded-2xl bg-indigo-600 p-6 shadow-lg">
                🎸
              </div>
              <h2 className="mt-8 text-2xl font-bold text-slate-900">Building your music space...</h2>
              <p className="mt-2 text-slate-600">Placing mentor in room with instruments & lighting</p>
            </div>
          )}
        </div>
      </div>
>>>>>>> 38018597 (feat: initial commit)
    </main>
  );
}
