'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EntryCard } from '@/components/journal/EntryCard'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { PenTool, ArrowRight } from 'lucide-react'

interface DashboardContentProps {
  recentEntries: any[]
  stats: {
    total: number
    thisMonth: number
    thisWeek: number
    avgContentLength: number
  }
}

export function DashboardContent({ recentEntries, stats }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ready to write?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start your journal entry for today
              </p>
            </div>
            <Link href="/write">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <PenTool className="mr-2 h-5 w-5" />
                Write Entry
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Recent Entries */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Entries</h3>
        <Link href="/entries">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {recentEntries.length > 0 ? (
        <div className="grid gap-4">
          {recentEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} showInsights={false} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              No entries yet. Start writing your first journal entry!
            </p>
            <Link href="/write">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
