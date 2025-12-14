export const foodData = [
  {
    id: 'wheat_flour',
    name: 'Tepung Terigu (Standar)',
    category: 'Pati/Bahan Dasar',
    substitutes: [
      { id: 'mocaf', name: 'Tepung Mocaf (Singkong)', ratio: 0.85, notes: 'Rasio 85% dari terigu.' },
      { id: 'sorghum_flour', name: 'Tepung Sorgum', ratio: 0.90, notes: 'Rasio 90% dari terigu. Lebih tinggi protein.' },
      { id: 'sago_flour', name: 'Tepung Sagu', ratio: 1.0, notes: 'Rasio 100% untuk pengental.' },
    ],
    nutrition: { carbs: 76, protein: 10, fiber: 2.7, unit: 'per 100g' }
  },
  {
    id: 'mocaf',
    name: 'Tepung Mocaf (Singkong)',
    category: 'Pati/Bahan Dasar',
    nutrition: { carbs: 83, protein: 1.2, fiber: 3.5, unit: 'per 100g' }
  },
  {
    id: 'kedelai',
    name: 'Kedelai',
    category: 'Protein Nabati',
    substitutes: [
      { id: 'kacang_komak', name: 'Kacang Komak', ratio: 1.0, notes: 'Rasio 100% untuk tempe/tahu.' },
      { id: 'kacang_gude', name: 'Kacang Gude', ratio: 0.95, notes: 'Rasio 95% untuk olahan.' },
    ],
    nutrition: { carbs: 30, protein: 36, fiber: 9, unit: 'per 100g' }
  },
  // ... Tambahkan data bahan pangan lain yang ingin disubstitusi
];