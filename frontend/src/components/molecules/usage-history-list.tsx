"use client"

import { Clock, Filter, Search } from "lucide-react"
import { useState } from "react"
import { UsageHistoryCard } from "../atoms/usage-history-card"
import type { UsageHistory } from "../../types/user"

interface UsageHistoryListProps {
  history: UsageHistory[]
  onShowOnMap: (storeId: string) => void
  onUseSameCoupon: (couponId: string) => void
  className?: string
}

export function UsageHistoryList({ history, onShowOnMap, onUseSameCoupon, className = "" }: UsageHistoryListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  // フィルタリングとソート
  const filteredAndSortedHistory = history
    .filter(
      (item) =>
        item.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.couponName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usageId.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.usedAt.getTime() - a.usedAt.getTime()
      } else {
        return a.usedAt.getTime() - b.usedAt.getTime()
      }
    })

  if (history.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <div className="text-gray-500 text-lg font-medium mb-2">まだ利用履歴がありません</div>
        <div className="text-gray-400 text-sm">クーポンを利用すると履歴がここに表示されます</div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 検索・フィルター */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="space-y-4">
          {/* 検索バー */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="店舗名、クーポン名、利用IDで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* ソート */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
            </select>
            <span className="text-sm text-gray-500">{filteredAndSortedHistory.length}件の履歴</span>
          </div>
        </div>
      </div>

      {/* 履歴リスト */}
      {filteredAndSortedHistory.length === 0 ? (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <div className="text-gray-500">検索条件に一致する履歴が見つかりません</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedHistory.map((item, index) => (
            <div
              key={item.id}
              className="animate-in slide-in-from-bottom-4 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <UsageHistoryCard usage={item} onShowOnMap={onShowOnMap} onUseSameCoupon={onUseSameCoupon} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
