'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EntryCard } from '@/components/journal/EntryCard'
import { Pagination } from '@/components/ui/Pagination'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Search, Filter } from 'lucide-react'

interface EntriesPageProps {
  userId: string
  initialPage: number
  initialSearch?: string
  initialTags?: string[]
}

export function EntriesPage({ userId, initialPage, initialSearch, initialTags }: EntriesPageProps) {
  const [entries, setEntries] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState(initialSearch || '')
  const [currentPage, setCurrentPage] = useState(initialPage)

  const router = useRouter()
  const searchParams = useSearchParams()

  const fetchEntries = async (page: number, searchTerm?: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      })

      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/entries?${params}`)
      const data = await response.json()

      setEntries(data.entries)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Failed to fetch entries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries(currentPage, search)
  }, [currentPage])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchEntries(1, search)

    // Update URL
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    params.set('page', '1')
    router.push(`/entries?${params}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    // Update URL
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    params.set('page', page.toString())
    router.push(`/entries?${params}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Entries</h1>

        <div className="flex items-center space-x-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search entries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} size="sm">
            Search
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : entries.length > 0 ? (
        <>
          <div className="grid gap-4">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} showInsights />
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {search ? 'No entries found matching your search.' : 'No entries yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
