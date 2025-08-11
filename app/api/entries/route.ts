// src/app/api/entries/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/db"
import { entrySchema } from "@/lib/validations"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const entries = await prismaClient.entry.findMany({
      where: { userId: session.user.id },
      include: { insights: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    })

    const total = await prisma.entry.count({
      where: { userId: session.user.id },
    })

    return NextResponse.json({
      entries,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = entrySchema.parse(body)

    const entry = await prisma.entry.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
      include: { insights: true },
    })

    // Generate insights asynchronously
    generateInsights(entry.id, entry.content)

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
