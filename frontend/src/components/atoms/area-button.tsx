"use client"

interface AreaButtonProps {
  label: string
  isSelected: boolean
  onClick: () => void
  className?: string
}

export function AreaButton({ label, isSelected, onClick, className = "" }: AreaButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
        isSelected
          ? "border-green-500 bg-green-50 text-green-700"
          : "border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
      } ${className}`}
    >
      {label}
    </button>
  )
}
