import { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockListings = [
      { id: 1, title: 'Deniz Manzaralı Lüks Daire', price: 3500000, roomCount: '3+1', squareMeters: 120, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', location: 'Kadıköy, İstanbul', category: 'Ev' },
      { id: 2, title: 'Merkezi Konumda Ofis', price: 1200000, roomCount: '1+0', squareMeters: 65, imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', location: 'Şişli, İstanbul', category: 'Büro' },
      { id: 3, title: 'Bahçeli Müstakil Ev', price: 5500000, roomCount: '4+1', squareMeters: 200, imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', location: 'Beykoz, İstanbul', category: 'Ev' },
      { id: 4, title: 'Lüks Rezidans', price: 6500000, roomCount: '2+1', squareMeters: 100, imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', location: 'Beşiktaş, İstanbul', category: 'Ev' },
      { id: 5, title: 'Şehir Merkezinde Arsa', price: 2800000, roomCount: '0', squareMeters: 500, imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', location: 'Bakırköy, İstanbul', category: 'Arsa', landType: 'İmarlı' },
      { id: 6, title: 'Manzaralı Çatı Katı', price: 4200000, roomCount: '3+1', squareMeters: 140, imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', location: 'Üsküdar, İstanbul', category: 'Ev' },
      { id: 7, title: 'Site İçerisinde Aile Evi', price: 3100000, roomCount: '3+1', squareMeters: 130, imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', location: 'Ataşehir, İstanbul', category: 'Ev' },
      { id: 8, title: 'Modern Tasarımlı Stüdyo', price: 1500000, roomCount: '1+0', squareMeters: 55, imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800', location: 'Kadıköy, İstanbul', category: 'Ev' },
      { id: 9, title: 'Tarım Arazisi', price: 1800000, roomCount: '0', squareMeters: 2000, imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800', location: 'Silivri, İstanbul', category: 'Arsa', landType: 'Tarla' }
    ];

    // API endpoint'ini çağırıyoruz
    axios.get('http://localhost:5000/api/listings')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setListings(res.data);
        } else {
          setListings(mockListings as any);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("İlanlar yüklenirken hata oluştu", err);
        setLoading(false);
        // Hata durumunda mock verilerle gösterim yapmak için (opsiyonel)
        setListings(mockListings as any);
      });
  }, []);

  return (
    <div className="bg-[#eef2f7]">
      {/* Hero Section */}
      <div className="relative bg-gray-900 border-b border-gray-100">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Modern home exterior" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl drop-shadow-md">
            Gönen Bayrak Emlak <span className="text-blue-400"></span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-2xl drop-shadow">
            Yılların getirdiği tecrübe ile gayrimenkul sektöründe güvenilir çözüm ortağınız.
          </p>
          <div className="mt-10 flex space-x-4">
            <button
              onClick={() => document.getElementById('ilanlar')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 border border-transparent rounded-lg text-lg font-semibold text-white hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
            >
              İlanları Keşfet
            </button>

          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div id="ilanlar" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-100 pb-6 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Öne Çıkan İlanlar</h2>
            <p className="mt-2 text-lg text-gray-500">Sizin için seçtiğimiz en özel fırsatlar</p>
          </div>
          
          <div className="flex flex-col items-start md:items-end">
            <label className="text-sm font-bold text-gray-400 uppercase mb-2 ml-1">Kategori Filtrele</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm cursor-pointer min-w-[200px]"
            >
              <option value="Tümü">Tümü</option>
              <option value="Ev">Ev</option>
              <option value="Arsa">Arsa</option>
              <option value="Büro">Büro</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-default">
            {listings
              .filter((l: any) => selectedCategory === 'Tümü' || l.category === selectedCategory)
              .map((listing: any) => (
              <ListingCard 
                key={listing.id}
                id={listing.id}
                title={listing.title}
                price={listing.price}
                roomCount={listing.roomCount}
                squareMeters={listing.squareMeters}
                imageUrl={listing.imageUrls?.split(',')[0] || listing.imageUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'}
                location={listing.location || 'Gönen / Balıkesir'}
                category={listing.category}
                landType={listing.landType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
