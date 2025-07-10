"use client"

import { EmailRegistrationContainer } from "../organisms/email-registration-container"

interface EmailRegistrationLayoutProps {
  onSubmit: (email: string) => void
  onBack: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function EmailRegistrationLayout({ onSubmit, onBack, onLogoClick, isLoading }: EmailRegistrationLayoutProps) {
  return (
    <EmailRegistrationContainer onSubmit={onSubmit} onBack={onBack} onLogoClick={onLogoClick} isLoading={isLoading} />
  )
}
