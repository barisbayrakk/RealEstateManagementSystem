import { useState, useEffect } from 'react';
import axios from 'axios';

export default function About() {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/about')
      .then(res => setInfo(res.data))
      .catch(err => {
        console.error("Hakkımızda bilgisi çekilemedi", err);
        setInfo({
          description: "20 yılı aşkın süredir emlak sektöründe faaliyet gösteren ofisimiz, müşteri memnuniyetini her zaman ön planda tutarak şeffaf, dürüst ve güvenilir hizmet vermeyi amaçlamaktadır. Gayrimenkul alım, satım ve kiralama süreçlerinizde size en iyi şekilde rehberlik ediyoruz.",
          yearsInBusiness: 20,
          officeImages: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800,https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
        });
      });
  }, []);

  if (!info) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  const images = ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"];

  return (
    <div className="bg-[#eef2f7] min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3560] to-[#1e4080] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl drop-shadow-md">Hakkımızda</h1>
          <p className="mt-4 text-xl text-blue-200 max-w-3xl mx-auto">
            Yılların getirdiği tecrübe ile gayrimenkul sektöründe güvenilir çözüm ortağınız.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-2">Bayrak Emlak</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
              {info.description?.replace('Modern Emlak', 'Bayrak Emlak')}
            </p>
            
            <div className="grid grid-cols-2 gap-8 mt-4 pt-4 mb-10">
              <div>
                <div className="text-5xl font-extrabold text-blue-600 mb-2">{info.yearsInBusiness}+</div>
                <div className="text-lg font-medium text-gray-500">Yıllık Tecrübe</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-blue-600 mb-2">500+</div>
                <div className="text-lg font-medium text-gray-500">Mutlu Müşteri</div>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div className="space-y-6 mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-2xl font-bold text-gray-900">İletişim</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm uppercase font-semibold">Adres</p>
                    <p className="text-gray-700 font-medium">Akçaali Mah. 29 Ekim Cad.<br />Bayrak İş hanı Bayrak Emlak<br />Gönen / Balıkesir</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm uppercase font-semibold">Telefon</p>
                    <p className="text-gray-700 font-medium">+90 538 770 72 11</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {images.map((img: string, idx: number) => (
              <div key={idx} className="rounded-2xl overflow-hidden">
                <img src={img} alt={`Office ${idx}`} className="w-full h-auto hover:scale-105 transition-transform duration-500 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
