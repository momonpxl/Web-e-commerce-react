const products = [
  {
    id: 1,
    name: "Netflix Premium 1 Tahun",
    description: "Akun Netflix Premium dengan akses 4 screen, UHD quality, semua region.",
    price: 249000,
    originalPrice: 399000,
    category: "Streaming",
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    details: {
      duration: "1 Tahun",
      screens: "4 Screens",
      quality: "UHD 4K",
      regions: "Seluruh Dunia",
      features: ["Tanpa Iklan", "Download Offline", "Profil Terpisah"]
    }
  },
  {
    id: 2,
    name: "Spotify Family 6 Bulan",
    description: "Paket Spotify Family untuk 6 akun premium selama 6 bulan.",
    price: 179000,
    originalPrice: 299000,
    category: "Music",
    rating: 4.7,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1611339555312-e607c8832ab0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    details: {
      duration: "6 Bulan",
      accounts: "6 Akun",
      quality: "Extreme Quality",
      features: ["Download Offline", "Tanpa Iklan", "Mode Campuran"]
    }
  },
  {
    id: 3,
    name: "YouTube Premium 1 Tahun",
    description: "YouTube Premium dengan YouTube Music, background play, dan download.",
    price: 299000,
    originalPrice: 499000,
    category: "Streaming",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    details: {
      duration: "1 Tahun",
      includes: "YouTube Music Premium",
      features: ["Background Play", "Download Video", "Tanpa Iklan", "Original Content"]
    }
  },
  {
    id: 4,
    name: "Canva Pro Lifetime",
    description: "Akun Canva Pro seumur hidup dengan semua fitur premium.",
    price: 499000,
    originalPrice: 899000,
    category: "Design",
    rating: 4.9,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    details: {
      type: "Lifetime",
      templates: "Semua Template Pro",
      features: ["Background Remover", "Magic Resize", "Brand Kit", "100GB Storage"]
    }
  },
  {
    id: 5,
    name: "Adobe Creative Cloud 6 Bulan",
    description: "Paket lengkap Adobe CC termasuk Photoshop, Premiere, After Effects.",
    price: 399000,
    originalPrice: 699000,
    category: "Design",
    rating: 4.6,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    details: {
      duration: "6 Bulan",
      apps: "Semua Apps Adobe",
      storage: "100GB Cloud",
      features: ["Update Terbaru", "Support 24/7", "Team Library"]
    }
  },
  {
    id: 6,
    name: "Microsoft 365 Family 1 Tahun",
    description: "Microsoft 365 untuk 6 user dengan 1TB OneDrive each.",
    price: 349000,
    originalPrice: 599000,
    category: "Office",
    rating: 4.4,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    details: {
      duration: "1 Tahun",
      users: "6 Pengguna",
      storage: "6TB Total (1TB/user)",
      apps: ["Word", "Excel", "PowerPoint", "Outlook"],
      features: ["Premium Templates", "Editor AI", "Family Safety"]
    }
  }
];

export default products;