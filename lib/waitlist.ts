import type { WaitlistJoinInput, WaitlistJoinResponse, WaitlistStats } from "@/types/waitlist";

export async function joinWaitlist(input: WaitlistJoinInput) {
  const response = await fetch("/api/waitlist/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  const data = (await response.json()) as WaitlistJoinResponse & { error?: string };
  if (!response.ok && response.status !== 409) throw new Error(data.error || "Unable to join waitlist.");
  return { ...data, alreadyJoined: response.status === 409 || data.alreadyJoined };
}

export async function getWaitlistStats() {
  const response = await fetch("/api/waitlist/stats", { next: { revalidate: 30 } });
  const data = (await response.json()) as WaitlistStats & { error?: string };
  if (!response.ok) throw new Error(data.error || "Unable to load waitlist stats.");
  return data;
}
