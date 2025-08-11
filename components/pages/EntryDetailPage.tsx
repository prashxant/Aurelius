'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InsightCard } from '@/components/journal/InsightCard'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Tag
} from 'lucide-react'
import { format } from 'date-fns'

interface EntryDetailPageProps {
  entry: any
}

export function EntryDetailPage({ entry }: EntryDetailPageProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/entries/${entry.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/entries')
      }
    } catch (error) {
      console.error('Failed to delete entry:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/entries">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Entries
          </Button>
        </Link>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Entry Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{entry.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground space-x-4 mt-1">
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {format(new Date(entry.createdAt), 'MMM d, yyyy')}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {format(new Date(entry.createdAt), 'h:mm a')}
                </span>
              </div>
              {entry.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {entry.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="flex items-center">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                {entry.content}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <div className="space-y-6">
          {entry.insights?.length > 0 ? (
            entry.insights.map((insight: any) => (
              <InsightCard key={insight.id} insight={insight} />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                No insights available for this entry.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

