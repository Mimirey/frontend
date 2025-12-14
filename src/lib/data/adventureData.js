export const panganItems = [
  {
    id: 'jagung',
    emoji: '/images/emojis/jagung.png',
    nama: 'Jagung',
    image: '/images/items/jagung.jpg',
    kategori: 'karbohidrat',
    asal: 'Seluruh Indonesia',
    manfaat: 'Kaya serat dan vitamin B, baik untuk pencernaan',
    funFact: 'Jagung bisa diolah menjadi berbagai makanan: nasi jagung, popcorn, marning, hingga susu jagung!',
    points: 10
  },
  {
    id: 'ubi-ungu',
    emoji: '/images/emojis/ubi_ungu.png',
    nama: 'Ubi Ungu',
    image: '/images/items/ubi_ungu.jpg',
    kategori: 'karbohidrat',
    asal: 'Papua',
    manfaat: 'Kaya antioksidan dari warna ungunya, baik untuk kesehatan jantung',
    funFact: 'Warna ungu berasal dari antosianin, antioksidan yang sama dengan blueberry!',
    points: 15
  },
  {
    id: 'singkong',
    emoji: '/images/emojis/singkong.png',
    nama: 'Singkong',
    image: '/images/items/singkong.jpg',
    kategori: 'karbohidrat',
    asal: 'Seluruh Indonesia',
    manfaat: 'Sumber karbohidrat alternatif pengganti nasi',
    funFact: 'Singkong bisa diolah jadi tape, keripik, getuk, hingga tepung mocaf!',
    points: 10
  },
  {
    id: 'tempe',
    emoji: '/images/emojis/tempe.png',
    nama: 'Tempe',
    image: '/images/items/tempe.jpg',
    kategori: 'protein',
    asal: 'Jawa',
    manfaat: 'Tinggi protein nabati dan probiotik',
    funFact: 'Tempe adalah makanan fermentasi asli Indonesia yang mendunia!',
    points: 20
  },
  {
    id: 'kacang-tanah',
    emoji: '/images/emojis/kacang.png',
    nama: 'Kacang Tanah',
    image: '/images/items/kacang.jpg',
    kategori: 'protein',
    asal: 'Seluruh Indonesia',
    manfaat: 'Sumber protein dan lemak sehat',
    funFact: 'Kacang tanah sebenarnya bukan kacang, tapi termasuk keluarga polong-polongan!',
    points: 10
  },
  {
    id: 'pisang',
    emoji: '/images/emojis/pisang.png',
    nama: 'Pisang',
    image: '/images/items/pisang.jpg',
    kategori: 'buah',
    asal: 'Seluruh Indonesia',
    manfaat: 'Kaya kalium dan energi cepat',
    funFact: 'Indonesia punya lebih dari 1.000 varietas pisang!',
    points: 10
  },
  {
    id: 'sagu',
    emoji: '/images/emojis/sagu.png',
    nama: 'Sagu',
    image: '/images/items/sagu.jpg',
    kategori: 'karbohidrat',
    asal: 'Papua & Maluku',
    manfaat: 'Sumber energi tradisional masyarakat Papua',
    funFact: 'Sagu diambil dari batang pohon sagu yang bisa berumur 15 tahun!',
    points: 20
  },
  {
    id: 'kangkung',
    emoji: '/images/emojis/kangkung.png',
    nama: 'Kangkung',
    image: '/images/items/kangkung.jpg',
    kategori: 'sayuran',
    asal: 'Seluruh Indonesia',
    manfaat: 'Kaya zat besi dan vitamin A',
    funFact: 'Kangkung bisa tumbuh di air (kangkung air) atau darat (kangkung darat)!',
    points: 10
  }
];

export const quests = [
  {
    id: 'quest-1',
    title: 'Kenali Karbohidrat Lokal',
    description: 'Kumpulkan 3 sumber karbohidrat lokal',
    target: ['jagung', 'singkong', 'ubi-ungu'],
    reward: { points: 100, badge: '🌾' },
    completed: false
  },
  {
    id: 'quest-2',
    title: 'Protein Nabati Nusantara',
    description: 'Temukan sumber protein nabati',
    target: ['tempe', 'kacang-tanah'],
    reward: { points: 75, badge: '💪' },
    completed: false
  },
  {
    id: 'quest-3',
    title: 'Master Kolektor',
    description: 'Kumpulkan semua pangan lokal',
    target: 'all',
    reward: { points: 200, badge: '🏆' },
    completed: false
  }
];

export const achievements = [
  {
    id: 'speed_runner',
    name: 'Pelari Cepat',
    description: 'Selesaikan dalam 2 menit',
    icon: '⚡',
    condition: (time) => time < 120,
    unlocked: false
  },
  {
    id: 'completionist',
    name: 'Kolektor Handal',
    description: 'Kumpulkan semua item',
    icon: '💯',
    condition: (collected, total) => collected === total,
    unlocked: false
  },
  {
    id: 'combo_master',
    name: 'Master Kombo',
    description: 'Capai kombo 5x',
    icon: '🔥',
    condition: (combo) => combo >= 5,
    unlocked: false
  },
  {
    id: 'explorer',
    name: 'Penjelajah',
    description: 'Jelajahi seluruh peta',
    icon: '🗺️',
    condition: (explored) => explored >= 90,
    unlocked: false
  }
];

export const npcs = [
  {
    id: 'farmer',
    name: 'Pak Tani',
    image: '/images/characters/npc-farmer.png',
    emoji: '👨‍🌾',
    x: 400,
    y: 300,
    dialogue: [
      "Selamat datang di Desa Pangan, Nak!",
      "Di sini banyak pangan lokal yang bisa kamu temukan.",
      "Coba cari jagung di sebelah timur!",
      "Jangan lupa kumpulkan semuanya ya!"
    ]
  }
];

export const mapConfig = {
  width: 2400,
  height: 1800,
  tileSize: 64,
  background: '/images/maps/map-background.jpg',
  viewport: {
    width: 1200,
    height: 600
  }
};

export const powerups = [
  {
    id: 'speed-boost',
    name: 'Sepatu Turbo',
    icon: '👟',
    duration: 5000,
    effect: 'speed',
    multiplier: 1.5
  },
  {
    id: 'magnet',
    name: 'Magnet Item',
    icon: '🧲',
    duration: 10000,
    effect: 'magnet',
    radius: 100
  }
];