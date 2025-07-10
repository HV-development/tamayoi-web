"use client"

import { Mail, CheckCircle, AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "../atoms/button"

interface EmailChangeCompleteProps {
  currentEmail: string
  newEmail: string
  onBackToMyPage: () => void
  onResend: () => void
}

export function EmailChangeComplete({ currentEmail, newEmail, onBackToMyPage, onResend }: EmailChangeCompleteProps) {
  return (
    <div className="space-y-6">
      {/* 送信完了メッセージ */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">確認メールを送信しました</h2>
          <p className="text-gray-600">新しいメールアドレスに確認メールをお送りしました</p>
        </div>

        {/* メールアドレス情報 */}
        <div className="space-y-3 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2">現在のメールアドレス</p>
            <p className="text-gray-900 font-mono text-sm">{currentEmail}</p>
          </div>

          <div className="text-2xl text-green-600">↓</div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-700 mb-2">新しいメールアドレス</p>
            <p className="text-green-900 font-mono text-sm font-bold">{newEmail}</p>
          </div>
        </div>
      </div>

      {/* 手順説明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h3 className="text-blue-900 font-bold mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          次の手順でメールアドレス変更を完了してください
        </h3>
        <ol className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold flex-shrink-0 mt-0.5">
              1
            </span>
            <span>新しいメールアドレス（{newEmail}）に送信された確認メールを開いてください</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold flex-shrink-0 mt-0.5">
              2
            </span>
            <span>メール内の「メールアドレス変更を確定する」リンクをクリックしてください</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold flex-shrink-0 mt-0.5">
              3
            </span>
            <span>変更完了画面が表示されたら、新しいメールアドレスでログインできるようになります</span>
          </li>
        </ol>
      </div>

      {/* 注意事項 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6">
        <h3 className="text-yellow-900 font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          確認メールが届かない場合
        </h3>
        <ul className="text-sm text-yellow-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold flex-shrink-0">•</span>
            <span>
              <strong>迷惑メールフォルダ</strong>をご確認ください
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold flex-shrink-0">•</span>
            <span>
              メールアドレスに<strong>入力ミス</strong>がないかご確認ください
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold flex-shrink-0">•</span>
            <span>上記を確認しても届かない場合は、下記の「再送信」ボタンをお試しください</span>
          </li>
        </ul>
      </div>

      {/* 重要な注意 */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
        <h3 className="text-red-900 font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          変更完了まで
        </h3>
        <div className="text-sm text-red-800 space-y-2">
          <div>
            • 確認メール内のリンクをクリックするまで、メールアドレスの変更は<strong>完了していません</strong>
          </div>
          <div>
            • 変更が完了するまでは、<strong>現在のメールアドレス（{currentEmail}）</strong>でログインしてください
          </div>
          <div>
            • 確認メールの有効期限は<strong>24時間</strong>です
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div className="space-y-3">
        <Button
          onClick={onBackToMyPage}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          マイページに戻る
        </Button>

        <Button
          onClick={onResend}
          variant="secondary"
          className="w-full py-3 text-base font-medium flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          確認メールを再送信
        </Button>
      </div>
    </div>
  )
}
