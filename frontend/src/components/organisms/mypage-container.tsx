"use client"

import { Mail, Lock, History, CreditCard, Crown, UserX, LogOut } from "lucide-react"
import { HeaderLogo } from "../atoms/header-logo"
import { ProfileSection } from "../molecules/profile-section"
import { MenuButton } from "../atoms/menu-button"
import { UsageHistoryList } from "../molecules/usage-history-list"
import { PaymentHistoryList } from "../molecules/payment-history-list"
import type { User as UserType, Plan, UsageHistory, PaymentHistory } from "../../types/user"
import { ProfileEditLayout } from "../templates/profile-edit-layout"
import { EmailChangeLayout } from "../templates/email-change-layout"
import { PasswordChangeLayout } from "../templates/password-change-layout"

interface MyPageContainerProps {
  user: UserType
  plan: Plan
  usageHistory: UsageHistory[]
  paymentHistory: PaymentHistory[]
  currentView:
    | "main"
    | "profile-edit"
    | "email-change"
    | "password-change"
    | "usage-history"
    | "payment-history"
    | "plan-management"
  onViewChange: (view: string) => void
  onEditProfile: () => void
  onChangeEmail: () => void
  onChangePassword: () => void
  onViewPlan: () => void
  onViewUsageHistory: () => void
  onViewPaymentHistory: () => void
  onCancelSubscription: () => void
  onLogout: () => void
  onBack: () => void
  onShowStoreOnMap: (storeId: string) => void
  onUseSameCoupon: (couponId: string) => void
  onLogoClick: () => void
  onProfileEditSubmit: (data: any) => void
  onEmailChangeSubmit?: (currentPassword: string, newEmail: string) => void
  onPasswordChangeSubmit?: (currentPassword: string, newPassword: string) => void
  emailChangeStep?: "form" | "complete"
  passwordChangeStep?: "form" | "complete"
  newEmail?: string
}

export function MyPageContainer({
  user,
  plan,
  usageHistory,
  paymentHistory,
  currentView,
  onViewChange,
  onEditProfile,
  onChangeEmail,
  onChangePassword,
  onViewPlan,
  onViewUsageHistory,
  onViewPaymentHistory,
  onCancelSubscription,
  onLogout,
  onBack,
  onShowStoreOnMap,
  onUseSameCoupon,
  onLogoClick,
  onProfileEditSubmit,
  onEmailChangeSubmit = () => {},
  onPasswordChangeSubmit = () => {},
  emailChangeStep = "form",
  passwordChangeStep = "form",
  newEmail = "",
}: MyPageContainerProps) {
  if (currentView === "profile-edit") {
    return (
      <ProfileEditLayout
        user={user}
        onSubmit={onProfileEditSubmit}
        onCancel={() => onViewChange("main")}
        onLogoClick={onLogoClick}
      />
    )
  }

  if (currentView === "email-change") {
    return (
      <EmailChangeLayout
        currentStep={emailChangeStep}
        currentEmail={user.email}
        newEmail={newEmail}
        onSubmit={onEmailChangeSubmit}
        onCancel={() => onViewChange("main")}
        onBackToMyPage={() => onViewChange("main")}
        onResend={() => {}}
        onLogoClick={onLogoClick}
        isLoading={false}
      />
    )
  }

  if (currentView === "password-change") {
    return (
      <PasswordChangeLayout
        currentStep={passwordChangeStep}
        onSubmit={onPasswordChangeSubmit}
        onCancel={() => onViewChange("main")}
        onBackToMyPage={() => onViewChange("main")}
        onLogoClick={onLogoClick}
        isLoading={false}
      />
    )
  }

  if (currentView === "usage-history") {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderLogo onLogoClick={onLogoClick} showBackButton={true} onBackClick={() => onViewChange("main")} />
        <div className="p-4 max-w-md mx-auto">
          <UsageHistoryList history={usageHistory} onShowOnMap={onShowStoreOnMap} onUseSameCoupon={onUseSameCoupon} />
        </div>
      </div>
    )
  }

  if (currentView === "payment-history") {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderLogo onLogoClick={onLogoClick} showBackButton={true} onBackClick={() => onViewChange("main")} />
        <div className="p-4 max-w-md mx-auto">
          <PaymentHistoryList history={paymentHistory} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <HeaderLogo onLogoClick={onLogoClick} showBackButton={true} onBackClick={onBack} />

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* プロフィールセクション */}
        <ProfileSection user={user} onEdit={onEditProfile} />

        {/* メニューリスト */}
        <div className="space-y-3">
          <MenuButton icon={Crown} title="プラン" subtitle="現在のプランと変更" onClick={onViewPlan} />

          <MenuButton
            icon={Mail}
            title="メールアドレス変更"
            subtitle="ログイン用メールアドレスの変更"
            onClick={onChangeEmail}
          />

          <MenuButton
            icon={Lock}
            title="パスワード変更"
            subtitle="ログイン用パスワードの変更"
            onClick={onChangePassword}
          />

          <MenuButton icon={History} title="利用履歴" subtitle="クーポン利用履歴を確認" onClick={onViewUsageHistory} />

          <MenuButton icon={CreditCard} title="決済履歴" subtitle="お支払い履歴を確認" onClick={onViewPaymentHistory} />

          <MenuButton
            icon={UserX}
            title="退会"
            subtitle="TAMAYOIサービスからの退会"
            onClick={onCancelSubscription}
            variant="danger"
          />

          <MenuButton
            icon={LogOut}
            title="ログアウト"
            subtitle="アカウントからログアウト"
            onClick={onLogout}
            variant="danger"
          />
        </div>
      </div>
    </div>
  )
}
