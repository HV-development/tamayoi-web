"use client"

import { useState } from "react"
import { MapLayout } from "../components/templates/map-layout"
import { mockStores } from "../data/mock-stores"
import { mockNotifications } from "../data/mock-notifications"
import type { Store } from "../types/store"
import type { Notification } from "../types/notification"
import { mockCoupons } from "../data/mock-coupons"
import type { Coupon } from "../types/coupon"

import { mockUser, mockPlan, mockUsageHistory, mockPaymentHistory } from "../data/mock-user"
import type { User, Plan, UsageHistory, PaymentHistory } from "../types/user"

export default function HomePage() {
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("map")
  const [currentView, setCurrentView] = useState<
    "map" | "login" | "email-registration" | "signup" | "confirmation" | "subscription" | "mypage" | "password-reset"
  >("map")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signupData, setSignupData] = useState<any>(null)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [stores, setStores] = useState<Store[]>(mockStores)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const [user, setUser] = useState<User | undefined>(undefined)
  const [plan, setPlan] = useState<Plan | undefined>(undefined)
  const [usageHistory, setUsageHistory] = useState<UsageHistory[]>([])
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
  const [myPageView, setMyPageView] = useState<
    | "main"
    | "profile-edit"
    | "email-change"
    | "password-change"
    | "usage-history"
    | "payment-history"
    | "plan-management"
    | "plan-change"
  >("main")

  const [isCouponListOpen, setIsCouponListOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  // パスワード再設定関連の状態
  const [passwordResetStep, setPasswordResetStep] = useState<"form" | "complete">("form")
  const [passwordResetEmail, setPasswordResetEmail] = useState("")

  const favoriteStores = stores.filter((store) => store.isFavorite)
  const historyStores = stores
    .filter((store) => store.visitedAt)
    .sort((a, b) => (b.visitedAt?.getTime() || 0) - (a.visitedAt?.getTime() || 0))

  const hasNotification = notifications.some((n) => !n.isRead)

  const handleCurrentLocationClick = () => {
    // MapContainerで現在地取得処理を実行
    // この関数は実際にはMapContainer内で処理される
    console.log("現在地ボタンがクリックされました")
  }

  const handleTabChange = (tab: string) => {
    if (tab === "mypage") {
      if (!isAuthenticated) {
        setCurrentView("login")
      } else {
        setCurrentView("mypage")
        setActiveTab(tab)
        setMyPageView("main")
      }
    } else {
      setActiveTab(tab)
      if (currentView !== "map") {
        setCurrentView("map")
      }
    }
  }

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log("ログイン:", email, password)
      setIsAuthenticated(true)
      setUser(mockUser)
      setPlan(mockPlan)
      setUsageHistory(mockUsageHistory)
      setPaymentHistory(mockPaymentHistory)
      setCurrentView("map")
      setActiveTab("map")
      setMyPageView("main")
      setIsLoading(false)
    }, 1500)
  }

  const handleSignup = () => {
    setCurrentView("signup")
  }

  const handleForgotPassword = () => {
    setPasswordResetStep("form")
    setPasswordResetEmail("")
    setCurrentView("password-reset")
  }

  const handleBackToMap = () => {
    setCurrentView("map")
    setActiveTab("map")
    setMyPageView("main")
    setSignupData(null)
  }

  const handleBackToLogin = () => {
    setCurrentView("login")
    setPasswordResetStep("form")
    setPasswordResetEmail("")
  }

  const handleEmailSubmit = (email: string) => {
    console.log("メール送信:", email)
    // メール登録をスキップして直接新規登録フォームへ
    setCurrentView("signup")
  }

  const handleSignupSubmit = (data: any) => {
    console.log("登録データ:", data)
    setSignupData(data)
    setCurrentView("confirmation")
  }

  const handleSignupCancel = () => {
    setCurrentView("login")
    setSignupData(null)
  }

  const handleConfirmRegister = async () => {
    setIsLoading(true)
    setTimeout(() => {
      console.log("登録完了:", signupData)
      setIsAuthenticated(true)
      setUser({ ...mockUser, ...signupData })
      setPlan(mockPlan)
      setUsageHistory([])
      setPaymentHistory([])
      setIsLoading(false)
      setSignupData(null)
      setCurrentView("map")
      setActiveTab("map")
    }, 2000)
  }

  const handleConfirmEdit = () => {
    // パスワード以外の登録内容を保持したまま新規登録フォームに戻る
    const dataWithoutPassword = {
      ...signupData,
      password: "",
      passwordConfirm: "",
    }
    setSignupData(dataWithoutPassword)
    setCurrentView("signup")
  }

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log("サブスクリプション登録:", planId)
      setIsLoading(false)
      setCurrentView("map")
      setActiveTab("map")
    }, 2000)
  }

  // パスワード再設定関連のハンドラー
  const handlePasswordResetSubmit = async (email: string) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log("パスワード再設定メール送信:", email)
      setPasswordResetEmail(email)
      setPasswordResetStep("complete")
      setIsLoading(false)
    }, 1500)
  }

  const handlePasswordResetCancel = () => {
    setCurrentView("login")
    setPasswordResetStep("form")
    setPasswordResetEmail("")
  }

  const handlePasswordResetResend = () => {
    setPasswordResetStep("form")
  }

  const handleNotificationClick = () => {
    console.log("お知らせパネルを開く")
  }

  const handleNotificationItemClick = (notificationId: string) => {
    console.log("お知らせアイテムクリック:", notificationId)
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
  }

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleMenuItemClick = (itemId: string) => {
    console.log("メニュー項目クリック:", itemId)

    switch (itemId) {
      case "notifications":
        console.log("お知らせ画面を表示")
        break
      case "terms":
        console.log("利用規約画面を表示")
        break
      case "privacy":
        console.log("プライバシーポリシー画面を表示")
        break
      case "commercial-law":
        console.log("特定商取引法画面を表示")
        break
      case "contact":
        console.log("お問い合わせ画面を表示")
        break
      default:
        break
    }
  }

  const handleFavoritesClick = () => {
    setIsFavoritesOpen(true)
  }

  const handleHistoryClick = () => {
    setIsHistoryOpen(true)
  }

  const handleFavoritesClose = () => {
    setIsFavoritesOpen(false)
  }

  const handleHistoryClose = () => {
    setIsHistoryOpen(false)
        initialData={signupData}
  }

  const handleFavoriteToggle = (storeId: string) => {
    setStores((prevStores) =>
      prevStores.map((store) => (store.id === storeId ? { ...store, isFavorite: !store.isFavorite } : store)),
    )
  }

  const handleCouponsClick = (storeId: string) => {
    const store = stores.find((s) => s.id === storeId)
    if (store) {
      setSelectedStore(store)
      setIsCouponListOpen(true)
    }
  }

  const handleMyPageViewChange = (view: string) => {
    setMyPageView(view as any)
  }

  const handleEditProfile = () => {
    setMyPageView("profile-edit")
  }

  const handleChangeEmail = () => {
    console.log("メールアドレス変更")
  }

  const handleChangePassword = () => {
    console.log("パスワード変更")
  }

  const handleViewPlan = () => {
    setMyPageView("plan-management")
  }

  const handleChangePlan = () => {
    setMyPageView("plan-change")
  }

  const handlePlanChangeSubmit = async (planId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log("プラン変更:", planId)

      // プラン情報を更新
      const planMap: Record<string, { name: string; price: number; description: string }> = {
        "3days": {
          name: "3daysプラン",
          price: 300,
          description: "短期間でTAMAYOIを体験できるお試しプラン",
        },
        monthly: {
          name: "マンスリープラン",
          price: 980,
          description: "毎日お得にお酒を楽しめる定番プラン",
        },
        premium: {
          name: "プレミアムプラン",
          price: 1980,
          description: "より充実したサービスを楽しめる上位プラン",
        },
      }

      const newPlanData = planMap[planId]
      if (newPlanData && plan) {
        setPlan({
          ...plan,
          id: planId,
          name: newPlanData.name,
          price: newPlanData.price,
          description: newPlanData.description,
        })
      }

      setIsLoading(false)
      // 成功モーダルはPlanChangeContainerで表示される
    }, 1500)
  }

  const handleViewUsageHistory = () => {
    setMyPageView("usage-history")
  }

  const handleViewPaymentHistory = () => {
    setMyPageView("payment-history")
  }

  const handleCancelSubscription = () => {
    console.log("サブスクリプションキャンセル処理")
  }

  const handleWithdraw = () => {
    console.log("退会処理")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(undefined)
    setPlan(undefined)
    setUsageHistory([])
    setPaymentHistory([])
    setCurrentView("map")
    setActiveTab("map")
    setMyPageView("main")
    console.log("ログアウト")
  }

  // 利用履歴関連のハンドラー
  const handleShowStoreOnMap = (storeId: string) => {
    console.log("マップで店舗を表示:", storeId)
    // マップ画面に戻って該当店舗を表示
    setCurrentView("map")
    setActiveTab("map")
    setMyPageView("main")
    // 実際の実装では、店舗IDに基づいてマップの位置を調整
  }

  const handleUseSameCoupon = (couponId: string) => {
    console.log("同じクーポンを利用:", couponId)
    // クーポン利用画面に遷移
    // 実際の実装では、該当クーポンの利用画面を表示
  }

  const handleLogoClick = () => {
    console.log("ロゴクリック - マップに遷移")
    setCurrentView("map")
    setActiveTab("map")
    setMyPageView("main")
  }

  const handleCouponListClose = () => {
    setIsCouponListOpen(false)
    setSelectedStore(null)
  }

  const handleCouponListBack = () => {
    setIsCouponListOpen(false)
    setSelectedStore(null)
  }

  const handleUseCoupon = (couponId: string) => {
    const storeCoupons = selectedStore ? mockCoupons[selectedStore.id] || [] : []
    const coupon = storeCoupons.find((c) => c.id === couponId)
    if (coupon) {
      setSelectedCoupon(coupon)
      setIsConfirmationOpen(true)
    }
  }

  const handleConfirmCoupon = () => {
    console.log("クーポン使用確定:", selectedCoupon?.id)
    setIsConfirmationOpen(false)
    setIsSuccessModalOpen(true)
  }

  const handleCancelCoupon = () => {
    setIsConfirmationOpen(false)
    setSelectedCoupon(null)
  }

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false)
    setIsCouponListOpen(false)
    setSelectedCoupon(null)
    setSelectedStore(null)
  }

  const handleProfileEditSubmit = async (data: any) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log("プロフィール更新:", data)
      // ユーザー情報を更新
      setUser((prev) => (prev ? { ...prev, ...data } : prev))
      setIsLoading(false)
      // 成功モーダルはProfileEditContainerで表示される
    }, 1500)
  }

  return (
    <MapLayout
      selectedArea={selectedArea}
      selectedGenres={selectedGenres}
      activeTab={activeTab}
      currentView={currentView}
      isAuthenticated={isAuthenticated}
      isLoading={isLoading}
      signupData={signupData}
      hasNotification={hasNotification}
      favoriteStores={favoriteStores}
      historyStores={historyStores}
      isFavoritesOpen={isFavoritesOpen}
      isHistoryOpen={isHistoryOpen}
      notifications={notifications}
      user={user}
      plan={plan}
      usageHistory={usageHistory}
      paymentHistory={paymentHistory}
      myPageView={myPageView}
      passwordResetStep={passwordResetStep}
      passwordResetEmail={passwordResetEmail}
      onAreaChange={setSelectedArea}
      onGenresChange={setSelectedGenres}
      onCurrentLocationClick={handleCurrentLocationClick}
      onTabChange={handleTabChange}
      onFavoritesClick={handleFavoritesClick}
      onHistoryClick={handleHistoryClick}
      onFavoritesClose={handleFavoritesClose}
      onHistoryClose={handleHistoryClose}
      onFavoriteToggle={handleFavoriteToggle}
      onCouponsClick={handleCouponsClick}
      onMyPageViewChange={handleMyPageViewChange}
      onEditProfile={handleEditProfile}
      onChangeEmail={handleChangeEmail}
      onChangePassword={handleChangePassword}
      onViewPlan={handleViewPlan}
      onChangePlan={handleChangePlan}
      onPlanChangeSubmit={handlePlanChangeSubmit}
      onViewUsageHistory={handleViewUsageHistory}
      onViewPaymentHistory={handleViewPaymentHistory}
      onCancelSubscription={handleCancelSubscription}
      onWithdraw={handleWithdraw}
      onLogout={handleLogout}
      onLogin={handleLogin}
      onSignup={handleSignup}
      onForgotPassword={handleForgotPassword}
      onBackToMap={handleBackToMap}
      onBackToLogin={handleBackToLogin}
      onEmailSubmit={handleEmailSubmit}
      onSignupSubmit={handleSignupSubmit}
      onSignupCancel={handleSignupCancel}
      onConfirmRegister={handleConfirmRegister}
      onConfirmEdit={handleConfirmEdit}
      onSubscribe={handleSubscribe}
      onPasswordResetSubmit={handlePasswordResetSubmit}
      onPasswordResetCancel={handlePasswordResetCancel}
      onPasswordResetResend={handlePasswordResetResend}
      onNotificationClick={handleNotificationClick}
      onNotificationItemClick={handleNotificationItemClick}
      onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
      onMenuItemClick={handleMenuItemClick}
      onShowStoreOnMap={handleShowStoreOnMap}
      onUseSameCoupon={handleUseSameCoupon}
      onLogoClick={handleLogoClick}
      isCouponListOpen={isCouponListOpen}
      isConfirmationOpen={isConfirmationOpen}
      isSuccessModalOpen={isSuccessModalOpen}
      selectedStore={selectedStore}
      selectedCoupon={selectedCoupon}
      storeCoupons={selectedStore ? mockCoupons[selectedStore.id] || [] : []}
      onCouponListClose={handleCouponListClose}
      onCouponListBack={handleCouponListBack}
      onUseCoupon={handleUseCoupon}
      onConfirmCoupon={handleConfirmCoupon}
      onCancelCoupon={handleCancelCoupon}
      onSuccessModalClose={handleSuccessModalClose}
      onProfileEditSubmit={handleProfileEditSubmit}
    />
  )
}
