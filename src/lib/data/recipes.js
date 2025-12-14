export const recipes = [
  {
    id: 1,
    title: 'Nasi Jagung Gurih',
    category: 'Sarapan',
    difficulty: 'Mudah',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    image: '/images/maps/nasi_jagung.jpg',
    ingredients: [
      { name: 'Jagung pipil', amount: '500', unit: 'gram', category: 'Biji-bijian' },
      { name: 'Santan', amount: '200', unit: 'ml', category: 'Bumbu' },
      { name: 'Daun salam', amount: '2', unit: 'lembar', category: 'Bumbu' },
      { name: 'Garam', amount: '1', unit: 'sdt', category: 'Bumbu' }
    ],
    nutrition: {
      calories: 320,
      protein: 8,
      carbs: 52,
      fat: 9,
      fiber: 5
    },
    steps: [
      'Cuci bersih jagung pipil',
      'Rebus jagung hingga setengah matang',
      'Tambahkan santan, daun salam, dan garam',
      'Masak hingga air menyusut dan jagung empuk'
    ],
    tags: ['Pangan Lokal', 'Bebas Gluten', 'Sarapan Sehat']
  },
  {
    id: 2,
    title: 'Singkong Goreng Keju',
    category: 'Snack',
    difficulty: 'Mudah',
    prepTime: 10,
    cookTime: 20,
    servings: 3,
    image: '/images/maps/sinkong_goreng.jpg',
    ingredients: [
      { name: 'Singkong', amount: '500', unit: 'gram', category: 'Umbi-umbian' },
      { name: 'Keju parut', amount: '100', unit: 'gram', category: 'Dairy' },
      { name: 'Minyak goreng', amount: '200', unit: 'ml', category: 'Bumbu' },
      { name: 'Garam', amount: '0.5', unit: 'sdt', category: 'Bumbu' }
    ],
    nutrition: {
      calories: 280,
      protein: 6,
      carbs: 45,
      fat: 12,
      fiber: 3
    },
    steps: [
      'Kupas dan potong singkong',
      'Rebus singkong hingga empuk',
      'Goreng hingga kuning keemasan',
      'Taburi keju parut dan garam'
    ],
    tags: ['Pangan Lokal', 'Camilan', 'Favorit Keluarga']
  },
  {
    id: 3,
    title: 'Bubur Kacang Hijau',
    category: 'Makan Malam',
    difficulty: 'Mudah',
    prepTime: 10,
    cookTime: 40,
    servings: 4,
    image: '/images/maps/bubur_cangjo.jpg',
    ingredients: [
      { name: 'Kacang hijau', amount: '250', unit: 'gram', category: 'Protein Nabati' },
      { name: 'Gula merah', amount: '150', unit: 'gram', category: 'Bumbu' },
      { name: 'Santan', amount: '200', unit: 'ml', category: 'Bumbu' },
      { name: 'Daun pandan', amount: '2', unit: 'lembar', category: 'Bumbu' }
    ],
    nutrition: {
      calories: 280,
      protein: 12,
      carbs: 48,
      fat: 8,
      fiber: 8
    },
    steps: [
      'Cuci bersih kacang hijau',
      'Rebus kacang hijau dengan daun pandan hingga empuk',
      'Tambahkan gula merah, aduk hingga larut',
      'Sajikan dengan santan'
    ],
    tags: ['Pangan Lokal', 'Tinggi Protein', 'Dessert']
  },
  {
    id: 5,
    title: 'Tempe Bacem Manis',
    category: 'Makan Siang',
    difficulty: 'Sedang',
    prepTime: 20,
    cookTime: 45,
    servings: 4,
    image: '/images/maps/tempe_bacem.jpg',
    ingredients: [
      { name: 'Tempe', amount: '400', unit: 'gram', category: 'Protein Nabati' },
      { name: 'Gula merah', amount: '100', unit: 'gram', category: 'Bumbu' },
      { name: 'Bawang putih', amount: '5', unit: 'siung', category: 'Bumbu' },
      { name: 'Ketumbar', amount: '1', unit: 'sdt', category: 'Bumbu' },
      { name: 'Daun salam', amount: '3', unit: 'lembar', category: 'Bumbu' }
    ],
    nutrition: {
      calories: 220,
      protein: 18,
      carbs: 20,
      fat: 10,
      fiber: 4
    },
    steps: [
      'Potong tempe sesuai selera',
      'Haluskan bumbu: bawang putih, ketumbar',
      'Rebus tempe dengan bumbu, gula merah, dan daun salam',
      'Setelah bumbu meresap, goreng hingga kecoklatan'
    ],
    tags: ['Pangan Lokal', 'Tinggi Protein', 'Favorit']
  }
];

export const recipeCategories = [
  'Semua',
  'Sarapan',
  'Makan Siang',
  'Makan Malam',
  'Snack',
  'Minuman'
];

export const recipeTags = [
  'Pangan Lokal',
  'Tinggi Protein',
  'Bebas Gluten',
  'Vegetarian',
  'Rendah Kalori',
  'Sehat',
  'Favorit Keluarga'
];