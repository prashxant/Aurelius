'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EntryForm } from '@/components/forms/EntryForm'
import { PenTool } from 'lucide-react'

export function WritePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSuccess = (entry: any) => {
    router.push(`/entries/${entry.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-6 w-6" />
            New Journal Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EntryForm onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  )
}
