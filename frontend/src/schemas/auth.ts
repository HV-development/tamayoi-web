import { z } from 'zod'

export const emailRegistrationSchema = z.object({
  email: z.string().email('正しいメールアドレスを入力してください')
})

export const userRegistrationSchema = z.object({
  token: z.string().min(1, 'トークンが必要です'),
  nickname: z.string().min(1, 'ニックネームを入力してください').max(20, 'ニックネームは20文字以内で入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください').regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'パスワードは英数字を混在させてください'),
  postalCode: z.string().regex(/^\d{7}$/, '郵便番号は7桁の数字で入力してください'),
  address: z.string().min(1, '住所を入力してください'),
  birthDate: z.string().min(1, '生年月日を入力してください'),
  gender: z.enum(['male', 'female', 'other'], { required_error: '性別を選択してください' }),
  saitamaAppId: z.string().optional()
})

export type EmailRegistrationData = z.infer<typeof emailRegistrationSchema>
export type UserRegistrationData = z.infer<typeof userRegistrationSchema>
