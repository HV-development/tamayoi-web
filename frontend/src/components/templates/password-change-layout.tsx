"use client"

import { PasswordChangeContainer } from "../organisms/password-change-container"

interface PasswordChangeLayoutProps {
  currentStep: "form" | "complete"
  onSubmit: (currentPassword: string, newPassword: string) => void
  onCancel: () => void
  onBackToMyPage: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function PasswordChangeLayout({
  currentStep,
  onSubmit,
  onCancel,
  onBackToMyPage,
  onLogoClick,
  isLoading,
}: PasswordChangeLayoutProps) {
  return (
    <PasswordChangeContainer
      currentStep={currentStep}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onBackToMyPage={onBackToMyPage}
      onLogoClick={onLogoClick}
      isLoading={isLoading}
    />
  )
}