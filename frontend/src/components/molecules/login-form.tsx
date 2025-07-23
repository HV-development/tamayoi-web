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

    // メールアドレス - 必須チェック
    if (!email) {
      newErrors.email = "メールアドレスを入力してください"
    // メールアドレス - メールフォーマットチェック
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "正しいメールアドレスを入力してください"
    }

    // パスワード - 必須チェック
    if (!password) {
      newErrors.password = "パスワードを入力してください"
    // パスワード - 最小桁チェック
    } else if (password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください"
    // パスワード - 最大桁チェック
    } else if (password.length > 50) {
      newErrors.password = "パスワードは50文字以内で入力してください"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // リアルタイムバリデーション（input時）
  const validateField = (field: 'email' | 'password', value: string) => {
    const newErrors = { ...errors }
    
    if (field === 'email') {
      // メールアドレス - 必須チェック
      if (!value) {
        newErrors.email = "メールアドレスを入力してください"
      // メールアドレス - メールフォーマットチェック
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "正しいメールアドレスを入力してください"
      } else {
        delete newErrors.email
      }
    }
    
    if (field === 'password') {
      // パスワード - 必須チェック
      if (!value) {
        newErrors.password = "パスワードを入力してください"
      // パスワード - 最小桁チェック
      } else if (value.length < 8) {
        newErrors.password = "パスワードは8文字以上で入力してください"
      // パスワード - 最大桁チェック
      } else if (value.length > 50) {
        newErrors.password = "パスワードは50文字以内で入力してください"
      } else {
        delete newErrors.password
      }
    }
    
    setErrors(newErrors)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onLogin(email, password)
    }
  }

  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault() // フォーム送信を防ぐ
    onSignup()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="email"
        label="メールアドレス"
        placeholder="example@email.com"
        value={email}
        onChange={(value) => {
          setEmail(value)
          validateField('email', value)
        }}
        error={errors.email}
        required
      />

      <Input
        type="password"
        label="パスワード"
        placeholder="パスワードを入力"
        value={password}
        onChange={(value) => {
          setPassword(value)
          validateField('password', value)
        }}
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

        <Button type="button" onClick={handleSignupClick} variant="secondary" className="w-full py-3 text-base font-medium">
          新規登録
        </Button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onForgotPassword()
          }}
          className="text-sm text-green-600 hover:text-green-700 underline"
        >
          パスワードを忘れた方
        </button>
      </div>
    </form>
  )
}
