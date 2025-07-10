"use client"

import { ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface MenuButtonProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  onClick: () => void
  variant?: "default" | "danger"
  className?: string
}

export function MenuButton({
  icon: Icon,
  title,
  subtitle,
  onClick,
  variant = "default",
  className = "",
}: MenuButtonProps) {
  const variantStyles = {
    default: "text-gray-700 hover:bg-gray-50",
    danger: "text-red-600 hover:bg-red-50",
  }

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 transition-colors ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${variant === "danger" ? "bg-red-100" : "bg-green-100"}`}>
          <Icon className={`w-5 h-5 ${variant === "danger" ? "text-red-600" : "text-green-600"}`} />
        </div>
        <div className="text-left">
          <div className="font-medium">{title}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  )
}
