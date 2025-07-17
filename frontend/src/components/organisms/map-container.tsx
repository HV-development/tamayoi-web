"use client"

import { HelpCircle } from "lucide-react"

interface MapContainerProps {
  selectedArea: string
  selectedGenres: string[]
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

const GENRES = [
  { value: "izakaya", label: "居酒屋" },
  { value: "dining-bar", label: "ダイニングバー" },
  { value: "creative", label: "創作料理" },
  { value: "japanese", label: "和食" },
  { value: "western", label: "洋食" },
  { value: "italian", label: "イタリアン" },
  { value: "french", label: "フレンチ" },
  { value: "chinese", label: "中華" },
  { value: "yakiniku", label: "焼肉" },
  { value: "korean", label: "韓国料理" },
  { value: "asian", label: "アジアン" },
  { value: "bar", label: "バー" },
  { value: "noodles", label: "ラーメン・そば・うどん" },
]

export function MapContainer({ selectedArea, selectedGenres }: MapContainerProps) {
  return (
    <div className="flex-1 relative bg-gray-100">
      {/* 地図のプレースホルダー */}
      <div
        className="w-full h-full bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/placeholder.svg?height=600&width=400')`,
        }}
      >
        {/* 地図上のピン */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        </div>

        {/* 右下のGoogle Mapsロゴエリア */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-600 bg-white px-2 py-1 rounded">Google</div>

        {/* 右下のヘルプボタン */}
        <div className="absolute bottom-4 right-4">
          <div className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer transition-colors">
            <HelpCircle className="w-5 h-5 text-white mb-1" />
            <span className="text-white text-xs font-medium">使い方</span>
          </div>
        </div>
      </div>
    </div>
  )
}
