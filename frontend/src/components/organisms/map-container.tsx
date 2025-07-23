"use client"

import { HelpCircle } from "lucide-react"
import { UsageGuideModal } from "../molecules/usage-guide-modal"
import { useState } from "react"

interface MapContainerProps {
  selectedArea: string
  selectedGenres: string[]
}

export function MapContainer({ selectedArea, selectedGenres }: MapContainerProps) {
  const [isUsageGuideOpen, setIsUsageGuideOpen] = useState(false)

  const handleUsageGuideOpen = () => {
    setIsUsageGuideOpen(true)
  }

  const handleUsageGuideClose = () => {
    setIsUsageGuideOpen(false)
  }

  return (
    <>
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
            <button
              onClick={handleUsageGuideOpen}
              className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:scale-105"
            >
              <HelpCircle className="w-5 h-5 text-white mb-1" />
              <span className="text-white text-xs font-medium">使い方</span>
            </button>
          </div>
        </div>
      </div>

      {/* 使い方ガイドモーダル */}
      <UsageGuideModal
        isOpen={isUsageGuideOpen}
        onClose={handleUsageGuideClose}
      />
    </>
  )
}
