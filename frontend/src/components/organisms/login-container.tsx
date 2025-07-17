"use client"

import { HeaderLogo } from "../atoms/header-logo"
import { LoginForm } from "../molecules/login-form"

interface LoginContainerProps {
  onLogin: (email: string, password: string) => void
  onSignup: () => void
  onForgotPassword: () => void
  onBack: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function LoginContainer({
  onLogin,
  onSignup,
  onForgotPassword,
  onBack,
  onLogoClick,
  isLoading,
}: LoginContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
      {/* ヘッダー */}
      <HeaderLogo onLogoClick={onLogoClick} showBackButton={true} onBackClick={onBack} />

      {/* メインコンテンツ */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* 説明文 */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ログイン</h2>
              <p className="text-gray-600">TAMAYOIでさいたまの美味しいお店を見つけよう</p>
            </div>

            {/* ログインフォーム */}
            <LoginForm
              onLogin={onLogin}
              onSignup={onSignup}
              onForgotPassword={onForgotPassword}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
