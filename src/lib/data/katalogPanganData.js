export const bookData={
    title: "Katalog Pangan Nusantara",
    subtitle: "Mengenal Keragaman Pangan Lokal Indonesia",
    coverImage: "images/coming soon.jpg"
};

export const katalogPages= [
    {
        id:'cover',
        type:'cover',
        title:bookData.title,
        subtitle: bookData.subtitle
    },

    {
        id: 'toc',
        type: 'toc',
        title: 'Daftar Isi',
        sections: [
        { name: 'Karbohidrat', page: 2 },
        { name: 'Protein', page: 10 },
        { name: 'Sayuran', page: 18 },
        { name: 'Buah-buahan', page: 26 }
        ]
    },

        // Section: Karbohidrat
    {
        id: 'karbo-intro',
        type: 'section-intro',
        title: 'Karbohidrat',
        subtitle: 'Sumber Energi Utama',
        description: 'Karbohidrat merupakan sumber energi utama bagi tubuh. Indonesia kaya akan berbagai sumber karbohidrat lokal yang bisa menggantikan nasi.',
        icon: 'images/emojis/mie_sagu.png',
        color: '#fbbf24'
    },
    
    // Pangan items
    {
        id: 'jagung',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Jagung',
        namaIlmiah: 'Zea mays',
        image: '/images/items/jagung.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Jagung merupakan tanaman pangan penting di Indonesia. Selain sebagai makanan pokok alternatif, jagung juga diolah menjadi berbagai produk makanan.',
        kandunganGizi: {
        kalori: '86 kkal',
        karbohidrat: '18.7 g',
        protein: '3.3 g',
        serat: '2.4 g',
        vitaminB: 'Tinggi'
        },
        manfaat: [
        'Sumber energi yang baik',
        'Kaya akan serat untuk pencernaan',
        'Mengandung antioksidan lutein dan zeaxanthin',
        'Baik untuk kesehatan mata'
        ],
        olahanPopuler: [
        'Nasi jagung',
        'Jagung rebus/bakar',
        'Popcorn',
        'Marning (jagung telur)',
        'Susu jagung'
        ],
        funFact: 'Jagung sudah dibudidayakan sejak 10.000 tahun lalu dan merupakan salah satu tanaman pangan tertua di dunia!'
    },
    
    {
        id: 'singkong',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Singkong',
        namaIlmiah: 'Manihot esculenta',
        image: '/images/items/singkong.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Singkong atau ubi kayu adalah umbi-umbian yang sangat populer di Indonesia. Mudah ditanam dan memiliki berbagai olahan.',
        kandunganGizi: {
        kalori: '160 kkal',
        karbohidrat: '38 g',
        protein: '1.4 g',
        serat: '1.8 g',
        vitaminC: 'Sedang'
        },
        manfaat: [
        'Alternatif karbohidrat bebas gluten',
        'Mengandung resistant starch',
        'Baik untuk pencernaan',
        'Sumber energi tahan lama'
        ],
        olahanPopuler: [
        'Tape singkong',
        'Keripik singkong',
        'Getuk',
        'Tiwul',
        'Tepung mocaf'
        ],
        funFact: 'Daun singkong juga bisa dimakan dan kaya akan protein serta vitamin!'
    },
    
    {
        id: 'ubi-ungu',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Ubi Ungu',
        namaIlmiah: 'Ipomoea batatas',
        image: '/images/items/ubi_ungu.jpg',
        asal: 'Papua',
        deskripsi: 'Ubi ungu khas Papua memiliki warna ungu pekat yang kaya akan antioksidan. Menjadi makanan pokok masyarakat Papua.',
        kandunganGizi: {
        kalori: '86 kkal',
        karbohidrat: '20 g',
        protein: '1.6 g',
        serat: '3 g',
        antosianin: 'Sangat tinggi'
        },
        manfaat: [
        'Kaya antioksidan antosianin',
        'Baik untuk kesehatan jantung',
        'Mencegah penuaan dini',
        'Meningkatkan imunitas'
        ],
        olahanPopuler: [
        'Ubi rebus',
        'Ubi bakar',
        'Kolak ubi',
        'Es krim ubi ungu',
        'Keripik ubi'
        ],
        funFact: 'Warna ungu pada ubi berasal dari antosianin, antioksidan yang sama dengan blueberry dan anggur!'
    },

    {
        id: 'sagu',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Sagu',
        namaIlmiah: 'Metroxylon sagu',
        image: '/images/items/mie_sagu.jpg',
        asal: 'Papua & Maluku',
        deskripsi: 'Sagu adalah pangan pokok tradisional masyarakat Papua dan Maluku yang diambil dari batang pohon sagu.',
        kandunganGizi: {
            kalori: '94 kkal',
            karbohidrat: '24 g',
            protein: '0.2 g',
            serat: '0.9 g'
        },
        manfaat: [
            'Sumber energi yang baik',
            'Bebas gluten',
            'Mudah dicerna',
            'Pangan tradisional'
        ],
        olahanPopuler: [
            'Papeda',
            'Sagu lempeng',
            'Sagu mutiara',
            'Sagu gula merah'
        ],
        funFact: 'Sagu diambil dari batang pohon sagu yang bisa berumur 15 tahun!'
    },

    {
        id: 'sorgum',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Sorgum',
        namaIlmiah: 'Sorghum bicolor',
        image: '/images/items/sorgum.jpg',
        asal: 'Nusa Tenggara',
        deskripsi: 'Sorgum adalah tanaman serealia yang tahan kekeringan, menjadi pangan pokok alternatif di NTT.',
        kandunganGizi: {
            kalori: '329 kkal',
            karbohidrat: '72 g',
            protein: '11 g',
            serat: '6.3 g'
        },
        manfaat: [
            'Bebas gluten',
            'Kaya antioksidan',
            'Tahan kekeringan',
            'Sumber energi tinggi'
        ],
        olahanPopuler: [
            'Nasi sorgum',
            'Tepung sorgum',
            'Kue sorgum',
            'Bubur sorgum'
        ],
        funFact: 'Biji sorgum bisa diolah seperti popcorn!'
    },

    {
        id: 'nasi',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Nasi',
        namaIlmiah: 'Oryza sativa',
        image: '/images/items/nasi.jpg',
        asal: 'Asia',
        deskripsi: 'Nasi putih adalah makanan pokok utama di Indonesia yang terbuat dari beras.',
        kandunganGizi: {
            kalori: '130 kkal',
            karbohidrat: '28 g',
            protein: '2.7 g',
            serat: '0.4 g'
        },
        manfaat: [
            'Sumber energi utama bagi tubuh',
            'Mengenyangkan dan mudah dicerna',
            'Menjadi karbohidrat dasar untuk berbagai menu'
        ],
        olahanPopuler: [
            'Nasi goreng',
            'Nasi uduk',
            'Nasi kuning',
            'Lontong'
        ],
        funFact: 'Indonesia adalah salah satu produsen beras terbesar di dunia'
    },

    {
        id: 'porang',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Umbi Porang',
        namaIlmiah: 'Amorphophallus muelleri',
        image: '/images/items/porang.jpg',
        asal: 'Jawa',
        deskripsi: 'Porang adalah umbi yang kaya serat glukomanan, baik untuk diet dan kesehatan.',
        kandunganGizi: {
            kalori: '67 kkal',
            karbohidrat: '15 g',
            protein: '0.1 g',
            serat: '5 g'
        },
        manfaat: [
            'Membantu diet karena tinggi serat glukomanan',
            'Baik untuk pencernaan dan menjaga rasa kenyang',
            'Membantu menurunkan kadar gula darah',
            'Cocok untuk pengganti tepung rendah kalori'
        ],
        olahanPopuler: [
            'Beras porang',
            'Mie shirataki',
            'Nasi porang',
            'Konnyaku'
        ],
        funFact: 'Porang mengandung glukomanan yang bisa menyerap air 200 kali beratnya!'
    },

    {
        id: 'biji-nangka',
        type: 'item',
        nama: 'Biji Nangka',
        namaIlmiah: 'Artocarpus heterophyllus',
        kategori: 'karbohidrat',
        image: '/images/items/biji_nangka.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Biji nangka yang sering dibuang ternyata bisa diolah menjadi makanan bergizi.',
        manfaat: 'Sumber karbohidrat dan protein',
        porsi: 100,
        kalori: 155,
        kandunganGizi: {
            kalori: '155 kkal',
            karbohidrat: '32 g',
            protein: '4 g',
            serat: '1.5 g'
        },
        manfaat: [
            'Sumber karbohidrat dan energi',
            'Mengandung protein nabati',
            'Baik untuk pencernaan karena mengandung serat',
            'Mengandung mineral seperti zat besi dan magnesium'
        ],
        olahanPopuler: [
            'Biji nangka rebus',
            'Biji nangka goreng',
            'Tepung biji nangka',
            'Sayur lodeh biji nangka'
        ],
        funFact: 'Biji nangka bisa diolah seperti kacang dan punya tekstur seperti kentang!',
    },
    {
        id: 'gembili',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Gembili',
        namaIlmiah: 'Dioscorea esculenta',
        image: '/images/items/gembili.jpg',
        asal: 'Jawa, Nusa Tenggara, Papua',
        deskripsi: 'Gembili adalah umbi lokal yang memiliki tekstur lembut dan rasa manis alami.',
        kandunganGizi: {
            kalori: '118 kkal',
            karbohidrat: '27 g',
            serat: '4 g',
            protein: '1.5 g'
        },
        manfaat: [
            'Membantu menjaga pencernaan karena tinggi serat',
            'Sumber energi yang baik',
            'Mengandung prebiotik alami'
        ],
        olahanPopuler: [
            'Gembili rebus',
            'Kolak gembili',
            'Keripik gembili'
        ],
        funFact: 'Gembili sering disebut sebagai “ubi hutan” karena banyak tumbuh liar di pedesaan!'
    },
    {
        id: 'ganyong',
        type: 'item',
        kategori: 'karbohidrat',
        nama: 'Ganyong',
        namaIlmiah: 'Canna indica',
        image: '/images/items/ganyong.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Ganyong adalah umbi tradisional yang menghasilkan pati lembut dan mudah dicerna.',
        kandunganGizi: {
            kalori: '100 kkal',
            karbohidrat: '22 g',
            serat: '1.1 g',
            protein: '1 g'
        },
        manfaat: [
            'Baik untuk pencernaan karena mudah dicerna',
            'Sumber karbohidrat alternatif rendah gluten',
            'Membantu menjaga energi tubuh'
        ],
        olahanPopuler: [
            'Tepung ganyong',
            'Bubur ganyong',
            'Ganyong rebus'
        ],
        funFact: 'Dulu, ganyong pernah menjadi makanan pokok cadangan saat masa darurat pangan!'
    },
    // Section: Protein
    {
        id: 'protein-intro',
        type: 'section-intro',
        title: 'Protein',
        subtitle: 'Pembangun Tubuh',
        description: 'Protein penting untuk pertumbuhan dan perbaikan sel tubuh. Indonesia memiliki berbagai sumber protein nabati dan hewani lokal.',
        icon: 'images/emojis/ayam.png',
        color: '#ef4444'
    },
    
    {
        id: 'tempe',
        type: 'item',
        kategori: 'protein',
        nama: 'Tempe',
        namaIlmiah: 'Fermented Glycine max',
        image: '/images/items/tempe.jpg',
        asal: 'Jawa',
        deskripsi: 'Tempe adalah makanan fermentasi tradisional Indonesia yang terbuat dari kedelai. Kini sudah dikenal di seluruh dunia.',
        kandunganGizi: {
        kalori: '195 kkal',
        protein: '20 g',
        lemak: '11 g',
        serat: '7 g',
        probiotik: 'Tinggi'
        },
        manfaat: [
        'Sumber protein nabati lengkap',
        'Mudah dicerna',
        'Mengandung probiotik alami',
        'Kaya vitamin B12',
        'Baik untuk kolesterol'
        ],
        olahanPopuler: [
        'Tempe goreng',
        'Tempe bacem',
        'Tempe mendoan',
        'Tempe penyet',
        'Keripik tempe'
        ],
        funFact: 'Tempe adalah satu-satunya sumber vitamin B12 nabati dan sudah ada sejak ratusan tahun lalu di Jawa!'
    },

    {
        id: 'tahu',
        type: 'item',
        kategori: 'protein',
        nama: 'Tahu',
        namaIlmiah: 'Glycine max',
        image: '/images/items/tahu.jpg',
        asal: 'Tiongkok',
        deskripsi: 'Tahu adalah makanan serbaguna yang dibuat dari protein kacang kedelai yang digumpalkan, mirip proses pembuatan keju tapi dari susu kedelai, kaya protein nabati, vitamin, mineral, rendah lemak jenuh, dan berasal dari Tiongkok',
        kandunganGizi: {
        kalori: '144 kkal',
        protein: '17 g',
        lemak: '9 g',
        serat: '2 g',
        probiotik: 'Tinggi'
        },
        manfaat: [
        'Sumber protein nabati lengkap',
        'Mudah dicerna',
        'Mengandung probiotik alami',
        ],
        olahanPopuler: [
        'Tahu goreng',
        'Tahu bacem',
        'Tahu telur',
        'Tahu penyet'
        ],
        funFact: 'Tahu adalah makanan kuno dari Tiongkok berusia lebih dari 2000 tahun'
    },

    {
        id: 'kacang-tanah',
        type: 'item',
        kategori: 'protein',
        nama: 'Kacang Tanah',
        namaIlmiah: 'Arachis hypogaea',
        image: '/images/items/tempe.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Kacang tanah adalah sumber protein dan lemak sehat yang mudah ditemukan.',
        kandunganGizi: {
            kalori: '567 kkal',
            protein: '25.8 g',
            lemak: '49.2 g',
            serat: '8.5 g'
        },
        manfaat: [
            'Sumber protein nabati dan lemak sehat',
            'Membantu menjaga kesehatan jantung',
            'Mengandung antioksidan dan vitamin B',
            'Memberikan energi tinggi'
        ],
        olahanPopuler: [
            'Kacang rebus',
            'Bumbu kacang (pecel/sate)',
            'Selai kacang',
            'Kacang sangrai'
        ],
        funFact: 'Kacang tanah sebenarnya bukan kacang, tapi termasuk keluarga polong-polongan!'
    },
    {
        id: 'koro',
        type: 'item',
        kategori: 'protein',
        nama: 'Kacang Koro',
        namaIlmiah: 'Canavalia ensiformis',
        image: '/images/items/koro_rebus.jpg',
        asal: 'Jawa',
        deskripsi: 'Kacang koro adalah kacang lokal yang perlu diolah dengan benar sebelum dikonsumsi.',
        kandunganGizi: {
            kalori: '115 kkal',
            protein: '8 g',
            lemak: '1 g',
            serat: '5 g'
        },
        manfaat: [
            'Sumber protein nabati terjangkau',
            'Tinggi serat dan baik untuk pencernaan',
            'Membantu menjaga kadar gula darah',
            'Rendah lemak'
        ],
        olahanPopuler: [
            'Keripik koro',
            'Koro rebus',
            'Koro pedas manis',
            'Tepung koro untuk olahan kue'
        ],
        funFact: 'Kacang koro harus direbus berulang kali untuk menghilangkan racun alami'
    },
    {
        id: 'kembung',
        type: 'item',
        kategori: 'protein',
        nama: 'Ikan Kembung',
        namaIlmiah: 'Rastrelliger kanagurta',
        image: '/images/items/kembung.jpg',
        asal: 'Jawa',
        deskripsi: 'Ikan kembung adalah ikan lokal yang kaya akan omega-3 dan protein.',
        kandunganGizi: {
            kalori: '166 kkal',
            protein: '22 g',
            lemak: '8 g'
        },
        manfaat: [
            'Tinggi omega-3 yang baik untuk otak dan jantung',
            'Sumber protein hewani berkualitas tinggi',
            'Mengandung vitamin B12 dan zat besi',
            'Mendukung pertumbuhan dan imunitas tubuh'
        ],
        olahanPopuler: [
            'Kembung bakar',
            'Pepes kembung',
            'Kembung goreng sambal',
            'Kembung kuah kuning'
        ],
        funFact: 'Ikan kembung adalah salah satu ikan paling terjangkau dengan gizi tinggi!'
    },
    {
        id: 'ayam',
        type: 'item',
        kategori: 'protein',
        nama: 'Ayam',
        namaIlmiah: 'Gallus gallus domesticus',
        image: '/images/items/ayam.jpg',
        asal: 'Global',
        deskripsi: 'Ayam adalah sumber protein hewani yang populer di seluruh dunia.',
        kandunganGizi: {
            kalori: '110 kkal',
            protein: '20 g',
            lemak: '3 g'
        },
        manfaat: [
            'Sumber protein hewani yang mudah dicerna',
            'Mendukung pembentukan otot dan jaringan tubuh',
            'Mengandung vitamin B kompleks',
            'Baik sebagai bahan makanan serbaguna'
        ],
        olahanPopuler: [
            'Ayam goreng',
            'Opor ayam',
            'Ayam bakar',
            'Soto ayam'
        ],
        funFact: 'Ayam adalah hewan ternak paling banyak di dunia'
    },
    {
        id: 'daging-sapi',
        type: 'item',
        kategori: 'protein',
        nama: 'Daging Sapi',
        namaIlmiah: 'Bos taurus',
        image: '/images/items/daging.jpg',
        asal: 'Global',
        deskripsi: 'Daging sapi adalah sumber protein hewani yang kaya zat besi.',
        kandunganGizi: {
            kalori: '110 kkal',
            protein: '20 g',
            lemak: '3 g'
        },
        manfaat: [
            'Sumber protein hewani lengkap',
            'Kaya zat besi untuk mencegah anemia',
            'Mengandung vitamin B12',
            'Mendukung pembentukan jaringan tubuh'
        ],
        olahanPopuler: [
            'Rendang',
            'Sate sapi',
            'Semur sapi',
            'Bakso sapi'
        ],
        funFact: 'Daging sapi mengandung vitamin B12 yang tidak ada di tumbuhan'
    },
    
    // ========== SAYURAN ==========
    {
        id: 'sayuran-intro',
        type: 'section-intro',
        title: 'Sayuran',
        subtitle: 'Sumber vitamin',
        description: 'Banyak variasi sayur di Indonesia diolah menajdi masakan rumahan yang lezat',
        icon: 'images/emojis/bayam.png',
        color: '#ef4444'
    },
    {
        id: 'jantung-pisang',
        type: 'item',
        kategori: 'sayuran',
        nama: 'Jantung Pisang',
        namaIlmiah: 'Musa sp.',
        image: '/images/items/jantung_pisang.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Jantung pisang adalah bunga dari tanaman pisang yang umum diolah menjadi sayuran kaya serat dan rendah kalori.',
        kandunganGizi: {
            kalori: '28 kkal',
            karbohidrat: '6.6 g',
            serat: '1.2 g',
            protein: '1.6 g'
        },
        manfaat: [
            'Membantu menjaga kesehatan pencernaan karena kaya serat',
            'Rendah kalori sehingga cocok untuk diet',
            'Mengandung antioksidan yang baik untuk tubuh'
        ],
        olahanPopuler: [
            'Gulai jantung pisang',
            'Tumis jantung pisang',
            'Pecel jantung pisang'
        ],
        funFact: 'Di beberapa daerah, jantung pisang dibuat sebagai pengganti daging dalam olahan rendang!'
    },
    {
        id: 'kangkung',
        type: 'item',
        kategori: 'sayuran',
        nama: 'Kangkung',
        namaIlmiah: 'Ipomoea aquatica',
        image: '/images/items/kangkung.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Kangkung adalah sayuran hijau yang mudah tumbuh dan kaya nutrisi.',
        kandunganGizi: {
            kalori: '19 kkal',
            protein: '3 g',
            serat: '2 g',
            vitaminA: 'Tinggi'
        },
        manfaat: [
            'Membantu menjaga kesehatan mata',
            'Mendukung fungsi pencernaan',
            'Mengandung antioksidan untuk daya tahan tubuh'
        ],
        olahanPopuler: [
            'Tumis kangkung',
            'Plecing kangkung',
            'Cah kangkung bawang putih'
        ],
        funFact: 'Kangkung bisa tumbuh di air (kangkung air) atau darat (kangkung darat)!'
    },
    {
        id: 'bayam',
        type: 'item',
        kategori: 'sayuran',
        nama: 'Bayam',
        namaIlmiah: 'Amaranthus',
        image: '/images/items/bayam.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Bayam adalah sayuran hijau yang kaya akan zat besi dan nutrisi penting.',
        kandunganGizi: {
            kalori: '23 kkal',
            protein: '2.9 g',
            serat: '2.2 g',
            vitaminA: 'Sangat tinggi'
        },
        manfaat: [
            'Membantu mencegah anemia karena kaya zat besi',
            'Mendukung kesehatan mata',
            'Baik untuk sistem imun'
        ],
        olahanPopuler: [
            'Sayur bening bayam',
            'Gado-gado',
            'Smoothie bayam'
        ],
        funFact: 'Bayam mengandung zat besi yang baik untuk mencegah anemia'
    },
    {
        id: 'kelor',
        type: 'item',
        kategori: 'sayuran',
        nama: 'Kelor',
        namaIlmiah: 'Moringa oleifera',
        image: '/images/items/kelor.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Daun kelor dikenal sebagai superfood karena kandungan nutrisinya yang sangat tinggi.',
        kandunganGizi: {
            kalori: '64 kkal',
            protein: '9.4 g',
            serat: '2 g',
            vitamin: 'Sangat tinggi'
        },
        manfaat: [
            'Meningkatkan energi dan metabolisme',
            'Menjaga imun tubuh',
            'Kaya antioksidan untuk melindungi sel'
        ],
        olahanPopuler: [
            'Sayur bening kelor',
            'Teh kelor',
            'Bubuk kelor untuk topping makanan'
        ],
        funFact: 'Kelor mengandung 7x vitamin C lebih banyak dari jeruk!'
    },
    {
        id: 'rebung',
        type: 'item',
        kategori: 'sayuran',
        nama: 'Rebung',
        namaIlmiah: 'Bambusa',
        image: '/images/items/rebung.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Rebung adalah tunas muda bambu yang bisa diolah menjadi berbagai masakan.',
        kandunganGizi: {
            kalori: '27 kkal',
            protein: '2.6 g',
            serat: '2.2 g'
        },
        manfaat: [
            'Tinggi serat untuk pencernaan',
            'Rendah kalori',
            'Mengandung fitokimia yang baik untuk tubuh'
        ],
        olahanPopuler: [
            'Sayur lodeh rebung',
            'Lumpia rebung',
        ],
        funFact: 'Rebung bisa tumbuh hingga 1 meter dalam sehari!'
    },
    {
        id: 'wortel',
        type: 'item',
        kategori: 'sayuran',
        nama: 'Wortel',
        namaIlmiah: 'Daucus carota',
        image: '/images/items/wortel.jpg',
        asal: 'Global',
        deskripsi: 'Wortel adalah sayuran umbi yang kaya vitamin A.',
        kandunganGizi: {
            kalori: '41 kkal',
            protein: '0.9 g',
            serat: '2.8 g',
      
        },
        manfaat: [
            'Baik untuk kesehatan mata',
            'Mengandung antioksidan beta-karoten',
            'Mendukung sistem imun'
        ],
        olahanPopuler: [
            'Sup sayur',
            'Orak-arik wortel',
        ],
        funFact: 'Wortel awalnya berwarna ungu, bukan oranye!'
    },
    
    // ========== BUAH ==========
    {
        id: 'buah-intro',
        type: 'section-intro',
        title: 'Buah',
        subtitle: 'Sumber vitamin',
        description: 'Buah bisa jadi dessert sehat setelah makan',
        icon: 'images/emojis/pepeya.png',
        color: '#ef4444'
    },
    {
        id: 'pisang',
        type: 'item',
        kategori: 'buah',
        nama: 'Pisang',
        namaIlmiah: 'Musa',
        image: '/images/items/pisang.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Pisang adalah buah tropis yang kaya akan kalium dan energi.',
        kandunganGizi: {
            kalori: '89 kkal',
            karbohidrat: '23 g',
            protein: '1.1 g',
      
        },
        manfaat: [
            'Menambah energi cepat',
            'Menjaga kesehatan pencernaan',
            'Baik untuk fungsi otot dan saraf'
        ],
        olahanPopuler: [
            'Pisang goreng',
            'Smoothie pisang',
        ],
        funFact: 'Indonesia punya lebih dari 1.000 varietas pisang!'
    },
    {
        id: 'pepaya',
        type: 'item',
        kategori: 'buah',
        nama: 'Pepaya',
        namaIlmiah: 'Carica papaya',
        image: '/images/items/pepaya.jpg',
        asal: 'Seluruh Indonesia',
        deskripsi: 'Pepaya adalah buah tropis yang kaya akan vitamin C dan enzim papain.',
        kandunganGizi: {
            kalori: '89 kkal',
            karbohidrat: '23 g',
            protein: '1.1 g',
      
        },
        manfaat: [
            'Melancarkan pencernaan',
            'Tinggi vitamin C untuk imun',
            'Baik untuk kesehatan kulit'
        ],
        olahanPopuler: [
            'Rujak pepaya',
            'Jus pepaya',
        ],
        funFact: 'Pepaya mengandung enzim papain yang membantu mencerna protein'
    },
    {
        id: 'apel',
        type: 'item',
        kategori: 'buah',
        nama: 'Apel',
        namaIlmiah: 'Malus domestica',
        image: '/images/items/apel.jpg',
        asal: 'Global',
        deskripsi: 'Apel adalah buah yang kaya akan serat dan antioksidan.',
        kandunganGizi: {
            kalori: '52 kkal',
            karbohidrat: '14 g',
            serat: '2.4 g'
      
        },
        manfaat: [
            'Tinggi serat, baik untuk usus',
            'Membantu menjaga gula darah stabil',
            'Kaya antioksidan'
        ],
        olahanPopuler: [
            'Apel potong',
            'Salad buah',
        ],
        funFact: 'Ada lebih dari 7.500 varietas apel di dunia!'
    },

    
    
    // Back cover
    {
        id: 'back-cover',
        type: 'back-cover',
        message: 'Mari lestarikan dan konsumsi pangan lokal Indonesia! 🇮🇩',
        qr: '/images/qr-panganmu.png'
    }
];

export function getPagesByCategory(category) {
    return katalogPages.filter(page=> page.kategori === category && page.type === 'item');
}

export function searchPages(query){
    const lowerQuery = query.toLowerCase();
    return katalogPages.filter(page=>
        page.nama?.toLowerCase().includes(lowerQuery) ||
        page.deskripsi?.toLowerCase().includes(lowerQuery)||
        page.kategori?.toLowerCase().includes(lowerQuery)
    );
}
