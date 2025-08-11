import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { DashboardContent } from '@/components/pages/DashboardContent'
import { db } from '@/lib/db'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/')
  }

  const [entries, stats] = await Promise.all([
    db.entry.findMany({
      userId: session.user.id,
      page: 1,
      limit: 5,
    }),
    db.entry.getStats(session.user.id),
  ])

  return (
    <DashboardLayout>
      <DashboardContent
        recentEntries={entries.entries}
        stats={stats}
      />
    </DashboardLayout>
  )
}
