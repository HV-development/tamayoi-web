"use client"

interface DateInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  required?: boolean
  className?: string
}

export function DateInput({ value, onChange, label, error, required = false, className = "" }: DateInputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="max-w-xs">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
