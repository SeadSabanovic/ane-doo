'use client'

import { usePathname } from 'next/navigation'
import Navigation from './navigation'
import Footer from '@/components/layout/footer'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  )
}
