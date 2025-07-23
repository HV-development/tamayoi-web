"use client"

import { useState } from "react"
import { Button } from "../atoms/button"
import { Logo } from "../atoms/logo"
import { HeaderMenu } from "./header-menu"
import { PopupButton } from "../atoms/popup-button"
import { AreaPopup } from "./area-popup"
import { GenrePopup } from "./genre-popup"
import { NotificationPanel } from "./notification-panel"
import type { Notification } from "../../types/notification"

interface FilterControlsProps {
  selectedArea: string
  selectedGenres: string[]
  notifications: Notification[]
  onAreaChange: (area: string) => void
  onGenresChange: (genres: string[]) => void
  onCurrentLocationClick: () => void
  onNotificationClick: () => void
  onNotificationItemClick: (notificationId: string) => void
  onMarkAllNotificationsRead: () => void
  onMenuItemClick: (itemId: string) => void
  onLogoClick: () => void
  hasNotification?: boolean
}

const SAITAMA_AREAS = [
  { value: "nishi", label: "西区" },
  { value: "kita", label: "北区" },
  { value: "omiya", label: "大宮区" },
  { value: "minuma", label: "見沼区" },
  { value: "chuo", label: "中央区" },
  { value: "sakura", label: "桜区" },
  { value: "urawa", label: "浦和区" },
  { value: "minami", label: "南区" },
  { value: "midori", label: "緑区" },
  { value: "iwatsuki", label: "岩槻区" },
]

export function FilterControls({
  selectedArea,
  selectedGenres,
  notifications,
  onAreaChange,
  onGenresChange,
  onCurrentLocationClick,
  onNotificationClick,
  onNotificationItemClick,
  onMarkAllNotificationsRead,
  onMenuItemClick,
  onLogoClick,
  hasNotification = false,
}: FilterControlsProps) {
  const [isAreaPopupOpen, setIsAreaPopupOpen] = useState(false)
  const [isGenrePopupOpen, setIsGenrePopupOpen] = useState(false)
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false)

  const getAreaLabel = () => {
    if (!selectedArea) return "エリア"
    const area = SAITAMA_AREAS.find((a) => a.value === selectedArea)
    return area ? area.label : "エリア"
  }

  const handleGenreToggle = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre]
    onGenresChange(newGenres)
  }

  const handleAreaClear = () => {
    onAreaChange("")
  }

  const handleGenresClear = () => {
    onGenresChange([])
  }

  const handleGenrePopupOpen = () => {
    setIsGenrePopupOpen(true)
  }

  const handleGenrePopupClose = () => {
    setIsGenrePopupOpen(false)
  }

  const handleNotificationIconClick = () => {
    setIsNotificationPanelOpen(true)
    onNotificationClick()
  }

  const handleNotificationPanelClose = () => {
    setIsNotificationPanelOpen(false)
  }

  return (
    <div className="bg-white shadow-sm">
      {/* ヘッダー部分にロゴとメニューを追加 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Logo onClick={onLogoClick} />
          <div className="text-xs text-gray-500">さいたま市グルメマップ</div>
        </div>
        <HeaderMenu
          hasNotification={hasNotification}
          onNotificationClick={handleNotificationIconClick}
          onMenuItemClick={onMenuItemClick}
        />
      </div>

      {/* フィルターコントロール */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Button variant="location" onClick={onCurrentLocationClick}>
          現在地
        </Button>
        <PopupButton
          label={getAreaLabel()}
          selectedCount={selectedArea ? 1 : 0}
          onClick={() => setIsAreaPopupOpen(true)}
        />
        <PopupButton 
          label="ジャンル" 
          selectedCount={selectedGenres.length} 
          onClick={handleGenrePopupOpen} 
        />
      </div>

      {/* エリア選択ポップアップ */}
      <AreaPopup
        isOpen={isAreaPopupOpen}
        selectedArea={selectedArea}
        onAreaSelect={onAreaChange}
        onClose={() => setIsAreaPopupOpen(false)}
        onClear={handleAreaClear}
      />

      {/* ジャンル選択ポップアップ */}
      <GenrePopup
        isOpen={isGenrePopupOpen}
        selectedGenres={selectedGenres}
        onGenreToggle={handleGenreToggle}
        onClose={handleGenrePopupClose}
        onClear={handleGenresClear}
      />

      {/* お知らせパネル */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        notifications={notifications}
        onClose={handleNotificationPanelClose}
        onNotificationClick={onNotificationItemClick}
        onMarkAllRead={onMarkAllNotificationsRead}
      />
    </div>
  )
}
