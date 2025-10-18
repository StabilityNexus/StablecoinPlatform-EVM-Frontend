import { NextResponse } from "next/server"

const HERMES_LATEST_ENDPOINT = "https://hermes.pyth.network/v2/updates/price/latest"

type HermesRequest = {
  priceId?: string
  encoding?: "hex" | "base64"
  cluster?: string
}

export async function POST(request: Request) {
  try {
    const body: HermesRequest = await request.json()
    const { priceId, encoding = "hex", cluster } = body

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 })
    }

    const params = new URLSearchParams()
    params.append("ids[]", priceId)
    params.append("encoding", encoding)
    if (cluster) {
      params.append("cluster", cluster)
    }

    const hermesResponse = await fetch(
      `${HERMES_LATEST_ENDPOINT}?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      },
    )

    if (!hermesResponse.ok) {
      return NextResponse.json(
        { error: `Hermes request failed (${hermesResponse.status})` },
        { status: hermesResponse.status },
      )
    }

    const payload = await hermesResponse.json()
    const binaryData = (payload?.binary?.data as string[] | undefined) ?? []

    if (binaryData.length === 0) {
      return NextResponse.json({ error: "Hermes response missing binary data" }, { status: 502 })
    }

    const updateData = binaryData.map((entry) =>
      entry.startsWith("0x") ? entry : `0x${entry}`,
    )

    return NextResponse.json({ updateData })
  } catch (error) {
    console.error("Hermes proxy error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Hermes price update" },
      { status: 500 },
    )
  }
}
