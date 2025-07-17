'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignupLayout } from '@/components/templates/signup-layout'
import { useSearchParamsSafe } from '@/hooks/use-search-params-safe'

export default function SignupAltPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParamsSafe()

  const handleSignupSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          token: searchParams.get('token') || '',
        }),
      })

      const result = await response.json()
      if (result.success) {
        router.push('/?registered=true')
      } else {
        alert(result.message || 'エラーが発生しました')
      }
    } catch (error) {
      alert('ネットワークエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => router.push('/email-registration')
  const handleLogoClick = () => router.push('/')

  // searchParamsの準備ができるまでローディング表示
  if (!searchParams.isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <SignupLayout
      initialData={{ email: searchParams.get('email') || undefined }}
      onSubmit={handleSignupSubmit}
      onCancel={handleCancel}
      onLogoClick={handleLogoClick}
      isLoading={isLoading}
    />
  )
}