"use client"

import { FilterControls } from "../molecules/filter-controls"
import { NavigationBar } from "../molecules/navigation-bar"
import { MapContainer } from "../organisms/map-container"
import { LoginLayout } from "./login-layout"
import { EmailRegistrationLayout } from "./email-registration-layout"
import { SignupLayout } from "./signup-layout"
import { ConfirmationLayout } from "./confirmation-layout"
import { SubscriptionLayout } from "./subscription-layout"
import { PasswordResetLayout } from "./password-reset-layout"
import { FavoritesPopup } from "../molecules/favorites-popup"
import { HistoryPopup } from "../molecules/history-popup"
import { MyPageLayout } from "./mypage-layout"
import { PlanManagementLayout } from "./plan-management-layout"
import { PlanChangeLayout } from "./plan-change-layout"
import { CouponListPopup } from "../molecules/coupon-list-popup"
import { CouponConfirmationPopup } from "../molecules/coupon-confirmation-popup"
import type { Store } from "../../types/store"
import type { User, Plan, UsageHistory, PaymentHistory } from "../../types/user"
import type { Notification } from "../../types/notification"
import type { Coupon } from "../../types/coupon"
import { CouponUsedSuccessModal } from "../molecules/coupon-used-success-modal"

interface MapLayoutProps {
  selectedArea: string
  selectedGenres: string[]
  activeTab: string
  currentView:
    | "map"
    | "login"
    | "email-registration"
    | "signup"
    | "confirmation"
    | "subscription"
    | "mypage"
    | "password-reset"
  isAuthenticated: boolean
  isLoading?: boolean
  signupData?: any
  hasNotification?: boolean
  favoriteStores: Store[]
  historyStores: Store[]
  isFavoritesOpen: boolean
  isHistoryOpen: boolean
  notifications: Notification[]
  user?: User
  plan?: Plan
  usageHistory?: UsageHistory[]
  paymentHistory?: PaymentHistory[]
  myPageView?:
    | "main"
    | "profile-edit"
    | "email-change"
    | "password-change"
    | "usage-history"
    | "payment-history"
    | "plan-management"
    | "plan-change"
  isCouponListOpen: boolean
  isConfirmationOpen: boolean
  selectedStore: Store | null
  selectedCoupon: Coupon | null
  storeCoupons: Coupon[]
  passwordResetStep: "form" | "complete"
  passwordResetEmail: string
  onAreaChange: (area: string) => void
  onGenresChange: (genres: string[]) => void
  onCurrentLocationClick: () => void
  onTabChange: (tab: string) => void
  onFavoritesClick: () => void
  onHistoryClick: () => void
  onFavoritesClose: () => void
  onHistoryClose: () => void
  onFavoriteToggle: (storeId: string) => void
  onCouponsClick: (storeId: string) => void
  onMyPageViewChange?: (view: string) => void
  onEditProfile?: () => void
  onChangeEmail?: () => void
  onChangePassword?: () => void
  onViewPlan?: () => void
  onChangePlan?: () => void
  onPlanChangeSubmit?: (planId: string) => void
  onViewUsageHistory?: () => void
  onViewPaymentHistory?: () => void
  onCancelSubscription?: () => void
  onWithdraw?: () => void
  onLogout?: () => void
  onLogin: (email: string, password: string) => void
  onSignup: () => void
  onForgotPassword: () => void
  onBackToMap: () => void
  onBackToLogin: () => void
  onEmailSubmit: (email: string) => void
  onSignupSubmit: (data: any) => void
  onSignupCancel: () => void
  onConfirmRegister: () => void
  onConfirmEdit: () => void
  onSubscribe: (planId: string) => void
  onPasswordResetSubmit: (email: string) => void
  onPasswordResetCancel: () => void
  onPasswordResetResend: () => void
  onNotificationClick: () => void
  onNotificationItemClick: (notificationId: string) => void
  onMarkAllNotificationsRead: () => void
  onMenuItemClick: (itemId: string) => void
  onLogoClick: () => void
  onCouponListClose: () => void
  onCouponListBack: () => void
  onUseCoupon: (couponId: string) => void
  onConfirmCoupon: () => void
  onCancelCoupon: () => void
  isSuccessModalOpen: boolean
  onSuccessModalClose: () => void
  onProfileEditSubmit?: (data: any) => void
}

export function MapLayout({
  selectedArea,
  selectedGenres,
  activeTab,
  currentView,
  isAuthenticated,
  isLoading,
  signupData,
  hasNotification = false,
  favoriteStores,
  historyStores,
  isFavoritesOpen,
  isHistoryOpen,
  notifications,
  user,
  plan,
  usageHistory = [],
  paymentHistory = [],
  myPageView = "main",
  isCouponListOpen,
  isConfirmationOpen,
  selectedStore,
  selectedCoupon,
  storeCoupons,
  passwordResetStep,
  passwordResetEmail,
  onAreaChange,
  onGenresChange,
  onCurrentLocationClick,
  onTabChange,
  onFavoritesClick,
  onHistoryClick,
  onFavoritesClose,
  onHistoryClose,
  onFavoriteToggle,
  onCouponsClick,
  onMyPageViewChange = () => {},
  onEditProfile = () => {},
  onChangeEmail = () => {},
  onChangePassword = () => {},
  onViewPlan = () => {},
  onChangePlan = () => {},
  onPlanChangeSubmit = () => {},
  onViewUsageHistory = () => {},
  onViewPaymentHistory = () => {},
  onCancelSubscription = () => {},
  onWithdraw = () => {},
  onLogout = () => {},
  onLogin,
  onSignup,
  onForgotPassword,
  onBackToMap,
  onBackToLogin,
  onEmailSubmit,
  onSignupSubmit,
  onSignupCancel,
  onConfirmRegister,
  onConfirmEdit,
  onSubscribe,
  onPasswordResetSubmit,
  onPasswordResetCancel,
  onPasswordResetResend,
  onNotificationClick,
  onNotificationItemClick,
  onMarkAllNotificationsRead,
  onMenuItemClick,
  onLogoClick,
  onCouponListClose,
  onCouponListBack,
  onUseCoupon,
  onConfirmCoupon,
  onCancelCoupon,
  isSuccessModalOpen,
  onSuccessModalClose,
  onProfileEditSubmit = () => {},
}: MapLayoutProps) {
  if (currentView === "password-reset") {
    return (
      <PasswordResetLayout
        currentStep={passwordResetStep}
        email={passwordResetEmail}
        onSubmit={onPasswordResetSubmit}
        onCancel={onPasswordResetCancel}
        onBackToLogin={onBackToLogin}
        onResend={onPasswordResetResend}
        onLogoClick={onLogoClick}
        isLoading={isLoading}
      />
    )
  }

  if (currentView === "mypage" && user && plan) {
    // プラン変更画面の場合
    if (myPageView === "plan-change") {
      return (
        <PlanChangeLayout
          currentPlan={plan}
          onPlanChange={onPlanChangeSubmit}
          onBack={() => onMyPageViewChange("plan-management")}
          onLogoClick={onLogoClick}
          isLoading={isLoading}
        />
      )
    }

    // プラン管理画面の場合
    if (myPageView === "plan-management") {
      return (
        <PlanManagementLayout
          plan={plan}
          onChangePlan={() => onMyPageViewChange("plan-change")}
          onCancelSubscription={onCancelSubscription}
          onBack={() => onMyPageViewChange("main")}
          onLogoClick={onLogoClick}
        />
      )
    }

    return (
      <MyPageLayout
        user={user}
        plan={plan}
        usageHistory={usageHistory}
        paymentHistory={paymentHistory}
        currentView={myPageView}
        onViewChange={onMyPageViewChange}
        onEditProfile={onEditProfile}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onViewPlan={onViewPlan}
        onViewUsageHistory={onViewUsageHistory}
        onViewPaymentHistory={onViewPaymentHistory}
        onCancelSubscription={onCancelSubscription}
        onWithdraw={onWithdraw}
        onLogout={onLogout}
        onBack={onBackToMap}
        onShowStoreOnMap={onBackToMap}
        onUseSameCoupon={() => {}}
        onLogoClick={onLogoClick}
        onProfileEditSubmit={onProfileEditSubmit || (() => {})}
      />
    )
  }

  if (currentView === "subscription") {
    return <SubscriptionLayout onSubscribe={onSubscribe} onLogoClick={onLogoClick} isLoading={isLoading} />
  }


  if (currentView === "confirmation") {
    return (
      <ConfirmationLayout
        data={signupData}
        onRegister={onConfirmRegister}
        onEdit={onConfirmEdit}
        onLogoClick={onLogoClick}
        isLoading={isLoading}
      />
    )
  }

  if (currentView === "login") {
    return (
      <LoginLayout
        onLogin={onLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
        onBack={onBackToMap}
        onLogoClick={onLogoClick}
        isLoading={isLoading}
      />
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <FilterControls
        selectedArea={selectedArea}
        selectedGenres={selectedGenres}
        notifications={notifications}
        onAreaChange={onAreaChange}
        onGenresChange={onGenresChange}
        onCurrentLocationClick={onCurrentLocationClick}
        onNotificationClick={onNotificationClick}
        onNotificationItemClick={onNotificationItemClick}
        onMarkAllNotificationsRead={onMarkAllNotificationsRead}
        onMenuItemClick={onMenuItemClick}
        onLogoClick={onLogoClick}
        hasNotification={hasNotification}
      />
      <MapContainer selectedArea={selectedArea} selectedGenres={selectedGenres} />
      <NavigationBar
        activeTab={activeTab}
        onTabChange={onTabChange}
        isAuthenticated={isAuthenticated}
        onFavoritesClick={onFavoritesClick}
        onHistoryClick={onHistoryClick}
      />

      {/* ポップアップ */}
      <FavoritesPopup
        isOpen={isFavoritesOpen}
        stores={favoriteStores}
        onClose={onFavoritesClose}
        onFavoriteToggle={onFavoriteToggle}
        onCouponsClick={onCouponsClick}
      />
      <HistoryPopup
        isOpen={isHistoryOpen}
        stores={historyStores}
        onClose={onHistoryClose}
        onFavoriteToggle={onFavoriteToggle}
        onCouponsClick={onCouponsClick}
      />
      {/* クーポン関連ポップアップ */}
      <CouponListPopup
        isOpen={isCouponListOpen}
        storeName={selectedStore?.name || ""}
        coupons={storeCoupons}
        onClose={onCouponListClose}
        onBack={onCouponListBack}
        onUseCoupon={onUseCoupon}
      />
      <CouponConfirmationPopup
        isOpen={isConfirmationOpen}
        coupon={selectedCoupon}
        onConfirm={onConfirmCoupon}
        onCancel={onCancelCoupon}
      />
      <CouponUsedSuccessModal isOpen={isSuccessModalOpen} coupon={selectedCoupon} onClose={onSuccessModalClose} />
    </div>
  )
}
