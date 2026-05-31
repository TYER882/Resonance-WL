import { NextResponse } from "next/server";
import { adminUpdateWaitlist } from "@/lib/server/waitlistStore";
import type { WaitlistStatus } from "@/types/waitlist";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: WaitlistStatus };
    const entry = await adminUpdateWaitlist(id, body);
    if (!entry) return NextResponse.json({ error: "Entry not found." }, { status: 404 });
    return NextResponse.json({ entry });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Admin update failed." }, { status: 500 });
  }
}

function isAdmin(request: Request) {
  const expected = process.env.ADMIN_API_KEY;
  return Boolean(expected && request.headers.get("x-admin-api-key") === expected);
}
