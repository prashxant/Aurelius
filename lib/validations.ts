// src/lib/validations.ts
import { z } from "zod"

export const entrySchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  mood: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export const insightSchema = z.object({
  summary: z.string().min(1, "Summary is required"),
  keyThemes: z.array(z.string()).default([]),
  sentiment: z.enum(["positive", "neutral", "negative"]).optional(),
  emotionalTone: z.string().optional(),
  actionItems: z.array(z.string()).default([]),
})

export type EntryInput = z.infer<typeof entrySchema>
export type InsightInput = z.infer<typeof insightSchema>
