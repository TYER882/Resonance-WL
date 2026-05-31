import { NextResponse } from "next/server";
import { waitlistStats } from "@/lib/server/waitlistStore";

export async function GET() {
  try {
    return NextResponse.json(await waitlistStats());
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Waitlist stats failed." }, { status: 500 });
  }
}
