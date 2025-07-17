"use client"

import { useState } from "react"
import { HeaderLogo } from "../atoms/header-logo"
import { PlanChangeForm } from "../molecules/plan-change-form"
import { PlanChangeSuccessModal } from "../molecules/plan-change-success-modal"
import type { Plan } from "../../types/user"

interface PlanChangeContainerProps {
  currentPlan: Plan
  onPlanChange: (planId: string) => void
  onBack: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function PlanChangeContainer({
  currentPlan,
  onPlanChange,
  onBack,
  onLogoClick,
  isLoading,
}: PlanChangeContainerProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [newPlanData, setNewPlanData] = useState<{
    name: string
    price: number
    isUpgrade: boolean
  } | null>(null)

  const handlePlanChange = (planId: string) => {
    // プラン情報を設定（実際の実装では、planIdから詳細を取得）
    const planMap: Record<string, { name: string; price: number }> = {
      "3days": { name: "3daysプラン", price: 300 },
      monthly: { name: "マンスリープラン", price: 980 },
      premium: { name: "プレミアムプラン", price: 1980 },
    }

    const selectedPlan = planMap[planId]
    if (selectedPlan) {
      setNewPlanData({
        name: selectedPlan.name,
        price: selectedPlan.price,
        isUpgrade: selectedPlan.price > currentPlan.price,
      })
      setIsSuccessModalOpen(true)
      onPlanChange(planId)
    }
  }

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false)
    onBack() // プラン管理画面に戻る
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
        {/* ヘッダー */}
        <HeaderLogo onLogoClick={onLogoClick} showBackButton={true} onBackClick={onBack} />

        {/* メインコンテンツ */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <PlanChangeForm
                currentPlan={currentPlan}
                onPlanChange={handlePlanChange}
                onCancel={onBack}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 成功モーダル */}
      {newPlanData && (
        <PlanChangeSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleSuccessModalClose}
          oldPlanName={currentPlan.name}
          newPlanName={newPlanData.name}
          newPlanPrice={newPlanData.price}
          isUpgrade={newPlanData.isUpgrade}
        />
      )}
    </>
  )
}
