"use client"

import { HelpCircle } from "lucide-react"
import { UsageGuideModal } from "../molecules/usage-guide-modal"
import { useState, useEffect, useRef } from "react"

interface MapContainerProps {
  selectedArea: string
  selectedGenres: string[]
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function MapContainer({ selectedArea, selectedGenres }: MapContainerProps) {
  const [isUsageGuideOpen, setIsUsageGuideOpen] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [userMarker, setUserMarker] = useState<any>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // さいたま市の中心座標
  const SAITAMA_CENTER = { lat: 35.8617, lng: 139.6455 }

  // Google Maps APIの初期化
  useEffect(() => {
    const initializeMap = () => {
      console.log('Google Maps初期化を開始')
      if (!mapRef.current || !window.google) return

      console.log('Google Maps APIが利用可能です')
      const mapOptions = {
        center: SAITAMA_CENTER,
        zoom: 12,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM
        }
      }

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
      console.log('Google Mapsインスタンスを作成しました')
      setMap(newMap)

      // さいたま市の境界を表示（オプション）
      const saitamaBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(35.7500, 139.5500), // 南西
        new window.google.maps.LatLng(35.9500, 139.7500)  // 北東
      )

      // 店舗マーカーのサンプル（実際のデータに置き換え）
      const sampleStores = [
        { lat: 35.9067, lng: 139.6233, name: "さいたま酒場 大宮店", genre: "居酒屋" },
        { lat: 35.8581, lng: 139.6566, name: "イタリアン・ベラヴィスタ", genre: "イタリアン" },
        { lat: 35.9067, lng: 139.6300, name: "焼肉 牛角 大宮東口店", genre: "焼肉" },
        { lat: 35.8617, lng: 139.6455, name: "和食処 さくら", genre: "和食" },
        { lat: 35.9067, lng: 139.6200, name: "バー・ムーンライト", genre: "バー" }
      ]

      // 店舗マーカーを追加
      sampleStores.forEach(store => {
        const marker = new window.google.maps.Marker({
          position: { lat: store.lat, lng: store.lng },
          map: newMap,
          title: store.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="#16a34a" stroke="#ffffff" stroke-width="3"/>
                <circle cx="16" cy="16" r="6" fill="#ffffff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 16)
          }
        })

        // マーカークリック時の情報ウィンドウ
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #16a34a; font-weight: bold;">${store.name}</h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">ジャンル: ${store.genre}</p>
              <button style="background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                クーポンを見る
              </button>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(newMap, marker)
        })
      })
    }

    // Google Maps APIの読み込み状況を確認
    const checkGoogleMapsAPI = () => {
      // 既にGoogle Maps APIが読み込まれている場合
      if (window.google && window.google.maps) {
        console.log('Google Maps API is already loaded')
        initializeMap()
        return
      }

      // 既にスクリプトが読み込み中の場合
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        console.log('Google Maps API script is already loading')
        // 読み込み完了を待つ
        const checkLoaded = () => {
          if (window.google && window.google.maps) {
            initializeMap()
          } else {
            setTimeout(checkLoaded, 100)
          }
        }
        checkLoaded()
        return
      }

      // 新しくスクリプトを読み込む
      console.log('Loading Google Maps API script')
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdyI7pZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z&callback=initMap&libraries=geometry`
      script.async = true
      script.defer = true
      script.onerror = () => {
        console.error('Google Maps APIの読み込みに失敗しました')
        console.error('APIキー:', 'AIzaSyDdyI7pZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z')
        console.error('スクリプトURL:', script.src)
      }
      
      window.initMap = initializeMap
      document.head.appendChild(script)
    }

    checkGoogleMapsAPI()

    return () => {
      // クリーンアップ
      if (window.initMap) {
        delete window.initMap
      }
    }
  }, [])

  // 現在地取得機能
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('お使いのブラウザでは位置情報がサポートされていません')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        
        setUserLocation(location)

        if (map) {
          // 地図の中心を現在地に移動
          map.setCenter(location)
          map.setZoom(15)

          // 既存の現在地マーカーを削除
          if (userMarker) {
            userMarker.setMap(null)
          }

          // 現在地マーカーを追加
          const marker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: '現在地',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="3"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(24, 24),
              anchor: new window.google.maps.Point(12, 12)
            }
          })

          setUserMarker(marker)

          // 現在地周辺の円を表示
          new window.google.maps.Circle({
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#3b82f6',
            fillOpacity: 0.1,
            map: map,
            center: location,
            radius: 500 // 500m
          })
        }
      },
      (error) => {
        console.error('位置情報の取得に失敗しました:', error)
        let errorMessage = '位置情報の取得に失敗しました'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '位置情報の使用が許可されていません。ブラウザの設定をご確認ください。'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = '位置情報が利用できません。'
            break
          case error.TIMEOUT:
            errorMessage = '位置情報の取得がタイムアウトしました。'
            break
        }
        
        alert(errorMessage)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5分間キャッシュ
      }
    )
  }

  // エリア選択時の地図移動
  useEffect(() => {
    if (!map || !selectedArea) return

    const areaCoordinates: Record<string, { lat: number; lng: number }> = {
      nishi: { lat: 35.8856, lng: 139.6189 },
      kita: { lat: 35.9311, lng: 139.6269 },
      omiya: { lat: 35.9067, lng: 139.6233 },
      minuma: { lat: 35.9156, lng: 139.6567 },
      chuo: { lat: 35.8617, lng: 139.6455 },
      sakura: { lat: 35.8389, lng: 139.6111 },
      urawa: { lat: 35.8581, lng: 139.6566 },
      minami: { lat: 35.8467, lng: 139.6623 },
      midori: { lat: 35.8756, lng: 139.6900 },
      iwatsuki: { lat: 35.9500, lng: 139.6933 }
    }

    const coordinates = areaCoordinates[selectedArea]
    if (coordinates) {
      map.setCenter(coordinates)
      map.setZoom(14)
    }
  }, [map, selectedArea])

  const handleUsageGuideOpen = () => {
    setIsUsageGuideOpen(true)
  }

  const handleUsageGuideClose = () => {
    setIsUsageGuideOpen(false)
  }

  return (
    <>
      <div className="flex-1 relative bg-gray-100">
        {/* Google Maps コンテナ */}
        <div 
          ref={mapRef}
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />

        {/* 現在地ボタン */}
        <button
          onClick={getCurrentLocation}
          className="absolute top-4 right-4 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg border border-gray-200 transition-all duration-200 hover:scale-105"
          title="現在地を表示"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600"
          >
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        {/* 使い方ガイドボタン */}
        <button
          onClick={handleUsageGuideOpen}
          className="absolute bottom-4 right-4 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:scale-105"
        >
          <HelpCircle className="w-5 h-5 text-white mb-1" />
          <span className="text-white text-xs font-medium">使い方</span>
        </button>

        {/* 位置情報の状態表示 */}
        {userLocation && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md px-3 py-2 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700 font-medium">現在地を表示中</span>
            </div>
          </div>
        )}
      </div>

      {/* 使い方ガイドモーダル */}
      <UsageGuideModal
        isOpen={isUsageGuideOpen}
        onClose={handleUsageGuideClose}
      />
    </>
  )
}