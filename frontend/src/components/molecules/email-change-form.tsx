"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "../atoms/input"
import { Button } from "../atoms/button"
import { Mail, Lock, AlertTriangle } from "lucide-react"

interface EmailChangeFormProps {
  currentEmail: string
  onSubmit: (currentPassword: string, newEmail: string) => void
  onCancel: () => void
  isLoading?: boolean
}

export function EmailChangeForm({ currentEmail, onSubmit, onCancel, isLoading = false }: EmailChangeFormProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [errors, setErrors] = useState<{
    currentPassword?: string
    newEmail?: string
    confirmEmail?: string
  }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}

    // 現在のパスワード
    if (!currentPassword) {
      newErrors.currentPassword = "現在のパスワードを入力してください"
    } else if (currentPassword.length < 6) {
      newErrors.currentPassword = "パスワードは6文字以上で入力してください"
    }

    // 新しいメールアドレス
    if (!newEmail) {
      newErrors.newEmail = "新しいメールアドレスを入力してください"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      newErrors.newEmail = "正しいメールアドレスを入力してください"
    } else if (newEmail === currentEmail) {
      newErrors.newEmail = "現在のメールアドレスと同じです"
    }

    // メールアドレス確認
    if (!confirmEmail) {
      newErrors.confirmEmail = "メールアドレス確認を入力してください"
    } else if (newEmail !== confirmEmail) {
      newErrors.confirmEmail = "メールアドレスが一致しません"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(currentPassword, newEmail)
    }
  }

  const updateField = (field: keyof typeof errors, value: string) => {
    if (field === "currentPassword") setCurrentPassword(value)
    if (field === "newEmail") setNewEmail(value)
    if (field === "confirmEmail") setConfirmEmail(value)

    // エラーをクリア
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }

    // メールアドレス確認のエラーもクリア
    if (field === "newEmail" && errors.confirmEmail) {
      setErrors({ ...errors, confirmEmail: undefined })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 現在のメールアドレス表示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-blue-900 mb-1">現在のメールアドレス</div>
            <div className="text-blue-800 font-mono text-sm">{currentEmail}</div>
          </div>
        </div>
      </div>

      {/* セキュリティ確認 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <div className="font-bold mb-2">セキュリティ確認</div>
            <div>メールアドレス変更には、現在のパスワードの入力が必要です。</div>
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

      {/* 新しいメールアドレス */}
      <Input
        type="email"
        label="新しいメールアドレス"
        placeholder="new@example.com"
        value={newEmail}
        onChange={(value) => updateField("newEmail", value)}
        error={errors.newEmail}
        required
      />

      {/* メールアドレス確認 */}
      <Input
        type="email"
        label="メールアドレス確認"
        placeholder="new@example.com（再入力）"
        value={confirmEmail}
        onChange={(value) => updateField("confirmEmail", value)}
        error={errors.confirmEmail}
        required
      />

      {/* 注意事項 */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <div className="font-bold mb-2">重要な注意事項</div>
            <ul className="space-y-1">
              <li>• 新しいメールアドレスに確認メールを送信します</li>
              <li>• 確認メール内のリンクをクリックするまで変更は完了しません</li>
              <li>• 確認が完了するまでは現在のメールアドレスでログインしてください</li>
              <li>• 確認メールが届かない場合は、迷惑メールフォルダもご確認ください</li>
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
          {isLoading ? "確認メール送信中..." : "確認メールを送信"}
        </Button>

        <Button type="button" onClick={onCancel} variant="secondary" className="w-full py-3 text-base font-medium">
          キャンセル
        </Button>
      </div>
    </form>
  )
}
