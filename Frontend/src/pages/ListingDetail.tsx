import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i === images.length - 1 ? 0 : i + 1));
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i === 0 ? images.length - 1 : i - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/listings/${id}`)
      .then(res => {
        setListing(res.data);
        if (res.data?.imageUrls) setActiveImage(res.data.imageUrls.split(',')[0]);
        setLoading(false);
      })
      .catch(() => {
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

        const found = mockListings.find(l => l.id === Number(id));

        if (found) {
          setListing({
            ...found,
            description: 'Şehrin en prestijli bölgesinde, özel mimari tasarım ile geniş ve ferah yaşam alanları sunar.',
            buildingAge: 3, floor: 5,
            contactInfo: 'Asım İlhan Bayrak - 0538 770 72 11',
            mapCoordinates: '41.0422,29.0083',
            properties: 'Otopark,Güvenlik,Balkon',
            imageUrls: found.imageUrl,
          });
          setActiveImage(found.imageUrl);
        } else {
          setListing({
            id, title: 'Premium Dubleks Daire',
            description: 'Şehrin en prestijli bölgesinde, tamamen yenilenmiş modern dubleks. Özel mimari tasarım ile geniş ve ferah yaşam alanları sunar.',
            price: 4500000, roomCount: '4+1', squareMeters: 180, buildingAge: 3, floor: 5,
            contactInfo: 'Asım İlhan Bayrak - 0538 770 72 11',
            mapCoordinates: '41.0422,29.0083',
            properties: 'Yüzme Havuzu,Akıllı Ev,Güvenlik,Kapalı Otopark,Jeneratör,Balkon',
            imageUrls: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200,https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200,https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
          });
          setActiveImage('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200');
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-[#eef2f7]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  if (!listing) return <div className="text-center py-20 text-xl font-medium text-gray-500">İlan bulunamadı!</div>;

  let images = listing.imageUrls?.split(',') || [];
  if (images.length === 1 && images[0] !== '') {
    // Kategoriye göre ilgili görseller
    if (listing.category === 'Arsa') {
      images = [images[0],
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200',
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200',
      ];
    } else if (listing.category === 'Büro') {
      images = [images[0],
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200',
      ];
    } else {
      images = [images[0],
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      ];
    }
  }
  const features = listing.properties?.split(',').map((f: string) => f.trim()).filter(Boolean) || [];

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    const ci = images.indexOf(activeImage);
    if (dist > 50) setActiveImage(images[ci === images.length - 1 ? 0 : ci + 1]);
    else if (dist < -50) setActiveImage(images[ci === 0 ? images.length - 1 : ci - 1]);
    setTouchStart(0); setTouchEnd(0);
  };

  const ci = images.indexOf(activeImage);

  return (
    <div className="bg-[#f0f4f8] min-h-screen pb-20">
      <div className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3560] to-[#1e4080] py-6 px-4 sm:px-6 lg:px-8 border-b border-white/10 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center text-sm text-blue-200 hover:text-white transition-colors font-medium">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tüm İlanlara Dön
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title + Price Header (Aligned with content) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest">
                Satılık
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1.5 font-medium">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {listing.location || 'Gönen / Balıkesir'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f1f3d] leading-tight tracking-tight">
              {listing.title}
            </h1>
          </div>
          <div className="flex flex-col lg:items-end flex-shrink-0">
            <p className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-widest">İLAN FİYATI</p>
            <p className="text-4xl sm:text-5xl font-black text-blue-600">
              ₺{listing.price.toLocaleString('tr-TR')}
            </p>
          </div>
        </div>
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — Gallery + Content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Gallery Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden ring-1 ring-black/5">
              <div
                className="relative bg-slate-100"
                style={{ aspectRatio: '16/9' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={activeImage}
                  alt={listing.title}
                  className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-700"
                  onClick={() => { setLightboxIndex(ci); setLightboxOpen(true); }}
                />
                {/* Image Nav Overlay */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage(images[ci === 0 ? images.length - 1 : ci - 1])}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white text-[#0f1f3d] rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={() => setActiveImage(images[ci === images.length - 1 ? 0 : ci + 1])}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white text-[#0f1f3d] rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full font-bold tracking-tight">
                      {ci + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 p-4 overflow-x-auto bg-slate-50/50">
                  {images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        activeImage === img ? 'border-blue-500 scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover pointer-events-none" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 ring-1 ring-black/5">
              <h2 className="text-xl font-bold text-[#0f1f3d] mb-5 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                İlan Açıklaması
              </h2>
              <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line px-1">
                {listing.description}
              </p>

              {features.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h2 className="text-xl font-bold text-[#0f1f3d] mb-5 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                    Mülk Özellikleri
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {features.map((f: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-blue-50/50 text-[#1a3560] text-sm font-bold px-4 py-3 rounded-2xl border border-blue-100/50 transition-colors hover:bg-blue-50">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Listing Details Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-6 ring-1 ring-black/5">
              <h3 className="text-lg font-bold text-[#0f1f3d] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                Genel Bilgiler
              </h3>
              <div className="space-y-1">
                {[
                  { label: 'İlan No', value: `#${listing.id}` },
                  { label: 'İlan Tipi', value: listing.category === 'Arsa' ? 'Arsa' : listing.category === 'Büro' ? 'Büro' : 'Konut' },
                  ...(listing.category === 'Arsa' ? [
                    { label: 'Arsa Tipi', value: listing.landType },
                    { label: 'Tapu Durumu', value: listing.deedStatus },
                    { label: 'İlgili Belediye', value: listing.municipality },
                    { label: 'Takas', value: listing.trade },
                  ] : [
                    { label: 'Oda Sayısı', value: listing.roomCount },
                    { label: 'Bina Yaşı', value: `${listing.buildingAge ?? 0} Yıl` },
                    { label: 'Kat', value: `${listing.floor}. Kat` },
                  ]),
                  { label: 'Net Alan', value: `${listing.squareMeters} m²` },
                  { label: 'm² Birim', value: listing.unitPrice ? `₺${Number(listing.unitPrice).toLocaleString('tr-TR')}` : (listing.squareMeters ? `₺${Math.round(listing.price / listing.squareMeters).toLocaleString('tr-TR')}` : '-') },
                  ...(listing.category === 'Arsa' ? [{ label: 'Yetkili Ofis', value: listing.authorizedOffice }] : []),
                ].map((row, i, arr) => (
                  <div key={i} className={`flex justify-between items-center py-3.5 ${i < arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
                    <span className="text-slate-500 font-medium">{row.label}</span>
                    <span className="font-bold text-[#0f1f3d]">{row.value || '-'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-[#0f1f3d] rounded-3xl shadow-xl shadow-blue-900/10 p-7 text-white ring-1 ring-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-1 flex-shrink-0 shadow-lg transition-transform duration-300">
                  <img src="/logo.png" alt="Bayrak Emlak" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <p className="font-black text-xl tracking-tight">Asım İlhan Bayrak</p>
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mt-0.5">Emlak Danışmanı</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:05387707211"
                  className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Şimdi Ara
                </a>
                <a
                  href="https://wa.me/905387707211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.913l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.287 0-4.4-.763-6.098-2.048l-.424-.322-2.645.887.887-2.645-.322-.424C2.063 16.15 1.3 14.037 1.3 11.75 2 6.149 6.149 2 12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10z" /></svg>
                  WhatsApp Mesajı
                </a>
              </div>
            </div>

            {/* Map Card */}
            {listing.mapCoordinates && (
              <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-6 ring-1 ring-black/5">
                <h3 className="text-lg font-bold text-[#0f1f3d] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                  Konum
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-inner bg-slate-100 ring-1 ring-black/5" style={{ aspectRatio: '1.2' }}>
                  <iframe
                    title="Google Maps"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${listing.mapCoordinates}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center gap-2 mt-4 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Balıkesir, Gönen
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 z-50 shadow-2xl active:scale-90"
            onClick={() => setLightboxOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <button
            className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 z-50 shadow-2xl active:scale-90"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i === 0 ? images.length - 1 : i - 1)); }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="relative group max-h-screen">
            <img
              src={images[lightboxIndex]}
              alt={listing.title}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white/50 text-sm font-black tracking-widest uppercase">
              <span>FOTO {lightboxIndex + 1}</span>
              <span className="w-10 h-[1px] bg-white/20"></span>
              <span>TOPLAM {images.length}</span>
            </div>
          </div>
          
          <button
            className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 z-50 shadow-2xl active:scale-90"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i === images.length - 1 ? 0 : i + 1)); }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
