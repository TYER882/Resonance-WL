import { NextResponse } from "next/server";
import { joinWaitlist } from "@/lib/server/waitlistStore";
import type { WaitlistJoinInput } from "@/types/waitlist";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as WaitlistJoinInput;
    const result = await joinWaitlist(input);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Waitlist join failed." }, { status: 500 });
  }
}
