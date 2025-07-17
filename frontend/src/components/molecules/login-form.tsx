"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "../atoms/input"
import { Button } from "../atoms/button"

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
  onSignup: () => void
  onForgotPassword: () => void
  isLoading?: boolean
}

export function LoginForm({ onLogin, onSignup, onForgotPassword, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "正しいメールアドレスを入力してください"
    }

    if (!password) {
      newErrors.password = "パスワードを入力してください"
    } else if (password.length < 6) {
      newErrors.password = "パスワードは6文字以上で入力してください"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onLogin(email, password)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="email"
        label="メールアドレス"
        placeholder="example@email.com"
        value={email}
        onChange={setEmail}
        error={errors.email}
        required
      />

      <Input
        type="password"
        label="パスワード"
        placeholder="パスワードを入力"
        value={password}
        onChange={setPassword}
        error={errors.password}
        required
      />

      <div className="space-y-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
        >
          {isLoading ? "ログイン中..." : "ログイン"}
        </Button>

        <Button type="button" onClick={onSignup} variant="secondary" className="w-full py-3 text-base font-medium">
          新規登録
        </Button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-green-600 hover:text-green-700 underline"
        >
          パスワードを忘れた方
        </button>
      </div>
    </form>
  )
}
