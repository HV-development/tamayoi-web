"use client"

import { Crown, Calendar, AlertTriangle, Settings } from "lucide-react"
import { StatusBadge } from "../atoms/status-badge"
import { Button } from "../atoms/button"
import type { Plan } from "../../types/user"

interface PlanManagementProps {
  plan: Plan
  onChangePlan: () => void
  onCancelSubscription: () => void
  className?: string
}

export function PlanManagement({ plan, onChangePlan, onCancelSubscription, className = "" }: PlanManagementProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 現在のプラン表示 */}
      <div className="bg-white rounded-2xl border border-green-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Crown className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">現在のプラン</h2>
              <p className="text-sm text-gray-600">サブスクリプション情報</p>
            </div>
          </div>
          <StatusBadge status={plan.isActive ? "active" : "inactive"} text={plan.isActive ? "利用中" : "停止中"} />
        </div>

        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-green-900">{plan.name}</h3>
            <div className="text-2xl font-bold text-green-600">¥{plan.price.toLocaleString()}</div>
          </div>
          <p className="text-green-700 text-sm mb-3">{plan.description}</p>

          <div className="flex items-center gap-2 text-sm text-green-600">
            <Calendar className="w-4 h-4" />
            <span>開始日: {formatDate(plan.startDate)}</span>
          </div>

          {plan.nextBillingDate && (
            <div className="flex items-center gap-2 text-sm text-green-600 mt-1">
              <Calendar className="w-4 h-4" />
              <span>次回請求日: {formatDate(plan.nextBillingDate)}</span>
            </div>
          )}
        </div>
      </div>

      {/* プラン管理ボタン */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">プラン管理</h3>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onChangePlan}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium"
          >
            プランを変更する
          </Button>

          <div className="text-center text-sm text-gray-500">他のプランに変更したり、機能を比較できます</div>
        </div>
      </div>

      {/* キャンセルボタン（目立たないように） */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <div className="flex items-start gap-3 mb-3">
          <AlertTriangle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-500 leading-relaxed">
            サブスクリプションをキャンセルすると、次回請求日以降はサービスをご利用いただけなくなります。
          </div>
        </div>

        <button
          onClick={onCancelSubscription}
          className="text-xs text-gray-400 hover:text-red-500 underline transition-colors"
        >
          サブスクリプションをキャンセル
        </button>
      </div>
    </div>
  )
}
