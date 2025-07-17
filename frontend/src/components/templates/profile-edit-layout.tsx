"use client"

import { ProfileEditContainer } from "../organisms/profile-edit-container"
import type { User } from "../../types/user"

interface ProfileEditFormData {
  nickname: string
  postalCode: string
  address: string
  birthDate: string
  gender: string
  saitamaAppId: string
}

interface ProfileEditLayoutProps {
  user: User
  onSubmit: (data: ProfileEditFormData) => void
  onCancel: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function ProfileEditLayout({ user, onSubmit, onCancel, onLogoClick, isLoading }: ProfileEditLayoutProps) {
  return (
    <ProfileEditContainer
      user={user}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onLogoClick={onLogoClick}
      isLoading={isLoading}
    />
  )
}
