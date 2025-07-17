'use client'

import { useState, useEffect } from 'react'

/**
 * Next.js 15のuseSearchParamsバグを回避するためのカスタムフック
 */
export function useSearchParamsSafe() {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      setSearchParams(new URLSearchParams(window.location.search))
    }
  }, [])

  const get = (key: string): string | null => {
    if (!isClient || !searchParams) return null
    return searchParams.get(key)
  }

  const getAll = (key: string): string[] => {
    if (!isClient || !searchParams) return []
    return searchParams.getAll(key)
  }

  const has = (key: string): boolean => {
    if (!isClient || !searchParams) return false
    return searchParams.has(key)
  }

  const toString = (): string => {
    if (!isClient || !searchParams) return ''
    return searchParams.toString()
  }

  return {
    get,
    getAll,
    has,
    toString,
    isReady: isClient && searchParams !== null,
  }
}