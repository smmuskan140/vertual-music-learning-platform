<<<<<<< HEAD
type MentorPayload = {
  instrument: "Guitar" | "Piano";
  idolImage?: string;
  roomImage?: string;
=======
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type MentorPayload = {
  instrument: 'Guitar' | 'Piano';
  idolBase64: string;
  roomBase64: string;
>>>>>>> 38018597 (feat: initial commit)
};

type MentorResult = {
  name: string;
  personality: string;
  intro: string;
  environment: string;
<<<<<<< HEAD
};

type FeedbackPayload = {
  instrument: "Guitar" | "Piano";
  signalLevel: number;
  elapsedMs: number;
=======
  reactions: string[];
  avatarDesc: string;
};

type FeedbackPayload = {
  instrument: 'Guitar' | 'Piano';
  signalLevel: number;
  elapsedMs: number;
  streak: number;
>>>>>>> 38018597 (feat: initial commit)
};

type FeedbackResult = {
  feedback: string;
  score: number;
  tip: string;
  xpGain: number;
<<<<<<< HEAD
};

const fallbackMentors: Record<"Guitar" | "Piano", MentorResult> = {
  Guitar: {
    name: "Kai Strum",
    personality: "Energetic mentor who pushes rhythm and confidence.",
    intro: "I am Kai. Keep your strums steady and I will level you up every round.",
    environment: "Cozy bedroom studio with warm lights and wall posters."
  },
  Piano: {
    name: "Luna Keys",
    personality: "Calm, precise mentor focused on timing and tone.",
    intro: "I am Luna. We will build clean finger control one phrase at a time.",
    environment: "Minimal room with soft window light and an upright piano."
  }
};

async function callOpenAI(prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Return only valid JSON with concise fields."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data?.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

export async function generateMentor(payload: MentorPayload): Promise<MentorResult> {
  const prompt = `Create a music mentor JSON with keys: name, personality, intro, environment.
Instrument: ${payload.instrument}
Idol image (data URL truncated): ${payload.idolImage?.slice(0, 120) || "none"}
Room image/video frame (data URL truncated): ${payload.roomImage?.slice(0, 120) || "none"}
Style: game-ready 3D mentor vibe, but practical MVP.`;

  const aiText = await callOpenAI(prompt);
  if (aiText) {
    try {
      const parsed = JSON.parse(aiText) as MentorResult;
      if (parsed.name && parsed.personality && parsed.intro && parsed.environment) return parsed;
    } catch {
      // ignore invalid JSON and use fallback
    }
=======
  tier: 'perfect' | 'good' | 'try-again';
};

// Fallbacks for demo
const fallbackMentors: Record<'Guitar' | 'Piano', MentorResult> = {
  Guitar: {
    name: 'Jax Riff',
    personality: 'High-energy rocker who pushes you to shred faster',
    intro: 'Yo! I\'m Jax. Grab that guitar - let\'s make some noise! 🎸',
    environment: 'Dim-lit garage with amps stacked high and posters everywhere',
    reactions: ['Fire! 🔥', 'That groove SLAPS', 'Faster wrists!'],
    avatarDesc: 'Stylized rockstar with spiky hair, leather jacket, holding guitar',
  },
  Piano: {
    name: 'Nova Chord',
    personality: 'Smooth jazz vibe, perfect timing mentor',
    intro: 'Hey there. I\'m Nova. Let\'s flow through those keys together. 🎹',
    environment: 'Cozy loft with city lights, candle glow, grand piano',
    reactions: ['Smooth as silk!', 'Perfect touch', 'Relax those fingers'],
    avatarDesc: 'Elegant character with headphones, sleek outfit, at piano',
  },
};

export async function generateMentor(payload: MentorPayload): Promise<MentorResult> {
  try {
    const prompt = `Create ORIGINAL game-like 3D mentor inspired by idol image (NOT copy).
Instrument: ${payload.instrument}
Idol: [base64 truncated ${payload.idolBase64.slice(0, 100)}...]
Room: [base64 truncated ${payload.roomBase64.slice(0, 100)}...]

Return ONLY valid JSON: {
  "name": "cool name",
  "personality": "short desc",
  "intro": "greet + instrument mention",
  "environment": "styled room desc",
  "reactions": ["3 short reactions"],
  "avatarDesc": "visual style desc"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0]?.message?.content;
    if (text) {
      const result = JSON.parse(text) as MentorResult;
      if (result.name && result.reactions?.length) return result;
    }
  } catch (error) {
    console.warn('AI gen failed, using fallback:', error);
>>>>>>> 38018597 (feat: initial commit)
  }

  return fallbackMentors[payload.instrument];
}

export async function generateFeedback(payload: FeedbackPayload): Promise<FeedbackResult> {
<<<<<<< HEAD
  const prompt = `Return JSON with keys: feedback, score, tip, xpGain.
Instrument: ${payload.instrument}
Signal level from mic: ${payload.signalLevel}
Elapsed practice ms: ${payload.elapsedMs}
Keep feedback short and motivating.`;

  const aiText = await callOpenAI(prompt);
  if (aiText) {
    try {
      const parsed = JSON.parse(aiText) as FeedbackResult;
      if (parsed.feedback && typeof parsed.score === "number" && parsed.tip && typeof parsed.xpGain === "number") {
        return parsed;
      }
    } catch {
      // ignore invalid JSON and use fallback
    }
  }

  const score = Math.max(45, Math.min(100, Math.round(payload.signalLevel * 100 + Math.random() * 20)));
  const feedback = score > 85 ? "Perfect! Great control." : score > 70 ? "Nice! Keep the rhythm stable." : "Almost there! Try cleaner timing.";
  const tip = payload.instrument === "Guitar" ? "Focus on even strum motion." : "Keep wrist relaxed and hit notes evenly.";
  const xpGain = Math.max(5, Math.round(score / 8));

  return { feedback, score, tip, xpGain };
=======
  try {
    const prompt = `Game-like feedback JSON for ${payload.instrument}.
Signal: ${payload.signalLevel.toFixed(2)}, Time: ${payload.elapsedMs}ms, Streak: ${payload.streak}

Return ONLY JSON: {
  "feedback": "short encouraging phrase",
  "score": 50-100 number,
  "tip": "1 actionable tip",
  "xpGain": 5-25 number,
  "tier": "perfect|good|try-again"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0]?.message?.content;
    if (text) {
      return JSON.parse(text) as FeedbackResult;
    }
  } catch (error) {
    console.warn('Feedback AI failed:', error);
  }

  // Fallback
  const baseScore = 50 + payload.signalLevel * 40 + (payload.streak * 3);
  const score = Math.max(40, Math.min(100, baseScore + (Math.random() * 15 - 7.5)));
  const tier = score > 85 ? 'perfect' : score > 65 ? 'good' : 'try-again';
  return {
    feedback: tier === 'perfect' ? 'Nailed it!' : tier === 'good' ? 'Solid!' : 'Close one!',
    score,
    tip: payload.instrument === 'Guitar' ? 'Steady strum' : 'Even pressure',
    xpGain: Math.floor(score / 10),
    tier,
  };
>>>>>>> 38018597 (feat: initial commit)
}
