export const foodItems = [
    // Karbohidrat
  {
    id: 'nasi',
    nama: 'Nasi Putih',
    kategori: 'karbohidrat',
    gambar: '/images/items/nasi.jpg',
    porsi: 100, // gram
    kalori: 130,
    isLocal: false
  },
  {
    id: 'singkong',
    nama: 'Singkong Rebus',
    kategori: 'karbohidrat',
    gambar: '/images/food/singkong.png',
    porsi: 100,
    kalori: 146,
    isLocal: true // Bonus point
  },
  {
    id: 'jagung',
    nama: 'Jagung Rebus',
    kategori: 'karbohidrat',
    gambar: '/images/items/jagung.jpg',
    porsi: 100,
    kalori: 96,
    isLocal: true
  },
  {
    id: 'ubi',
    nama: 'Ubi Jalar',
    kategori: 'karbohidrat',
    gambar: '/images/food/ubi.png',
    porsi: 100,
    kalori: 86,
    isLocal: true
  },
  {
    id: 'porang',
    nama: 'Umbi Porang',
    kategori: 'karbohidrat',
    gambar: '/images/items/porang.jpg',
    porsi: 100,
    kalori: 67,
    isLocal: true
  },
  {
    id: 'biji_nangka',
    nama: 'Biji Nangka (Rebus)',
    kategori: 'karbohidrat',
    gambar: '/images/items/biji_nangka.jpg',
    porsi: 100,
    kalori: 155,
    isLocal: true
  },
  
  // Protein
  {
    id: 'ayam',
    nama: 'Ayam',
    kategori: 'protein',
    gambar: '/images/items/ayam.jpg',
    porsi: 50,
    kalori: 110,
    isLocal: false
  },
  {
    id: 'tempe',
    nama: 'Tempe',
    kategori: 'protein',
    gambar: '/images/items/tempe.jpg',
    porsi: 50,
    kalori: 100,
    isLocal: true
  },
  {
    id: 'tahu',
    nama: 'Tahu',
    kategori: 'protein',
    gambar: '/images/items/tahu.jpg',
    porsi: 50,
    kalori: 70,
    isLocal: true
  },
  {
    id: 'koro',
    nama: 'Kacang Koro (Rebus)',
    kategori: 'protein',
    gambar: '/images/items/koro_rebus.jpg',
    porsi: 100,
    kalori: 115,
    isLocal: true
  },
  {
    id: 'ikan',
    nama: 'Ikan',
    kategori: 'protein',
    gambar: '/images/items/ikan.jpg',
    porsi: 50,
    kalori: 90,
    isLocal: true
  },
  {
    id: 'daging_sapi',
    nama: 'Daging Sapi',
    kategori: 'protein',
    gambar: '/images/items/daging.jpg',
    porsi: 50,
    kalori: 120,
    isLocal: false
  },
  {
    id: 'kembung',
    nama: 'Ikan Kembung',
    kategori: 'protein',
    gambar: '/images/items/kembung.jpg',
    porsi: 100,
    kalori: 166,
    isLocal: true
  },
  
  // Sayuran
  {
    id: 'bayam',
    nama: 'Bayam',
    kategori: 'sayuran',
    gambar: '/images/items/bayam.jpg',
    porsi: 100,
    kalori: 23,
    isLocal: true
  },
  {
    id: 'kangkung',
    nama: 'Kangkung',
    kategori: 'sayuran',
    gambar: '/images/items/kangkung.jpg',
    porsi: 100,
    kalori: 19,
    isLocal: true
  },
  {
    id: 'wortel',
    nama: 'Wortel',
    kategori: 'sayuran',
    gambar: '/images/items/wortel.jpg',
    porsi: 100,
    kalori: 41,
    isLocal: false
  },
  {
    id: 'rebung',
    nama: 'Rebung',
    kategori: 'sayuran',
    gambar: '/images/items/rebung.jpg',
    porsi: 100,
    kalori: 20,
    isLocal: true
  },
  {
    id: 'kelor',
    nama: 'Daun Kelor',
    kategori: 'sayuran',
    gambar: '/images/items/kelor.jpg',
    porsi: 100,
    kalori: 64,
    isLocal: true
  },
  
  // Buah
  {
    id: 'pisang',
    nama: 'Pisang',
    kategori: 'buah',
    gambar: '/images/items/pisang.jpg',
    porsi: 100,
    kalori: 89,
    isLocal: true
  },
  {
    id: 'pepaya',
    nama: 'Pepaya',
    kategori: 'buah',
    gambar: '/images/items/pepaya.jpg',
    porsi: 100,
    kalori: 43,
    isLocal: true
  },
  {
    id: 'apel',
    nama: 'Apel',
    kategori: 'buah',
    gambar: '/images/food/apel.png',
    porsi: 100,
    kalori: 52,
    isLocal: false
  }
];

export const targetComposition ={
    karbohidrat : 35,
    protein: 15,
    sayuran: 35,
    buah: 15
};

export const tolerancePercent = 5;