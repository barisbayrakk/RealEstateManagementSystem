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
    images = [images[0],
      'https://images.unsplash.com/photo-1600566753086-00f18efc2007?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
    ];
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tüm İlanlara Dön
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title + Badge Row */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Satılık</span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Gönen / Balıkesir
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1f3d] leading-tight">{listing.title}</h1>
          <p className="text-2xl font-bold text-blue-600 mt-2">₺{listing.price.toLocaleString('tr-TR')}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — Gallery */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Main Image */}
            <div
              className="relative rounded-2xl overflow-hidden bg-slate-200 shadow-sm"
              style={{ aspectRatio: '16/9' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={activeImage}
                alt={listing.title}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => { setLightboxIndex(ci); setLightboxOpen(true); }}
              />
              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(images[ci === 0 ? images.length - 1 : ci - 1])}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow flex items-center justify-center transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={() => setActiveImage(images[ci === images.length - 1 ? 0 : ci + 1])}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow flex items-center justify-center transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                  </button>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {ci + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-blue-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover pointer-events-none" />
                  </button>
                ))}
              </div>
            )}

            {/* Description + Features */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-bold text-[#0f1f3d] mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full inline-block"></span>
                Açıklama
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{listing.description}</p>

              {features.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h2 className="text-base font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-blue-600 rounded-full inline-block"></span>
                    Özellikler
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Details + Contact + Map */}
          <div className="flex flex-col gap-4">

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full inline-block"></span>
                İlan Detayları
              </h3>
              <div className="space-y-0 text-sm">
                {[
                  { label: 'İlan No', value: `#${listing.id}` },
                  { label: 'Oda Sayısı', value: listing.roomCount },
                  { label: 'Alan', value: `${listing.squareMeters} m²` },
                  { label: 'Bina Yaşı', value: `${listing.buildingAge ?? 0} Yıl` },
                  { label: 'Bulunduğu Kat', value: `${listing.floor}. Kat` },
                  { label: 'm² Birim Fiyat', value: listing.squareMeters ? `₺${Math.round(listing.price / listing.squareMeters).toLocaleString('tr-TR')}` : '-' },
                ].map((row, i, arr) => (
                  <div key={i} className={`flex justify-between items-center py-2.5 ${i < arr.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-semibold text-[#0f1f3d]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#eef2f7] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src="/logo.png" alt="Bayrak Emlak" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <p className="font-bold text-[#0f1f3d] text-base leading-tight">Asım İlhan Bayrak</p>
                  <p className="text-slate-400 text-xs mt-0.5">Emlak Danışmanı</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:05387707211"
                  className="flex items-center justify-center gap-2 w-full bg-[#0f1f3d] hover:bg-[#1a3560] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Ara
                </a>
                <a
                  href="https://wa.me/905387707211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.913l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.287 0-4.4-.763-6.098-2.048l-.424-.322-2.645.887.887-2.645-.322-.424C2.063 16.15 1.3 14.037 1.3 11.75 2 6.149 6.149 2 12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10z" /></svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Map */}
            {listing.mapCoordinates && (
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="text-sm font-bold text-[#0f1f3d] mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-600 rounded-full inline-block"></span>
                  Konum
                </h3>
                <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '1' }}>
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
                <div className="flex items-center gap-1.5 mt-3 text-slate-400 text-xs">
                  <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Gönen / Balıkesir
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-50"
            onClick={() => setLightboxOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-50"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i === 0 ? images.length - 1 : i - 1)); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <img
            src={images[lightboxIndex]}
            alt={listing.title}
            className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-50"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i === images.length - 1 ? 0 : i + 1)); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-white/10 px-4 py-1.5 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
