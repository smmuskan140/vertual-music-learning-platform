import { put } from "@vercel/blob";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";
    const pathname = `uploads/${session.user.id}/${Date.now()}-${safeName}`;
    const blob = await put(pathname, file, { access: "public", token });
    return NextResponse.json({ url: blob.url });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const b64 = buf.toString("base64");
  const mime = file.type || "application/octet-stream";
  const url = `data:${mime};base64,${b64}`;
  return NextResponse.json({ url });
}
