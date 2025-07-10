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
  // srcディレクトリの設定
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

export default nextConfig
