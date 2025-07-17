"use client"

import { CheckCircle, X, Crown, Sparkles, Gift } from "lucide-react"
import { useEffect, useState } from "react"

interface PlanChangeSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  oldPlanName: string
  newPlanName: string
  newPlanPrice: number
  isUpgrade: boolean
}

export function PlanChangeSuccessModal({
  isOpen,
  onClose,
  oldPlanName,
  newPlanName,
  newPlanPrice,
  isUpgrade,
}: PlanChangeSuccessModalProps) {
  const [animationPhase, setAnimationPhase] = useState<"entering" | "celebrating" | "complete">("entering")

  useEffect(() => {
    if (isOpen) {
      setAnimationPhase("entering")

      // アニメーションの段階的実行
      const timer1 = setTimeout(() => setAnimationPhase("celebrating"), 500)
      const timer2 = setTimeout(() => setAnimationPhase("complete"), 2500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]" style={{ zIndex: 10000 }}></div>

      {/* モーダル */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" style={{ zIndex: 10000 }}>
        <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full border-4 border-green-400 animate-in zoom-in-95 duration-500 overflow-hidden">
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20"></div>

            {/* アニメーション要素 */}
            {animationPhase === "celebrating" && (
              <>
                <div className="absolute top-2 right-2 animate-spin">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="absolute top-4 left-4 animate-bounce">
                  <Gift className="w-5 h-5 text-yellow-200" />
                </div>
                <div className="absolute bottom-4 right-8 animate-pulse">
                  <Crown className="w-5 h-5 text-yellow-100" />
                </div>
              </>
            )}

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 bg-white/20 rounded-full ${animationPhase === "celebrating" ? "animate-bounce" : ""}`}
                  >
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">プラン変更完了！</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  disabled={animationPhase !== "complete"}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-center">
                <div className="text-white/90 text-sm font-medium">
                  {isUpgrade ? "プランをアップグレードしました！" : "プランを変更しました"}
                </div>
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="p-6 text-center">
            {/* プランアイコンアニメーション */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                {/* プランアイコン */}
                <div
                  className={`w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center border-4 border-yellow-300 transition-all duration-1000 ${
                    animationPhase === "celebrating"
                      ? "scale-110 rotate-12"
                      : animationPhase === "complete"
                        ? "scale-100 rotate-0"
                        : "scale-90"
                  }`}
                >
                  <Crown className="w-10 h-10 text-yellow-600" />
                </div>

                {/* 変更エフェクト */}
                {animationPhase === "celebrating" && (
                  <>
                    <div className="absolute -top-2 -right-2 animate-ping">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-1 -left-1 animate-bounce">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                  </>
                )}

                {/* 完了エフェクト */}
                {animationPhase === "complete" && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-2xl animate-pulse">🎉</div>
                  </div>
                )}
              </div>
            </div>

            {/* メッセージ */}
            <div className="mb-6">
              <h4 className="text-xl font-bold text-green-900 mb-2">
                {animationPhase === "entering" && "プラン変更中..."}
                {animationPhase === "celebrating" && "変更処理中です！"}
                {animationPhase === "complete" && "変更が完了しました！"}
              </h4>

              {animationPhase === "complete" && (
                <div className="space-y-3">
                  {/* プラン変更詳細 */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-green-200 p-4">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">変更前</div>
                      <div className="font-medium text-gray-800">{oldPlanName}</div>
                      <div className="text-2xl text-green-600">↓</div>
                      <div className="text-sm text-green-700">変更後</div>
                      <div className="font-bold text-green-900 text-lg">{newPlanName}</div>
                      <div className="text-sm text-green-800">¥{newPlanPrice.toLocaleString()}/月</div>
                    </div>
                  </div>

                  {/* 特典メッセージ */}
                  {isUpgrade && (
                    <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-5 h-5 text-yellow-600" />
                        <span className="font-bold text-yellow-800">アップグレード特典</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        新機能が即座にご利用いただけます！
                        <br />
                        より充実したTAMAYOI体験をお楽しみください
                      </p>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm text-green-800 font-medium">
                      🎉 プラン変更が正常に完了しました！
                      <br />
                      引き続きTAMAYOIをお楽しみください
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* プログレスバー */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 ${
                    animationPhase === "entering" ? "w-1/3" : animationPhase === "celebrating" ? "w-2/3" : "w-full"
                  }`}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {animationPhase === "entering" && "プランを変更中..."}
                {animationPhase === "celebrating" && "もうすぐ完了します..."}
                {animationPhase === "complete" && "変更完了！"}
              </div>
            </div>

            {/* 閉じるボタン */}
            {animationPhase === "complete" && (
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl animate-in slide-in-from-bottom-4"
              >
                マイページに戻る
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
