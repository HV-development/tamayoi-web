"use client"

import { SignupContainer } from "../organisms/signup-container"

interface SignupFormData {
  registeredStore?: string
  nickname: string
  postalCode: string
  address: string
  birthDate: string
  gender: string
  password: string
  saitamaAppId: string
}

interface SignupLayoutProps {
  initialData?: Partial<SignupFormData>
  onSubmit: (data: SignupFormData) => void
  onCancel: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function SignupLayout({ initialData, onSubmit, onCancel, onLogoClick, isLoading }: SignupLayoutProps) {
  return (
    <SignupContainer
      initialData={initialData}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onLogoClick={onLogoClick}
      isLoading={isLoading}
    />
  )
}
