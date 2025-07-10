"use client"

import { Ticket, Clock } from "lucide-react"
import type { Coupon } from "../../types/coupon"

interface CouponCardProps {
  coupon: Coupon
  onUse: (couponId: string) => void
  className?: string
}

export function CouponCard({ coupon, onUse, className = "" }: CouponCardProps) {
  const formatExpiryDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div
      className={`bg-white rounded-2xl border-2 border-green-200 hover:border-green-300 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* クーポン画像 */}
      <div className="relative h-48 overflow-hidden">
        <img src={coupon.imageUrl || "/placeholder.svg"} alt={coupon.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <div className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Ticket className="w-4 h-4" />
            <span className="text-sm font-medium">クーポン</span>
          </div>
        </div>
      </div>

      {/* クーポン情報 */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-xl text-gray-900 mb-2">{coupon.name}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{coupon.description}</p>
        </div>

        {/* 有効期限 */}
        {coupon.expiresAt && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>有効期限: {formatExpiryDate(coupon.expiresAt)}</span>
          </div>
        )}

        {/* 使用ボタン */}
        <button
          onClick={() => onUse(coupon.id)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          このクーポンを使用する
        </button>
      </div>
    </div>
  )
}
