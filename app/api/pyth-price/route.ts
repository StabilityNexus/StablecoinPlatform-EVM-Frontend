import { NextResponse } from "next/server"

const HERMES_LATEST_ENDPOINT = "https://hermes.pyth.network/v2/updates/price/latest"

type PythPriceRequest = {
  priceId?: string
}

export async function POST(request: Request) {
  try {
    const body: PythPriceRequest = await request.json()
    const { priceId } = body

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 })
    }

    const params = new URLSearchParams()
    params.append("ids[]", priceId)

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
    const parsed = payload?.parsed as Array<{
      id: string
      price: {
        price: string
        conf: string
        expo: number
        publish_time: number
      }
    }> | undefined

    if (!parsed || parsed.length === 0) {
      return NextResponse.json(
        { error: "Hermes response missing price feed data" },
        { status: 502 },
      )
    }

    const priceData = parsed[0].price

    return NextResponse.json({
      price: parseInt(priceData.price, 10),
      expo: priceData.expo,
      conf: parseInt(priceData.conf, 10),
      publishTime: priceData.publish_time,
    })
  } catch (error) {
    console.error("Pyth price fetch error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Pyth price" },
      { status: 500 },
    )
  }
}
