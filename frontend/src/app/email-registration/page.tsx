'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EmailRegistrationLayout } from '@/components/templates/email-registration-layout'

export default function EmailRegistrationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleEmailSubmit = async (email: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (data.success) {
        router.push(`/signup?email=${encodeURIComponent(email)}`)
      } else {
        alert(data.message || 'エラーが発生しました')
      }
    } catch (error) {
      alert('ネットワークエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => router.push('/')
  const handleLogoClick = () => router.push('/')

  return (
    <EmailRegistrationLayout
      onSubmit={handleEmailSubmit}
      onBack={handleBack}
      onLogoClick={handleLogoClick}
      isLoading={isLoading}
    />
  )
}
