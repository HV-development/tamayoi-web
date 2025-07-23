"use client"

import { GenreButton } from "../atoms/genre-button"
import { Button } from "../atoms/button"

interface GenrePopupProps {
  isOpen: boolean
  selectedGenres: string[]
  onGenreToggle: (genre: string) => void
  onClose: () => void
  onClear: () => void
}

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

export function GenrePopup({ isOpen, selectedGenres, onGenreToggle, onClose, onClear }: GenrePopupProps) {
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {/* オーバーレイ */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-40" 
        onClick={handleOverlayClick}
      ></div>

      {/* ポップアップ */}
      <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-xl z-50 max-w-md mx-auto max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">ジャンルを選択</h3>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="閉じる"
            >
              ✕
            </button>
          </div>

          <div className="text-sm text-gray-600 mb-4">複数選択可能です</div>

          <div className="grid grid-cols-2 gap-3 mb-6 max-h-80 overflow-y-auto">
            {GENRES.map((genre) => (
              <GenreButton
                key={genre.value}
                label={genre.label}
                isSelected={selectedGenres.includes(genre.value)}
                onClick={() => onGenreToggle(genre.value)}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={onClear} variant="secondary" className="flex-1">
              クリア
            </Button>
            <Button onClick={onClose} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              完了（{selectedGenres.length}件選択）
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
