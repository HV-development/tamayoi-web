import { MyPageContainer } from "../organisms/mypage-container"
import type { User, Plan, UsageHistory, PaymentHistory } from "../../types/user"

interface MyPageLayoutProps {
  user: User
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
  onWithdraw: () => void
  onLogout: () => void
  onBack: () => void
  onShowStoreOnMap: (storeId: string) => void
  onUseSameCoupon: (couponId: string) => void
  onLogoClick: () => void
  onProfileEditSubmit: (data: any) => void
}

export function MyPageLayout({
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
  onWithdraw,
  onLogoClick,
  onProfileEditSubmit,
}: MyPageLayoutProps) {
  return (
    <MyPageContainer
      user={user}
      plan={plan}
      usageHistory={usageHistory}
      paymentHistory={paymentHistory}
      currentView={currentView}
      onViewChange={onViewChange}
      onEditProfile={onEditProfile}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onViewPlan={onViewPlan}
      onViewUsageHistory={onViewUsageHistory}
      onViewPaymentHistory={onViewPaymentHistory}
      onCancelSubscription={onCancelSubscription}
      onLogout={onLogout}
      onBack={onBack}
      onShowStoreOnMap={onShowStoreOnMap}
      onUseSameCoupon={onUseSameCoupon}
      onLogoClick={onLogoClick}
      onProfileEditSubmit={onProfileEditSubmit}
    />
  )
}
