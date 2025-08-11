import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { EntriesPage } from '@/components/pages/EntriesPage'

export default async function Entries({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; tags?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/')
  }

  const page = parseInt(searchParams.page || '1')
  const search = searchParams.search
  const tags = searchParams.tags ? searchParams.tags.split(',') : undefined

  return (
    <DashboardLayout>
      <EntriesPage
        userId={session.user.id}
        initialPage={page}
        initialSearch={search}
        initialTags={tags}
      />
    </DashboardLayout>
  )
}
