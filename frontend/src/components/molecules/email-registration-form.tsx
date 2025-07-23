"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "../atoms/input"
import { Button } from "../atoms/button"

interface EmailRegistrationFormProps {
  onSubmit: (email: string) => void
  onBack: () => void
  isLoading?: boolean
}

export function EmailRegistrationForm({ onSubmit, onBack, isLoading = false }: EmailRegistrationFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    // メールアドレス - 必須チェック
    if (!email) {
      return "メールアドレスを入力してください"
    }
    // メールアドレス - メールフォーマットチェック
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "正しいメールアドレスを入力してください"
    }
    return ""
  }

  // リアルタイムバリデーション（input時）
  const handleEmailChange = (value: string) => {
    setEmail(value)
    // エラーをクリア（リアルタイムでエラー表示しない）
    if (error) {
      setError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      return
    }
    setError("")
    onSubmit(email)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          メールアドレスを入力してください。
          <br />
          本人確認のためのメールをお送りします。
        </p>
      </div>

      <Input
        type="email"
        label="メールアドレス"
        placeholder="example@email.com"
        value={email}
        onChange={handleEmailChange}
        error={error}
        required
      />

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
        >
          {isLoading ? "送信中..." : "確認メールを送信"}
        </Button>

        <Button type="button" onClick={onBack} variant="secondary" className="w-full py-3 text-base font-medium">
          戻る
        </Button>
      </div>
    </form>
  )
}
