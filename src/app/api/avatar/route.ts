import { NextRequest, NextResponse } from "next/server";

// Using a placeholder for real image generation. 
// Ideally this would hit Stability AI, DALL-E, or Gemini Imagen.
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // MOCK: In a real implementation, you'd call an image GEN API here.
    // For now, we simulate a delay and return a consistent result.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // We use a high-quality placeholder that matches the prompt style.
    const mockImageUrl = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80`;

    return NextResponse.json({ imageUrl: mockImageUrl });
  } catch (error: any) {
    console.error("Avatar API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate avatar" },
      { status: 500 }
    );
  }
}
