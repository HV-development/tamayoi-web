"use client"

import type { UserRank } from "../../types/user"

interface RankBadgeProps {
  rank: UserRank
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function RankBadge({ rank, size = "md", showLabel = true, className = "" }: RankBadgeProps) {
  const rankConfig = {
    bronze: {
      label: "ブロンズ",
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-300",
      imageUrl: "/images/ranks/bronze.jpg",
    },
    silver: {
      label: "シルバー",
      color: "text-gray-700",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-300",
      imageUrl: "/images/ranks/silver.jpg",
    },
    gold: {
      label: "ゴールド",
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      imageUrl: "/images/ranks/gold.jpg",
    },
    diamond: {
      label: "ダイヤモンド",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-300",
      imageUrl: "/images/ranks/diamond.jpg",
    },
  }

  const config = rankConfig[rank]

  const sizeClasses = {
    sm: {
      container: "px-2 py-1",
      image: "w-4 h-4",
      text: "text-xs",
    },
    md: {
      container: "px-3 py-1.5",
      image: "w-6 h-6",
      text: "text-sm",
    },
    lg: {
      container: "px-4 py-2",
      image: "w-8 h-8",
      text: "text-base",
    },
  }

  const sizeClass = sizeClasses[size]

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border-2 ${config.bgColor} ${config.borderColor} ${sizeClass.container} ${className}`}
    >
      <img
        src={config.imageUrl || "/placeholder.svg"}
        alt={config.label}
        className={`${sizeClass.image} object-contain`}
      />
      {showLabel && <span className={`font-bold ${config.color} ${sizeClass.text}`}>{config.label}</span>}
    </div>
  )
}
