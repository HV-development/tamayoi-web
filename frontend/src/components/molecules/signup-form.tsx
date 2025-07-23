"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "../atoms/input"
import { Button } from "../atoms/button"
import { RadioButton } from "../atoms/radio-button"
import { DateInput } from "../atoms/date-input"

interface SignupFormData {
  email: string
  nickname: string
  password: string
  passwordConfirm: string
  postalCode: string
  address: string
  birthDate: string
  gender: string
  saitamaAppId: string
}

interface SignupFormProps {
  initialData?: Partial<SignupFormData>
  onSubmit: (data: SignupFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function SignupForm({ initialData, onSubmit, onCancel, isLoading = false }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    postalCode: "",
    address: "",
    birthDate: "",
    gender: "",
    saitamaAppId: "",
  })

  const [errors, setErrors] = useState<Partial<SignupFormData>>({})
  const [isSearchingAddress, setIsSearchingAddress] = useState(false)
  const [hasSearchedAddress, setHasSearchedAddress] = useState(false)

  // initialDataが変更された際にフォームデータを更新
  useEffect(() => {
    if (initialData) {
      setFormData({
        email: initialData.email || "",
        nickname: initialData.nickname || "",
        password: initialData.password || "",
        passwordConfirm: initialData.passwordConfirm || "",
        postalCode: initialData.postalCode || "",
        address: initialData.address || "",
        birthDate: initialData.birthDate || "",
        gender: initialData.gender || "",
        saitamaAppId: initialData.saitamaAppId || "",
      })
    }
  }, [initialData])

  const genderOptions = [
    { value: "male", label: "男性" },
    { value: "female", label: "女性" },
    { value: "other", label: "その他" },
  ]

  const validateForm = () => {
    const newErrors: Partial<SignupFormData> = {}

    // ニックネーム - 必須チェック
    if (!formData.nickname.trim()) {
      newErrors.nickname = "ニックネームを入力してください"
    }

    // メールアドレス - 必須チェック、メールフォーマットチェック
    if (!formData.email) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください"
    }

    // 郵便番号 - 必須チェック、桁数チェック
    if (!formData.postalCode) {
      newErrors.postalCode = "郵便番号を入力してください"
    } else if (!/^\d{7}$/.test(formData.postalCode.replace(/-/g, ""))) {
      newErrors.postalCode = "郵便番号は7桁の数字で入力してください"
    }

    // 住所検索 - 存在チェック
    if (!formData.address || !hasSearchedAddress) {
      newErrors.address = "住所検索ボタンを押して住所を取得してください"
    }

    // 生年月日 - 必須チェック、日付形式チェック
    if (!formData.birthDate) {
      newErrors.birthDate = "生年月日を入力してください"
    } else {
      const birthDate = new Date(formData.birthDate)
      const today = new Date()
      if (isNaN(birthDate.getTime())) {
        newErrors.birthDate = "正しい日付形式で入力してください"
      } else if (birthDate >= today) {
        newErrors.birthDate = "生年月日は今日より前の日付を入力してください"
      } else if (today.getFullYear() - birthDate.getFullYear() > 120) {
        newErrors.birthDate = "正しい生年月日を入力してください"
      }
    }

    // 性別 - 選択チェック
    if (!formData.gender) {
      newErrors.gender = "性別を選択してください"
    }

    // パスワード - 必須チェック、最小桁チェック、フォーマットチェック
    if (!formData.password) {
      newErrors.password = "パスワードを入力してください"
    } else if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください"
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(formData.password)) {
      newErrors.password = "パスワードは英数字を混在させてください"
    }

    // パスワード確認 - パスワードと文字列が一致しているかチェック
    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "パスワード確認を入力してください"
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "パスワードが一致しません"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleAddressSearch = async () => {
    // 郵便番号のバリデーション
    if (!formData.postalCode.trim()) {
      setErrors({ ...errors, postalCode: "郵便番号を入力してください" })
      return
    }
    
    if (!/^\d{7}$/.test(formData.postalCode.replace(/-/g, ""))) {
      setErrors({ ...errors, postalCode: "郵便番号は7桁の数字で入力してください" })
      return
    }

    setIsSearchingAddress(true)
    // 住所検索のシミュレーション
    setTimeout(() => {
      const mockAddress = "埼玉県さいたま市大宮区桜木町1-7-5"
      setFormData({ ...formData, address: mockAddress })
      setHasSearchedAddress(true)
      // 住所が取得できたらエラーをクリア
      if (errors.address) {
        setErrors({ ...errors, address: undefined })
      }
      setIsSearchingAddress(false)
    }, 1000)
  }

  const updateFormData = (field: keyof SignupFormData, value: string) => {
    setFormData({ ...formData, [field]: value })
    
    // リアルタイムバリデーション
    const newErrors = { ...errors }
    
    switch (field) {
      case 'nickname':
        if (value.trim()) {
          delete newErrors.nickname
        }
        break
      case 'email':
        if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          delete newErrors.email
        }
        break
      case 'postalCode':
        if (value && /^\d{7}$/.test(value.replace(/-/g, ""))) {
          delete newErrors.postalCode
        }
        // 郵便番号が変更されたら住所検索をリセット
        if (hasSearchedAddress) {
          setHasSearchedAddress(false)
          setFormData(prev => ({ ...prev, address: "" }))
        }
        break
      case 'birthDate':
        if (value) {
          const birthDate = new Date(value)
          const today = new Date()
          if (!isNaN(birthDate.getTime()) && birthDate < today && today.getFullYear() - birthDate.getFullYear() <= 120) {
            delete newErrors.birthDate
          }
        }
        break
      case 'gender':
        if (value) {
          delete newErrors.gender
        }
        break
      case 'password':
        if (value && value.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
          delete newErrors.password
        }
        // パスワードが変更されたらパスワード確認もチェック
        if (formData.passwordConfirm && value === formData.passwordConfirm) {
          delete newErrors.passwordConfirm
        }
        break
      case 'passwordConfirm':
        if (value && value === formData.password) {
          delete newErrors.passwordConfirm
        }
        break
    }
    
    setErrors(newErrors)
  }

  // 入力時のリアルタイムバリデーション用ヘルパー
  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    updateFormData(field, value)
  }

  // 住所が自動入力された場合の処理
  useEffect(() => {
    if (formData.address && hasSearchedAddress && errors.address) {
      setErrors(prev => ({ ...prev, address: undefined }))
    }
  }, [formData.address, hasSearchedAddress, errors.address])
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
    // パスワード確認の場合、パスワードも再チェック
    if (field === "password" && errors.passwordConfirm) {
      setErrors({ ...errors, passwordConfirm: undefined })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* メールアドレス */}
      <Input
        type="email"
        label="メールアドレス"
        placeholder="example@email.com"
        value={formData.email}
        onChange={(value) => handleInputChange("email", value)}
        error={errors.email}
        required
      />

      {/* ニックネーム */}
      <Input
        type="text"
        label="ニックネーム"
        placeholder="ニックネームを入力"
        value={formData.nickname}
        onChange={(value) => handleInputChange("nickname", value)}
        error={errors.nickname}
        required
      />

      {/* 郵便番号と住所検索ボタンを横並び */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          郵便番号
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="1234567"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <Button
            type="button"
            onClick={handleAddressSearch}
            disabled={isSearchingAddress}
            variant="secondary"
            className="px-6 py-3 whitespace-nowrap"
          >
            {isSearchingAddress ? "検索中..." : "住所検索"}
          </Button>
        </div>
        {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
      </div>

      {/* 検索結果の住所表示 */}
      {formData.address && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">住所</label>
          <div className={`px-4 py-3 border rounded-lg text-gray-700 ${
            errors.address ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
          }`}>
            {formData.address}
          </div>
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>
      )}

      {/* 生年月日 */}
      <DateInput
        label="生年月日"
        value={formData.birthDate}
        onChange={(value) => handleInputChange("birthDate", value)}
        error={errors.birthDate}
        required
      />

      {/* 性別 */}
      <RadioButton
        name="gender"
        label="性別"
        options={genderOptions}
        value={formData.gender}
        onChange={(value) => handleInputChange("gender", value)}
        error={errors.gender}
        required
      />

      {/* パスワード */}
      <Input
        type="password"
        label="パスワード"
        placeholder="8文字以上の英数字"
        value={formData.password}
        onChange={(value) => handleInputChange("password", value)}
        error={errors.password}
        required
      />

      {/* パスワード確認 */}
      <Input
        type="password"
        label="パスワード確認"
        placeholder="パスワードを再入力"
        value={formData.passwordConfirm}
        onChange={(value) => handleInputChange("passwordConfirm", value)}
        error={errors.passwordConfirm}
        required
      />

      {/* さいたま市みんなのアプリID */}
      <Input
        type="text"
        label="さいたま市みんなのアプリID（任意）"
        placeholder="アプリIDを入力"
        value={formData.saitamaAppId}
        onChange={(value) => updateFormData("saitamaAppId", value)}
      />

      {/* ボタン */}
      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
        >
          {isLoading ? "確認中..." : "登録内容を確認する"}
        </Button>

        <Button type="button" onClick={onCancel} variant="secondary" className="w-full py-3 text-base font-medium">
          キャンセル
        </Button>
      </div>
    </form>
  )
}
