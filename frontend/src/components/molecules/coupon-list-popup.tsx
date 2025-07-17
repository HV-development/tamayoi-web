"use client"

import { ArrowLeft, Ticket, X } from "lucide-react"
import { CouponCard } from "../atoms/coupon-card"
import type { Coupon } from "../../types/coupon"

interface CouponListPopupProps {
  isOpen: boolean
  storeName: string
  coupons: Coupon[]
  onClose: () => void
  onBack: () => void
  onUseCoupon: (couponId: string) => void
}

export function CouponListPopup({ isOpen, storeName, coupons, onClose, onBack, onUseCoupon }: CouponListPopupProps) {
  if (!isOpen) return null

  return (
    <>
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={onClose}></div>

      {/* ポップアップ */}
      <div className="fixed inset-x-4 top-4 bottom-4 bg-white rounded-3xl shadow-2xl z-50 max-w-md mx-auto overflow-hidden border-2 border-green-200">
        <div className="flex flex-col h-full">
          {/* ヘッダー */}
          <div className="bg-green-600 p-6 text-white flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">戻る</span>
              </button>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">クーポン一覧</h3>
                <p className="text-green-100 text-sm">{storeName}</p>
              </div>
            </div>
          </div>

          {/* カウンター */}
          <div className="px-6 py-4 bg-green-50 border-b border-green-100 flex-shrink-0">
            <div className="text-center">
              <span className="text-green-800 font-medium">
                {coupons.length > 0 ? `${coupons.length}件のクーポンが利用可能` : "利用可能なクーポンがありません"}
              </span>
            </div>
          </div>

          {/* クーポンリスト */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {coupons.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500 text-lg font-medium mb-2">クーポンがありません</div>
                <div className="text-gray-400 text-sm">この店舗にはまだクーポンが登録されていません</div>
              </div>
            ) : (
              <div className="space-y-4">
                {coupons.map((coupon, index) => (
                  <div
                    key={coupon.id}
                    className="animate-in slide-in-from-bottom-4 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CouponCard coupon={coupon} onUse={onUseCoupon} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
