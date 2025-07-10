import type { UserRank, RankInfo } from "../types/user"

export const RANK_THRESHOLDS = {
  bronze: 0, // 0ヶ月〜
  silver: 3, // 3ヶ月〜
  gold: 12, // 12ヶ月〜
  diamond: 60, // 60ヶ月（5年）〜
}

export const RANK_INFO: Record<UserRank, RankInfo> = {
  bronze: {
    rank: "bronze",
    label: "ブロンズ",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    icon: "🥉",
    description: "TAMAYOIを始めたばかりの新規メンバー",
    monthsRequired: 0,
  },
  silver: {
    rank: "silver",
    label: "シルバー",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    icon: "🥈",
    description: "3ヶ月継続利用の優良メンバー",
    monthsRequired: 3,
  },
  gold: {
    rank: "gold",
    label: "ゴールド",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    icon: "🥇",
    description: "1年継続利用のロイヤルメンバー",
    monthsRequired: 12,
  },
  diamond: {
    rank: "diamond",
    label: "ダイヤモンド",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    icon: "💎",
    description: "5年継続利用のレジェンドメンバー",
    monthsRequired: 60,
  },
}

export function calculateUserRank(contractStartDate: Date): UserRank {
  const now = new Date()
  const monthsDiff = Math.floor(
    (now.getTime() - contractStartDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44), // 平均月日数
  )

  if (monthsDiff >= RANK_THRESHOLDS.diamond) return "diamond"
  if (monthsDiff >= RANK_THRESHOLDS.gold) return "gold"
  if (monthsDiff >= RANK_THRESHOLDS.silver) return "silver"
  return "bronze"
}

export function getNextRankInfo(currentRank: UserRank): RankInfo | null {
  const ranks: UserRank[] = ["bronze", "silver", "gold", "diamond"]
  const currentIndex = ranks.indexOf(currentRank)

  if (currentIndex === -1 || currentIndex === ranks.length - 1) {
    return null // 最高ランクまたは無効なランク
  }

  return RANK_INFO[ranks[currentIndex + 1]]
}

export function getMonthsToNextRank(contractStartDate: Date, currentRank: UserRank): number | null {
  const nextRank = getNextRankInfo(currentRank)
  if (!nextRank) return null

  const now = new Date()
  const monthsDiff = Math.floor((now.getTime() - contractStartDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44))

  return Math.max(0, nextRank.monthsRequired - monthsDiff)
}
