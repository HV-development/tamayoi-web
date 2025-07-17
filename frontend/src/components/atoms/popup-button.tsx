"use client"

import { ChevronDown } from "lucide-react"

interface PopupButtonProps {
  label: string
  selectedCount?: number
  onClick: () => void
  className?: string
}

export function PopupButton({ label, selectedCount = 0, onClick, className = "" }: PopupButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
        selectedCount > 0
          ? "border-green-500 bg-green-50 text-green-700"
          : "border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
      } ${className}`}
    >
      <span>{label}</span>
      {selectedCount > 0 && (
        <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
          {selectedCount}
        </span>
      )}
      <ChevronDown className="w-4 h-4" />
    </button>
  )
}
