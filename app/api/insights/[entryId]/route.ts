// src/app/api/insights/[entryId]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/db"
import { generateInsightFromContent } from "@/lib/ai"

export async function POST(
  req: NextRequest,
  { params }: { params: { entryId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const entry = await prismaClient.entry.findFirst({
      where: {
        id: params.entryId,
        userId: session.user.id,
      },
    })

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    // Check if insight already exists
    const existingInsight = await prismaClient.insight.findUnique({
      where: { entryId: params.entryId },
    })

    if (existingInsight) {
      return NextResponse.json(existingInsight)
    }

    // Generate new insight
    const insightData = await generateInsightFromContent(entry.content)

    const insight = await prismaClient.insight.create({
      data: {
        ...insightData,
        entryId: params.entryId,
      },
    })

    return NextResponse.json(insight)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
