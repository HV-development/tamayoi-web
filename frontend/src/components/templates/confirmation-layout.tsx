import { ConfirmationContainer } from "../organisms/confirmation-container"

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

interface ConfirmationLayoutProps {
  data: SignupFormData
  onRegister: () => void
  onEdit: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function ConfirmationLayout({ data, onRegister, onEdit, onLogoClick, isLoading }: ConfirmationLayoutProps) {
  return (
    <ConfirmationContainer
      data={data}
      onRegister={onRegister}
      onEdit={onEdit}
      onLogoClick={onLogoClick}
      isLoading={isLoading}
    />
  )
}
