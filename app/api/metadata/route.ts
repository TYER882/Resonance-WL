import { NextResponse } from "next/server";
import { ipfsToHttp } from "@/lib/ipfs";
import type { ChladniMetadata } from "@/types/node";

const metadataCache = new Map<string, ChladniMetadata>();
const metadataCid = process.env.NEXT_PUBLIC_METADATA_CID || process.env.METADATA_CID;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get("ids") || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 80);

  if (!ids.length) {
    return NextResponse.json({ metadata: {} });
  }

  if (!metadataCid) {
    return NextResponse.json({ error: "Metadata CID is not configured." }, { status: 503 });
  }

  const entries = await Promise.all(
    ids.map(async (id) => {
      const cached = metadataCache.get(id);
      if (cached) return [id, cached] as const;

      const url = ipfsToHttp(`ipfs://${metadataCid}/${id}.json`);
      const response = await fetch(url, { next: { revalidate: 300 } });
      if (!response.ok) return null;

      const metadata = (await response.json()) as ChladniMetadata;
      metadataCache.set(id, metadata);
      return [id, metadata] as const;
    })
  );

  return NextResponse.json({
    metadata: Object.fromEntries(entries.filter(Boolean) as [string, ChladniMetadata][])
  });
}
