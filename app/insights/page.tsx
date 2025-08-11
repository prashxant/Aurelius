import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { InsightsPage } from '@/components/pages/InsightsPage'
import { db } from '@/lib/db'

export default async function Insights() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/')
  }

  const sentimentTrends = await db.insight.getSentimentTrends(session.user.id, 30)

  return (
    <DashboardLayout>
      <InsightsPage sentimentTrends={sentimentTrends} />
    </DashboardLayout>
  )
}
