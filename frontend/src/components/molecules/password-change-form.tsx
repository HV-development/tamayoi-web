"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "../atoms/input"
import { Button } from "../atoms/button"
import { Lock, AlertTriangle, CheckCircle } from "lucide-react"

interface PasswordChangeFormProps {
  onSubmit: (currentPassword: string, newPassword: string) => void
  onCancel: () => void
  isLoading?: boolean
}

export function PasswordChangeForm({ onSubmit, onCancel, isLoading = false }: PasswordChangeFormProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}

    // 現在のパスワード
    // パスワード - 必須チェック
    if (!currentPassword) {
      newErrors.currentPassword = "現在のパスワードを入力してください"
    // パスワード - 最小桁チェック
    } else if (currentPassword.length < 8) {
      newErrors.currentPassword = "パスワードは8文字以上で入力してください"
    // パスワード - 最大桁チェック
    } else if (currentPassword.length > 50) {
      newErrors.currentPassword = "パスワードは50文字以内で入力してください"
    }

    // 新しいパスワード
    // パスワード - 必須チェック
    if (!newPassword) {
      newErrors.newPassword = "新しいパスワードを入力してください"
    // パスワード - 最小桁チェック
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "パスワードは8文字以上で入力してください"
    // パスワード - 最大桁チェック
    } else if (newPassword.length > 50) {
      newErrors.newPassword = "パスワードは50文字以内で入力してください"
    } else if (newPassword === currentPassword) {
      newErrors.newPassword = "現在のパスワードと同じパスワードは使用できません"
    }

    // パスワード確認
    // パスワード - 必須チェック
    if (!confirmPassword) {
      newErrors.confirmPassword = "パスワード確認を入力してください"
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // リアルタイムバリデーション（input時）
  const validateFieldOnInput = (field: keyof typeof errors, value: string) => {
    const newErrors = { ...errors }
    
    if (field === 'currentPassword') {
      // パスワード - 必須チェック（入力中は表示しない）
      if (!value) {
        // 入力中は必須エラーを表示しない
      // パスワード - 最小桁チェック
      } else if (value.length < 8) {
        newErrors.currentPassword = "パスワードは8文字以上で入力してください"
      // パスワード - 最大桁チェック
      } else if (value.length > 50) {
        newErrors.currentPassword = "パスワードは50文字以内で入力してください"
      } else {
        delete newErrors.currentPassword
      }
    }
    
    if (field === 'newPassword') {
      // パスワード - 必須チェック（入力中は表示しない）
      if (!value) {
        // 入力中は必須エラーを表示しない
      // パスワード - 最小桁チェック
      } else if (value.length < 8) {
        newErrors.newPassword = "パスワードは8文字以上で入力してください"
      // パスワード - 最大桁チェック
      } else if (value.length > 50) {
        newErrors.newPassword = "パスワードは50文字以内で入力してください"
      } else if (value === currentPassword) {
        newErrors.newPassword = "現在のパスワードと同じパスワードは使用できません"
      } else {
        delete newErrors.newPassword
      }
    }
    
    if (field === 'confirmPassword') {
      if (value && newPassword !== value) {
        newErrors.confirmPassword = "パスワードが一致しません"
      } else if (value && newPassword === value) {
        delete newErrors.confirmPassword
      }
    }
    
    setErrors(newErrors)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(currentPassword, newPassword)
    }
  }

  const updateField = (field: keyof typeof errors, value: string) => {
    if (field === "currentPassword") setCurrentPassword(value)
    if (field === "newPassword") setNewPassword(value)
    if (field === "confirmPassword") setConfirmPassword(value)

    // リアルタイムバリデーション
    if (field === 'currentPassword' || field === 'newPassword' || field === 'confirmPassword') {
      validateFieldOnInput(field, value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* セキュリティ確認 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <div className="font-bold mb-2">セキュリティ確認</div>
            <div>パスワード変更には、現在のパスワードの入力が必要です。</div>
          </div>
        </div>
      </div>

      {/* 現在のパスワード */}
      <Input
        type="password"
        label="現在のパスワード"
        placeholder="現在のパスワードを入力"
        value={currentPassword}
        onChange={(value) => updateField("currentPassword", value)}
        error={errors.currentPassword}
        required
      />

      {/* 新しいパスワード */}
      <Input
        type="password"
        label="新しいパスワード"
        placeholder="8文字以上の英数字"
        value={newPassword}
        onChange={(value) => updateField("newPassword", value)}
        error={errors.newPassword}
        required
      />

      {/* パスワード確認 */}
      <Input
        type="password"
        label="新しいパスワード確認"
        placeholder="新しいパスワードを再入力"
        value={confirmPassword}
        onChange={(value) => updateField("confirmPassword", value)}
        error={errors.confirmPassword}
        required
      />

      {/* パスワード要件 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <div className="font-bold mb-2">パスワード要件</div>
            <ul className="space-y-1">
              <li>• 8文字以上で入力してください</li>
              <li>• 英字と数字を混在させてください</li>
              <li>• 現在のパスワードとは異なるものを設定してください</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 注意事項 */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <div className="font-bold mb-2">重要な注意事項</div>
            <ul className="space-y-1">
              <li>• パスワード変更後は新しいパスワードでログインしてください</li>
              <li>• 他のデバイスでログインしている場合は再ログインが必要です</li>
              <li>• パスワードは安全な場所に保管してください</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
        >
          {isLoading ? "変更中..." : "パスワードを変更"}
        </Button>

        <Button type="button" onClick={onCancel} variant="secondary" className="w-full py-3 text-base font-medium">
          キャンセル
        </Button>
      </div>
    </form>
  )
}