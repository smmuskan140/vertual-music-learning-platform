<<<<<<< HEAD
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { generateFeedback } from "@/lib/ai";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    instrument?: string;
    signalLevel?: number;
    elapsedMs?: number;
  };

  const { instrument, signalLevel, elapsedMs } = body;
  if (!instrument || !["Guitar", "Piano"].includes(instrument)) {
    return NextResponse.json({ error: "Invalid instrument" }, { status: 400 });
  }

  const feedback = await generateFeedback({
    instrument: instrument as "Guitar" | "Piano",
    signalLevel: Number(signalLevel || 0),
    elapsedMs: Number(elapsedMs || 0)
  });

  return NextResponse.json({ feedback });
=======
import { NextRequest, NextResponse } from 'next/server';
import { generateFeedback } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { instrument, signalLevel, elapsedMs, streak } = body;

    if (!instrument || !['Guitar', 'Piano'].includes(instrument)) {
      return NextResponse.json({ error: 'Invalid instrument' }, { status: 400 });
    }

    const feedback = await generateFeedback({
      instrument: instrument as 'Guitar' | 'Piano',
      signalLevel: Number(signalLevel),
      elapsedMs: Number(elapsedMs),
      streak: Number(streak),
    });

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Feedback error:', error);
    return NextResponse.json({ error: 'Feedback generation failed' }, { status: 500 });
  }
>>>>>>> 38018597 (feat: initial commit)
}
