"use client"

import { AreaButton } from "../atoms/area-button"
import { Button } from "../atoms/button"

interface AreaPopupProps {
  isOpen: boolean
  selectedArea: string
  onAreaSelect: (area: string) => void
  onClose: () => void
  onClear: () => void
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

export function AreaPopup({ isOpen, selectedArea, onAreaSelect, onClose, onClear }: AreaPopupProps) {
  if (!isOpen) return null

  return (
    <>
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={onClose}></div>

      {/* ポップアップ */}
      <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-xl z-50 max-w-md mx-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">エリアを選択</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {SAITAMA_AREAS.map((area) => (
              <AreaButton
                key={area.value}
                label={area.label}
                isSelected={selectedArea === area.value}
                onClick={() => onAreaSelect(area.value)}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={onClear} variant="secondary" className="flex-1">
              クリア
            </Button>
            <Button onClick={onClose} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              完了
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
