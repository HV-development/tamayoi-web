"use client"

import { HeaderLogo } from "../atoms/header-logo"
import { EmailRegistrationForm } from "../molecules/email-registration-form"

interface EmailRegistrationContainerProps {
  onSubmit: (email: string) => void
  onBack: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function EmailRegistrationContainer({
  onSubmit,
  onBack,
  onLogoClick,
  isLoading,
}: EmailRegistrationContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
      {/* ヘッダー */}
      <HeaderLogo onLogoClick={onLogoClick} showBackButton={true} onBackClick={onBack} />

      {/* メインコンテンツ */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">新規登録</h2>
            </div>

            <EmailRegistrationForm onSubmit={onSubmit} onBack={onBack} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
