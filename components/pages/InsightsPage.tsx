'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SentimentChart } from '@/components/insights/SentimentChart'
import { ThemeCloud } from '@/components/insights/ThemeCloud'
import { InsightsSummary } from '@/components/insights/InsightsSummary'
import { Brain, TrendingUp, Hash } from 'lucide-react'

interface InsightsPageProps {
  sentimentTrends: Array<{
    date: Date
    sentiment: string | null
    themes: string[]
  }>
}

export function InsightsPage({ sentimentTrends }: InsightsPageProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Brain className="h-7 w-7" />
        AI Insights
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sentiment Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentChart data={sentimentTrends} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Common Themes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeCloud data={sentimentTrends} />
          </CardContent>
        </Card>
      </div>

      <InsightsSummary sentimentTrends={sentimentTrends} />
    </div>
  )
}
