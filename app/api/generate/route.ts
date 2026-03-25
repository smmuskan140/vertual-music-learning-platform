<<<<<<< HEAD
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { generateMentor } from "@/lib/ai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isRemoteUrl(u: string) {
  return u.startsWith("https://") || u.startsWith("http://");
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    instrument?: string;
    idolImage?: string;
    roomImage?: string;
    idolUrl?: string;
    roomUrl?: string;
  };

  const { instrument } = body;
  const idol = body.idolUrl ?? body.idolImage;
  const room = body.roomUrl ?? body.roomImage;

  if (!instrument || !["Guitar", "Piano"].includes(instrument)) {
    return NextResponse.json({ error: "Invalid instrument" }, { status: 400 });
  }
  if (!idol || !room || typeof idol !== "string" || typeof room !== "string") {
    return NextResponse.json({ error: "Missing images" }, { status: 400 });
  }

  const mentor = await generateMentor({ instrument: instrument as "Guitar" | "Piano", idolImage: idol, roomImage: room });

  let mentorSessionId: string | null = null;
  if (isRemoteUrl(idol) && isRemoteUrl(room)) {
    const row = await prisma.mentorSession.create({
      data: {
        userId: session.user.id,
        instrument,
        idolUrl: idol,
        roomUrl: room,
        mentorJson: mentor as object
      }
    });
    mentorSessionId = row.id;
  }

  return NextResponse.json({ mentor, mentorSessionId });
=======
import { NextRequest, NextResponse } from 'next/server';
import { generateMentor } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { instrument, idolBase64, roomBase64 } = body;

    if (!instrument || !['Guitar', 'Piano'].includes(instrument)) {
      return NextResponse.json({ error: 'Invalid instrument' }, { status: 400 });
    }
    if (!idolBase64 || !roomBase64) {
      return NextResponse.json({ error: 'Missing images' }, { status: 400 });
    }

    const mentor = await generateMentor({
      instrument: instrument as 'Guitar' | 'Piano',
      idolBase64: idolBase64 as string,
      roomBase64: roomBase64 as string,
    });

    return NextResponse.json({ mentor });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
>>>>>>> 38018597 (feat: initial commit)
}
