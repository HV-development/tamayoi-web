import type { Store } from "../types/store"

export const mockStores: Store[] = [
  {
    id: "1",
    name: "さいたま酒場 大宮店",
    genre: "izakaya",
    genreLabel: "居酒屋",
    address: "埼玉県さいたま市大宮区桜木町1-7-5",
    phone: "048-123-4567",
    website: "https://example.com/saitama-sakaba",
    description:
      "地元の新鮮な食材を使った創作料理と豊富な日本酒が自慢の居酒屋です。アットホームな雰囲気で、仕事帰りの一杯から宴会まで幅広くご利用いただけます。",
    thumbnailUrl: "/images/izakaya-exterior.png",
    isFavorite: true,
    visitedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "イタリアン・ベラヴィスタ",
    genre: "italian",
    genreLabel: "イタリアン",
    address: "埼玉県さいたま市浦和区高砂3-15-1",
    phone: "048-234-5678",
    website: "https://example.com/bella-vista",
    description:
      "本格的なイタリア料理を気軽に楽しめるレストラン。シェフ自慢の手打ちパスタと窯焼きピザが人気です。デートや記念日にもおすすめです。",
    thumbnailUrl: "/images/italian-dishes.png",
    isFavorite: false,
    visitedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "焼肉 牛角 大宮東口店",
    genre: "yakiniku",
    genreLabel: "焼肉",
    address: "埼玉県さいたま市大宮区大門町2-118",
    phone: "048-345-6789",
    description:
      "厳選された国産牛を使用した焼肉店。リーズナブルな価格で高品質なお肉をお楽しみいただけます。家族連れにも人気です。",
    thumbnailUrl: "/images/yakiniku-grill.png",
    isFavorite: true,
    visitedAt: new Date("2024-01-08"),
  },
  {
    id: "4",
    name: "和食処 さくら",
    genre: "japanese",
    genreLabel: "和食",
    address: "埼玉県さいたま市中央区本町東3-5-2",
    phone: "048-456-7890",
    website: "https://example.com/washoku-sakura",
    description:
      "季節の食材を活かした本格和食をご提供。落ち着いた和の空間で、ゆっくりとお食事をお楽しみいただけます。接待や会食にも最適です。",
    thumbnailUrl: "/images/izakaya-exterior.png",
    isFavorite: false,
  },
  {
    id: "5",
    name: "バー・ムーンライト",
    genre: "bar",
    genreLabel: "バー",
    address: "埼玉県さいたま市大宮区仲町2-25",
    phone: "048-567-8901",
    description:
      "大人の隠れ家的なバー。マスターが作る本格カクテルと落ち着いた雰囲気が魅力。一人でも気軽に立ち寄れます。",
    thumbnailUrl: "/images/bar-counter.png",
    isFavorite: true,
    visitedAt: new Date("2024-01-05"),
  },
]
