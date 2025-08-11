// src/components/journal/InsightCard.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp } from "lucide-react"

interface InsightCardProps {
  entryId: string
  existingInsight?: any
}

export function InsightCard({ entryId, existingInsight }: InsightCardProps) {
  const [insight, setInsight] = useState(existingInsight)
  const [isLoading, setIsLoading] = useState(false)

  const generateInsight = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/insights/${entryId}`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to generate insight")

      const newInsight = await response.json()
      setInsight(newInsight)
    } catch (error) {
      console.error("Error generating insight:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!insight) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">
            Generate AI insights for this entry
          </p>
          <Button onClick={generateInsight} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Insights"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Summary</h4>
          <p className="text-muted-foreground">{insight.summary}</p>
        </div>

        {insight.keyThemes?.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Key Themes</h4>
            <div className="flex flex-wrap gap-2">
              {insight.keyThemes.map((theme: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {insight.sentiment && (
          <div>
            <h4 className="font-semibold mb-2">Sentiment</h4>
            <Badge
              variant={
                insight.sentiment === "positive"
                  ? "default"
                  : insight.sentiment === "negative"
                  ? "destructive"
                  : "secondary"
              }
            >
              {insight.sentiment}
            </Badge>
          </div>
        )}

        {insight.actionItems?.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Action Items</h4>
            <ul className="list-disc list-inside space-y-1">
              {insight.actionItems.map((item: string, index: number) => (
                <li key={index} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
