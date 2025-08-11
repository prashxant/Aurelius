// src/lib/ai.ts
import { InsightInput } from "./validations"

export async function generateInsightFromContent(content: string): Promise<InsightInput> {
  // This is a mock implementation - replace with your preferred AI service
  // Options: OpenAI API, Anthropic Claude, local models, etc.

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI assistant that analyzes journal entries and provides insights.
            Return a JSON object with: summary, keyThemes (array), sentiment (positive/neutral/negative),
            emotionalTone, and actionItems (array).`
          },
          {
            role: "user",
            content: `Analyze this journal entry and provide insights: ${content}`
          }
        ],
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const insight = JSON.parse(data.choices[0].message.content)

    return {
      summary: insight.summary,
      keyThemes: insight.keyThemes || [],
      sentiment: insight.sentiment,
      emotionalTone: insight.emotionalTone,
      actionItems: insight.actionItems || [],
    }
  } catch (error) {
    console.error("Error generating insight:", error)
    // Fallback to basic analysis
    return {
      summary: "Analysis temporarily unavailable. Please try again later.",
      keyThemes: [],
      sentiment: "neutral",
      emotionalTone: "reflective",
      actionItems: [],
    }
  }
}
