"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "../atoms/input"
import { Button } from "../atoms/button"
import { RadioButton } from "../atoms/radio-button"
import { DateInput } from "../atoms/date-input"
import type { User } from "../../types/user"

interface ProfileEditFormData {
  nickname: string
  postalCode: string
  address: string
  birthDate: string
  gender: string
  saitamaAppId: string
  registeredStore: string
}

interface ProfileEditFormProps {
  user: User
  onSubmit: (data: ProfileEditFormData, updatedFields: string[]) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ProfileEditForm({ user, onSubmit, onCancel, isLoading = false }: ProfileEditFormProps) {
  const [formData, setFormData] = useState<ProfileEditFormData>({
    nickname: "",
    postalCode: "",
    address: "",
    birthDate: "",
    gender: "",
    saitamaAppId: "",
    registeredStore: "",
  })

  const [originalData, setOriginalData] = useState<ProfileEditFormData>({
    nickname: "",
    postalCode: "",
    address: "",
    birthDate: "",
    gender: "",
    saitamaAppId: "",
    registeredStore: "",
  })

  const [errors, setErrors] = useState<Partial<ProfileEditFormData>>({})
  const [isSearchingAddress, setIsSearchingAddress] = useState(false)

  // ユーザーデータでフォームを初期化
  useEffect(() => {
    const initialData = {
      nickname: user.nickname || "",
      postalCode: user.postalCode || "",
      address: user.address || "",
      birthDate: user.birthDate || "",
      gender: user.gender || "",
      saitamaAppId: user.saitamaAppId || "",
      registeredStore: user.registeredStore || "",
    }
    setFormData(initialData)
    setOriginalData(initialData)
  }, [user])

  const genderOptions = [
    { value: "male", label: "男性" },
    { value: "female", label: "女性" },
    { value: "other", label: "未回答" },
  ]

  const fieldLabels = {
    nickname: "ニックネーム",
    postalCode: "郵便番号",
    address: "住所",
    birthDate: "生年月日",
    gender: "性別",
    saitamaAppId: "さいたま市みんなのアプリID",
    registeredStore: "登録店舗",
  }

  const getUpdatedFields = () => {
    const updatedFields: string[] = []

    Object.keys(formData).forEach((key) => {
      const fieldKey = key as keyof ProfileEditFormData
      if (formData[fieldKey] !== originalData[fieldKey]) {
        updatedFields.push(fieldLabels[fieldKey])
      }
    })

    return updatedFields
  }

  const validateForm = () => {
    const newErrors: Partial<ProfileEditFormData> = {}

    // ニックネーム
    if (!formData.nickname) {
      newErrors.nickname = "ニックネームを入力してください"
    } else if (formData.nickname.length > 20) {
      newErrors.nickname = "ニックネームは20文字以内で入力してください"
    } else if (formData.nickname.includes("-")) {
      newErrors.nickname = "ニックネームにハイフンは使用できません"
    }

    // 郵便番号
    if (!formData.postalCode) {
      newErrors.postalCode = "郵便番号を入力してください"
    } else if (!/^\d{7}$/.test(formData.postalCode.replace(/-/g, ""))) {
      newErrors.postalCode = "郵便番号は7桁の数字で入力してください"
    }

    // 生年月日
    if (!formData.birthDate) {
      newErrors.birthDate = "生年月日を入力してください"
    }

    // 性別
    if (!formData.gender) {
      newErrors.gender = "性別を選択してください"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const updatedFields = getUpdatedFields()
      onSubmit(formData, updatedFields)
    }
  }

  const handleAddressSearch = async () => {
    if (!formData.postalCode || !/^\d{7}$/.test(formData.postalCode.replace(/-/g, ""))) {
      setErrors({ ...errors, postalCode: "正しい郵便番号を入力してください" })
      return
    }

    setIsSearchingAddress(true)
    // 住所検索のシミュレーション
    setTimeout(() => {
        // 実際の住所検索APIを使用
        fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanedPostalCode}`)
          .then(response => response.json())
          .then(data => {
            if (data.status === 200 && data.results && data.results.length > 0) {
              const result = data.results[0]
              const fullAddress = `${result.address1}${result.address2}${result.address3}`
              setFormData(prev => ({ ...prev, address: fullAddress }))
              setErrors(prev => ({ ...prev, address: undefined }))
            } else {
              setErrors(prev => ({
                ...prev,
                address: "該当する住所が見つかりませんでした。手入力で住所を入力してください。"
              }))
            }
          })
          .catch(error => {
            console.error("住所検索エラー:", error)
            setErrors(prev => ({
              ...prev,
              address: "住所検索サービスに接続できませんでした。手入力で住所を入力してください。"
            }))
          })
      setIsSearchingAddress(false)
      }, 100)
  }

  const updateFormData = (field: keyof ProfileEditFormData, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ニックネーム */}
      <Input
        type="text"
        label="ニックネーム"
        placeholder="ニックネームを入力"
        value={formData.nickname}
        onChange={(value) => updateFormData("nickname", value)}
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
              onChange={(e) => updateFormData("postalCode", e.target.value)}
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
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">{formData.address}</div>
        </div>
      )}

      {/* 生年月日 */}
      <DateInput
        label="生年月日"
        value={formData.birthDate}
        onChange={(value) => updateFormData("birthDate", value)}
        error={errors.birthDate}
        required
      />

      {/* 性別 */}
      <RadioButton
        name="gender"
        label="性別"
        options={genderOptions}
        value={formData.gender}
        onChange={(value) => updateFormData("gender", value)}
        error={errors.gender}
        required
      />

      {/* 登録店舗（表示のみ） */}
      {formData.registeredStore && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">登録店舗</label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
            {formData.registeredStore}
          </div>
          <p className="mt-1 text-xs text-gray-500">※店舗QRコードから登録された店舗です</p>
        </div>
      )}

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
