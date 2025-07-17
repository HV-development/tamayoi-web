"use client"

import { Logo } from "./logo"

interface HeaderLogoProps {
  onLogoClick: () => void
  showBackButton?: boolean
  onBackClick?: () => void
  title?: string
  className?: string
}

export function HeaderLogo({
  onLogoClick,
  showBackButton = false,
  onBackClick,
  title,
  className = "",
}: HeaderLogoProps) {
  return (
    <div className={`bg-white border-b border-gray-200 px-4 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && onBackClick && (
            <button onClick={onBackClick} className="text-green-600 hover:text-green-700">
              ← 戻る
            </button>
          )}
          <Logo size="sm" onClick={onLogoClick} />
        </div>
        {title && <h1 className="text-lg font-bold text-gray-900">{title}</h1>}
      </div>
    </div>
  )
}
