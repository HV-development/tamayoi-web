"use client"

import { MapPin, Phone, Globe, Ticket } from "lucide-react"
import { FavoriteButton } from "./favorite-button"
import type { Store } from "../../types/store"

interface StoreCardProps {
  store: Store
  onFavoriteToggle: (storeId: string) => void
  onCouponsClick: (storeId: string) => void
  className?: string
}

export function StoreCard({ store, onFavoriteToggle, onCouponsClick, className = "" }: StoreCardProps) {
  const handlePhoneClick = () => {
    window.open(`tel:${store.phone}`, "_self")
  }

  const handleWebsiteClick = () => {
    if (store.website) {
      window.open(store.website, "_blank")
    }
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-green-200 p-5 space-y-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] ${className}`}
    >
      {/* ヘッダー部分 */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-900 mb-2">{store.name}</h3>
          <span className="inline-block bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {store.genreLabel}
          </span>
        </div>
        <FavoriteButton isFavorite={store.isFavorite} onToggle={() => onFavoriteToggle(store.id)} />
      </div>

      {/* サムネイル画像 */}
      {store.thumbnailUrl && (
        <div className="w-full h-48 rounded-xl overflow-hidden">
          <img
            src={store.thumbnailUrl || "/placeholder.svg"}
            alt={store.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* 店舗紹介 */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-sm text-gray-700 leading-relaxed">{store.description}</div>
      </div>

      {/* 店舗情報 */}
      <div className="space-y-3">
        {/* 住所 */}
        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
          <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-700 font-medium">{store.address}</span>
        </div>

        {/* 電話番号 */}
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
          <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
          <button
            onClick={handlePhoneClick}
            className="text-sm text-green-700 hover:text-green-800 underline font-medium"
          >
            {store.phone}
          </button>
        </div>

        {/* ホームページ */}
        {store.website && (
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
            <Globe className="w-5 h-5 text-green-600 flex-shrink-0" />
            <button
              onClick={handleWebsiteClick}
              className="text-sm text-green-700 hover:text-green-800 underline font-medium"
            >
              ホームページを見る
            </button>
          </div>
        )}
      </div>

      {/* クーポンボタン */}
      <div className="pt-2">
        <button
          onClick={() => onCouponsClick(store.id)}
          className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          <Ticket className="w-5 h-5" />
          <span className="font-medium text-base">クーポン一覧</span>
        </button>
      </div>
    </div>
  )
}
