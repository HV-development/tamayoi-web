"use client"

import { CreditCard, Check, Clock, X, Search, Filter, Calendar } from "lucide-react"
import { useState } from "react"
import type { PaymentHistory } from "../../types/user"

interface PaymentHistoryListProps {
  history: PaymentHistory[]
  className?: string
}

export function PaymentHistoryList({ history, className = "" }: PaymentHistoryListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "failed">("all")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPaymentId = (paymentId: string) => {
    return `#${paymentId.toUpperCase()}`
  }

  const getStatusIcon = (status: PaymentHistory["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "failed":
        return <X className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusText = (status: PaymentHistory["status"]) => {
    switch (status) {
      case "completed":
        return { text: "完了", color: "text-green-800 bg-green-100 border-green-200" }
      case "pending":
        return { text: "処理中", color: "text-yellow-800 bg-yellow-100 border-yellow-200" }
      case "failed":
        return { text: "失敗", color: "text-red-800 bg-red-100 border-red-200" }
    }
  }

  // フィルタリングとソート
  const filteredAndSortedHistory = history
    .filter((item) => {
      const matchesSearch =
        item.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.paymentId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.paidAt.getTime() - a.paidAt.getTime()
      } else {
        return a.paidAt.getTime() - b.paidAt.getTime()
      }
    })

  if (history.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <div className="text-gray-500 text-lg font-medium mb-2">まだ決済履歴がありません</div>
        <div className="text-gray-400 text-sm">プランに登録すると履歴がここに表示されます</div>
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
              placeholder="プラン名、決済IDで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* フィルター */}
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              <option value="all">すべて</option>
              <option value="completed">完了</option>
              <option value="pending">処理中</option>
              <option value="failed">失敗</option>
            </select>
            <span className="text-sm text-gray-500">{filteredAndSortedHistory.length}件の履歴</span>
          </div>
        </div>
      </div>

      {/* 決済履歴リスト */}
      {filteredAndSortedHistory.length === 0 ? (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <div className="text-gray-500">検索条件に一致する履歴が見つかりません</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedHistory.map((item, index) => {
            const statusStyle = getStatusText(item.status)
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow animate-in slide-in-from-bottom-4 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* ヘッダー部分 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {formatPaymentId(item.paymentId)}
                      </span>
                      <span className="text-xs text-gray-400">決済ID</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{item.planName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(item.paidAt)}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-medium border ${statusStyle.color}`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(item.status)}
                      {statusStyle.text}
                    </div>
                  </div>
                </div>

                {/* 決済情報 */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">決済金額</div>
                        <div className="text-2xl font-bold text-blue-900">¥{item.amount.toLocaleString()}</div>
                      </div>
                    </div>
                    {item.paymentMethod && (
                      <div className="text-right">
                        <div className="text-xs text-gray-600">決済方法</div>
                        <div className="text-sm font-medium text-gray-900">{item.paymentMethod}</div>
                      </div>
                    )}
                  </div>

                  {/* 失敗時のメッセージ */}
                  {item.status === "failed" && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-xs text-red-700">
                        決済に失敗しました。カード情報をご確認の上、再度お試しください。
                      </div>
                    </div>
                  )}

                  {/* 処理中のメッセージ */}
                  {item.status === "pending" && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="text-xs text-yellow-700">決済処理中です。しばらくお待ちください。</div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
