<<<<<<< HEAD
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MentorCard from "@/components/MentorCard";
import UserBar from "@/components/UserBar";
import FeedbackPanel from "@/components/FeedbackPanel";
import { AudioSession, readSignalLevel, startAudioSession, stopAudioSession } from "@/lib/audio";

type Instrument = "Guitar" | "Piano";
type MentorData = {
  name: string;
  personality: string;
  intro: string;
  environment: string;
};

type SessionData = {
  instrument: Instrument;
  idolImage: string;
  roomImage: string;
  mentor: MentorData;
  mentorSessionId?: string | null;
};

export default function LearnPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [feedback, setFeedback] = useState("Press start and play a few notes.");
  const [tip, setTip] = useState("Keep your tempo stable.");
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const audioRef = useRef<AudioSession | null>(null);
  const loopRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);
  const lastFeedbackAtRef = useRef<number>(0);

  useEffect(() => {
    const raw = localStorage.getItem("mentor-session");
    if (!raw) {
      router.push("/setup");
      return;
    }
    try {
      setSession(JSON.parse(raw));
    } catch {
      router.push("/setup");
    }
  }, [router]);

  useEffect(() => {
    return () => {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
      stopAudioSession(audioRef.current);
    };
  }, []);

  const environmentLabel = useMemo(() => session?.mentor.environment || "Your virtual room stage.", [session]);

  const sendFeedbackRequest = async (signalLevel: number) => {
    if (!session) return;

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instrument: session.instrument,
          signalLevel,
          elapsedMs: Date.now() - startedAtRef.current
        })
      });
      const data = await response.json();
      if (!response.ok) return;

      const result = data.feedback;
      setFeedback(result.feedback);
      setTip(result.tip);
      setScore(result.score);
      setXp((prev) => prev + result.xpGain);
    } catch {
      // keep session running even if request fails
    }
  };

  const runAudioLoop = () => {
    const sessionAudio = audioRef.current;
    if (!sessionAudio || !isListening) return;

    const level = readSignalLevel(sessionAudio);
    setMicLevel(Math.round(level * 100));

    const now = Date.now();
    const enoughTimePassed = now - lastFeedbackAtRef.current > 2300;
    if (level > 0.1 && enoughTimePassed) {
      lastFeedbackAtRef.current = now;
      void sendFeedbackRequest(level);
    }

    loopRef.current = requestAnimationFrame(runAudioLoop);
  };

  const handleStartListening = async () => {
    if (isListening) return;
    try {
      const audio = await startAudioSession();
      audioRef.current = audio;
      startedAtRef.current = Date.now();
      lastFeedbackAtRef.current = 0;
      setIsListening(true);
      setFeedback("Listening... play your instrument now.");
      loopRef.current = requestAnimationFrame(runAudioLoop);
    } catch {
      setFeedback("Microphone access denied. Please allow mic and try again.");
    }
  };

  const handleStopListening = () => {
    setIsListening(false);
    if (loopRef.current) cancelAnimationFrame(loopRef.current);
    stopAudioSession(audioRef.current);
    audioRef.current = null;
    setFeedback("Session paused. Press start to continue.");
  };

  if (!session) return null;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto mb-6 flex max-w-6xl items-center justify-between">
        <Link href="/setup" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Setup
        </Link>
        <UserBar />
      </div>
      <section className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <MentorCard
            name={session.mentor.name}
            personality={session.mentor.personality}
            intro={session.mentor.intro}
            instrument={session.instrument}
            idolImage={session.idolImage}
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
            <span className="font-medium text-slate-900">Environment:</span> {environmentLabel}
          </div>
        </div>

        <div className="space-y-4">
          <FeedbackPanel feedback={feedback} tip={tip} score={score} xp={xp} />
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">Audio Input</h3>
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-indigo-600 transition-all" style={{ width: `${micLevel}%` }} />
            </div>
            <p className="mb-4 text-sm text-slate-600">Mic level: {micLevel}%</p>
            <div className="flex gap-3">
              <button
                onClick={handleStartListening}
                disabled={isListening}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Start Listening
              </button>
              <button
                onClick={handleStopListening}
                disabled={!isListening}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Stop
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
=======
import { redirect } from 'next/navigation';

export default function LearnPage() {
  redirect('/dashboard/learn');
}

>>>>>>> 38018597 (feat: initial commit)
