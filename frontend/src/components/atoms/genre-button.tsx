"use client"

import { Check } from "lucide-react"

interface GenreButtonProps {
  label: string
  isSelected: boolean
  onClick: () => void
  className?: string
}

export function GenreButton({ label, isSelected, onClick, className = "" }: GenreButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
        isSelected
          ? "border-green-500 bg-green-50 text-green-700"
          : "border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
      } ${className}`}
    >
      {isSelected && (
        <div className="absolute top-1 right-1">
          <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        </div>
      )}
      {label}
    </button>
  )
}
