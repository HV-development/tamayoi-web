"use client"

import { AlertTriangle, CheckCircle, X, Sparkles } from "lucide-react"
import type { Coupon } from "../../types/coupon"

interface CouponConfirmationPopupProps {
  isOpen: boolean
  coupon: Coupon | null
  onConfirm: () => void
  onCancel: () => void
}

export function CouponConfirmationPopup({ isOpen, coupon, onConfirm, onCancel }: CouponConfirmationPopupProps) {
  if (!isOpen || !coupon) return null

  return (
    <>
      {/* オーバーレイ - 最高のz-index */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
        onClick={onCancel}
        style={{ zIndex: 9999 }}
      ></div>

      {/* ポップアップ - クーポン一覧と同じサイズ */}
      <div className="fixed inset-x-4 top-4 bottom-4 z-[9999] max-w-md mx-auto" style={{ zIndex: 9999 }}>
        <div className="bg-white rounded-3xl shadow-2xl h-full border-4 border-green-400 animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden">
          {/* アクティブなヘッダー - 固定 */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-t-3xl relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20"></div>
            <div className="absolute top-2 right-2 animate-pulse">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-full animate-pulse">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">クーポン使用確認</h3>
                </div>
                <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="text-center">
                <div className="text-white/90 text-xs sm:text-sm font-medium">店員の方に画面をお見せください</div>
              </div>
            </div>
          </div>

          {/* スクロール可能なコンテンツ部分 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* クーポン情報 - より目立つデザイン */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-5 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-green-300 shadow-lg">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={coupon.imageUrl || "/placeholder.svg"}
                      alt={coupon.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-bold animate-bounce">
                      FREE
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base sm:text-lg text-green-900 mb-1 line-clamp-2">{coupon.name}</h4>
                    <p className="text-xs sm:text-sm text-green-700 font-medium line-clamp-1">{coupon.storeName}</p>
                  </div>
                </div>
              </div>

              {/* 注意事項 - よりアクティブなデザイン */}
              <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-2 border-red-300 shadow-sm">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1 bg-red-500 rounded-full animate-pulse flex-shrink-0">
                      <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-red-900 mb-1 sm:mb-2 text-sm sm:text-base">⚠️ 重要な注意事項</h5>
                      <ul className="text-xs sm:text-sm text-red-800 space-y-1 font-medium">
                        <li>• 一度使用したクーポンはキャンセルできません</li>
                        <li>• 使用後の返金・交換はできません</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300 shadow-sm">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1 bg-blue-500 rounded-full flex-shrink-0">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">📋 使用方法</h5>
                      <ol className="text-xs sm:text-sm text-blue-800 space-y-1 font-medium">
                        <li>1. 店員にこの画面をお見せください</li>
                        <li>2. 店員が確認後、「確定する」ボタンを押してもらいます</li>
                        <li>3. クーポンが使用済みになります</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ボタン部分 - 固定 */}
          <div className="p-4 sm:p-6 bg-white border-t border-gray-100 flex-shrink-0 rounded-b-3xl">
            <div className="space-y-3">
              <button
                onClick={onConfirm}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 sm:py-5 px-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl border-2 border-green-400 animate-pulse text-center"
              >
                <div className="text-lg sm:text-xl">✅ 確定する</div>
                <div className="text-xs sm:text-sm font-normal mt-1 opacity-90">※店員が押してください</div>
              </button>
              <button
                onClick={onCancel}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors border border-gray-300"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
