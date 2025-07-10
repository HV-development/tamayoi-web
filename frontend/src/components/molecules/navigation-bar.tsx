"use client"

import { Map, Heart, RotateCcw, MoreHorizontal, User } from "lucide-react"

interface NavigationBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isAuthenticated: boolean
  onFavoritesClick: () => void
  onHistoryClick: () => void
}

export function NavigationBar({
  activeTab,
  onTabChange,
  isAuthenticated,
  onFavoritesClick,
  onHistoryClick,
}: NavigationBarProps) {
  const handleTabClick = (tab: string) => {
    if (tab === "favorites") {
      onFavoritesClick()
    } else if (tab === "history") {
      onHistoryClick()
    } else {
      // マイページタブの場合も含めて、すべてonTabChangeに委譲
      onTabChange(tab)
    }
  }

  const tabs = [
    { id: "map", label: "マップ", icon: Map, color: "text-yellow-500" },
    { id: "favorites", label: "お気に入り", icon: Heart, color: "text-gray-400" },
    { id: "history", label: "履歴", icon: RotateCcw, color: "text-gray-400" },
    {
      id: "mypage",
      label: isAuthenticated ? "マイページ" : "ログイン",
      icon: isAuthenticated ? MoreHorizontal : User,
      color: "text-gray-400",
    },
  ]

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="flex flex-col items-center gap-1 py-1"
            >
              <Icon className={`w-6 h-6 ${isActive ? tab.color : "text-gray-400"}`} />
              <span className={`text-xs ${isActive ? tab.color : "text-gray-400"}`}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
