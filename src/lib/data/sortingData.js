export const sortingItems = [
  // Karbohidrat
  { id: 'nasi', nama: 'Nasi', emoji: '🍚', kategori: 'karbohidrat', color: '#fbbf24' },
  { id: 'jagung', nama: 'Jagung', emoji: '🌽', kategori: 'karbohidrat', color: '#fbbf24' },
  { id: 'singkong', nama: 'Singkong', emoji: '🥔', kategori: 'karbohidrat', color: '#fbbf24' },
  { id: 'ubi', nama: 'Ubi', emoji: '🍠', kategori: 'karbohidrat', color: '#fbbf24' },
  { id: 'kentang', nama: 'Kentang', emoji: '🥔', kategori: 'karbohidrat', color: '#fbbf24' },
  { id: 'sagu', nama: 'Sagu', emoji: '🌾', kategori: 'karbohidrat', color: '#fbbf24' },
  { id: 'roti', nama: 'Roti', emoji: '🍞', kategori: 'karbohidrat', color: '#fbbf24' },
  
  // Protein
  { id: 'ayam', nama: 'Ayam', emoji: '🍗', kategori: 'protein', color: '#ef4444' },
  { id: 'ikan', nama: 'Ikan', emoji: '🐟', kategori: 'protein', color: '#ef4444' },
  { id: 'telur', nama: 'Telur', emoji: '🥚', kategori: 'protein', color: '#ef4444' },
  { id: 'tempe', nama: 'Tempe', emoji: '🫘', kategori: 'protein', color: '#ef4444' },
  { id: 'tahu', nama: 'Tahu', emoji: '⬜', kategori: 'protein', color: '#ef4444' },
  { id: 'kacang', nama: 'Kacang', emoji: '🥜', kategori: 'protein', color: '#ef4444' },
  { id: 'daging', nama: 'Daging', emoji: '🥩', kategori: 'protein', color: '#ef4444' },
  
  // Sayuran
  { id: 'bayam', nama: 'Bayam', emoji: '🥬', kategori: 'sayuran', color: '#10b981' },
  { id: 'kangkung', nama: 'Kangkung', emoji: '🥬', kategori: 'sayuran', color: '#10b981' },
  { id: 'wortel', nama: 'Wortel', emoji: '🥕', kategori: 'sayuran', color: '#10b981' },
  { id: 'brokoli', nama: 'Brokoli', emoji: '🥦', kategori: 'sayuran', color: '#10b981' },
  { id: 'tomat', nama: 'Tomat', emoji: '🍅', kategori: 'sayuran', color: '#10b981' },
  { id: 'cabai', nama: 'Cabai', emoji: '🌶️', kategori: 'sayuran', color: '#10b981' },
  { id: 'terong', nama: 'Terong', emoji: '🍆', kategori: 'sayuran', color: '#10b981' },
  
  // Buah
  { id: 'pisang', nama: 'Pisang', emoji: '🍌', kategori: 'buah', color: '#8b5cf6' },
  { id: 'apel', nama: 'Apel', emoji: '🍎', kategori: 'buah', color: '#8b5cf6' },
  { id: 'jeruk', nama: 'Jeruk', emoji: '🍊', kategori: 'buah', color: '#8b5cf6' },
  { id: 'mangga', nama: 'Mangga', emoji: '🥭', kategori: 'buah', color: '#8b5cf6' },
  { id: 'pepaya', nama: 'Pepaya', emoji: '🍈', kategori: 'buah', color: '#8b5cf6' },
  { id: 'semangka', nama: 'Semangka', emoji: '🍉', kategori: 'buah', color: '#8b5cf6' },
  { id: 'anggur', nama: 'Anggur', emoji: '🍇', kategori: 'buah', color: '#8b5cf6' }
];

export const categories = [
  {
    id: 'karbohidrat',
    nama: 'Karbohidrat',
    emoji: '🍚',
    color: '#fbbf24',
    description: 'Sumber energi utama'
  },
  {
    id: 'protein',
    nama: 'Protein',
    emoji: '🍗',
    color: '#ef4444',
    description: 'Pembangun tubuh'
  },
  {
    id: 'sayuran',
    nama: 'Sayuran',
    emoji: '🥬',
    color: '#10b981',
    description: 'Sumber vitamin & mineral'
  },
  {
    id: 'buah',
    nama: 'Buah',
    emoji: '🍎',
    color: '#8b5cf6',
    description: 'Sumber vitamin & serat'
  }
];

export const difficultyLevels = {
  easy: {
    spawnInterval: 4000,    // 4 detik per item (lebih lama lagi!)
    fallSpeed: 0.15,        // LEBIH LAMBAT (sebelumnya 0.25)
    speedIncrease: 0.05     // Increase lebih kecil
  },
  normal: {
    spawnInterval: 2500,
    fallSpeed: 1.5,
    speedIncrease: 0.1
  },
  hard: {
    spawnInterval: 1500,
    fallSpeed: 3,
    speedIncrease: 0.2
  }
};