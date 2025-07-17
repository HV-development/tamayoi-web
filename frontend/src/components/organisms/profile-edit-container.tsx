"use client"

import { HeaderLogo } from "../atoms/header-logo"
import { ProfileEditForm } from "../molecules/profile-edit-form"
import { ProfileUpdateSuccessModal } from "../molecules/profile-update-success-modal"
import { useState } from "react"
import type { User } from "../../types/user"

interface ProfileEditFormData {
  nickname: string
  postalCode: string
  address: string
  birthDate: string
  gender: string
  saitamaAppId: string
}

interface ProfileEditContainerProps {
  user: User
  onSubmit: (data: ProfileEditFormData) => void
  onCancel: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function ProfileEditContainer({ user, onSubmit, onCancel, onLogoClick, isLoading }: ProfileEditContainerProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [updatedFields, setUpdatedFields] = useState<string[]>([])

  const handleSubmit = (data: ProfileEditFormData, updatedFieldsList: string[]) => {
    setUpdatedFields(updatedFieldsList)
    onSubmit(data)
    setIsSuccessModalOpen(true)
  }

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false)
    onCancel() // マイページに戻る
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
        {/* ヘッダー */}
        <HeaderLogo onLogoClick={onLogoClick} showBackButton={true} onBackClick={onCancel} />

        {/* メインコンテンツ */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">プロフィール編集</h2>
                <p className="text-gray-600">登録情報を更新してください</p>
              </div>

              <ProfileEditForm user={user} onSubmit={handleSubmit} onCancel={onCancel} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>

      {/* 成功モーダル */}
      <ProfileUpdateSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        updatedFields={updatedFields}
      />
    </>
  )
}
