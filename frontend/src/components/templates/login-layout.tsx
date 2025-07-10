import { LoginContainer } from "../organisms/login-container"

interface LoginLayoutProps {
  onLogin: (email: string, password: string) => void
  onSignup: () => void
  onForgotPassword: () => void
  onBack: () => void
  onLogoClick: () => void
  isLoading?: boolean
}

export function LoginLayout({ onLogin, onSignup, onForgotPassword, onBack, onLogoClick, isLoading }: LoginLayoutProps) {
  return (
    <LoginContainer
      onLogin={onLogin}
      onSignup={onSignup}
      onForgotPassword={onForgotPassword}
      onBack={onBack}
      onLogoClick={onLogoClick}
      isLoading={isLoading}
    />
  )
}
