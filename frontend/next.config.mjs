/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Next.js 15のuseSearchParamsバグ回避のための設定
  experimental: {
    // PPRを無効化してuseSearchParamsの問題を回避
    ppr: false,
    // 静的生成を無効化
    staticWorkerRequestDeduping: false,
  },
  // srcディレクトリの設定
  outputFileTracingRoot: undefined,
}

export default nextConfig
