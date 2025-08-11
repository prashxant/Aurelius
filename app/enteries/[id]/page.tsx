import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { EntryDetailPage } from '@/components/pages/EntryDetailPage'
import { db } from '@/lib/db'

export default async function EntryDetail({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/')
  }

  const entry = await db.entry.findById(params.id, session.user.id)

  if (!entry) {
    notFound()
  }

  return (
    <DashboardLayout>
      <EntryDetailPage entry={entry} />
    </DashboardLayout>
  )
}
