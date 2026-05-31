import { NextResponse } from "next/server";
import { waitlistStatus } from "@/lib/server/waitlistStore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await waitlistStatus(searchParams.get("wallet") || undefined, searchParams.get("email") || undefined);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Waitlist status failed." }, { status: 500 });
  }
}
