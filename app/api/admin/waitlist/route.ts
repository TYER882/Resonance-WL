import { NextResponse } from "next/server";
import { adminListWaitlist } from "@/lib/server/waitlistStore";

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    return NextResponse.json({ entries: await adminListWaitlist() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Admin waitlist failed." }, { status: 500 });
  }
}

function isAdmin(request: Request) {
  const expected = process.env.ADMIN_API_KEY;
  return Boolean(expected && request.headers.get("x-admin-api-key") === expected);
}
