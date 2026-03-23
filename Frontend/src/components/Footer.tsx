import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            <div className="flex items-center w-max bg-white rounded-xl px-4 py-2">
              <img src="/logo.png" alt="Bayrak Emlak" className="w-[180px] object-contain" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Gayrimenkul sektöründe kalite ve güvenin adresi. Aradığınız evi bulmak veya gayrimenkulünüzü değerinde satmak için doğru yerdesiniz.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide">Hızlı Erişim</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Hizmetlerimiz</Link></li>
              <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Tüm İlanlar</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="text-sm text-slate-400 leading-relaxed">
                  Akçaali Mah. 29 Ekim Cad.<br/>Bayrak İş hanı Bayrak Emlak<br/>Gönen / Balıkesir
                </span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="tel:05387707211" className="text-sm text-slate-400 hover:text-white transition-colors">+90 538 770 72 11</a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href="mailto:asilbayrak@hotmail.com" className="text-sm text-slate-400 hover:text-white transition-colors">asilbayrak@hotmail.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Google Maps */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide">Konum</h3>
            <div className="rounded-xl overflow-hidden" style={{ border: 'none' }}>
              <iframe
                title="Bayrak Emlak Konum"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1522!2d27.651663!3d40.105183!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA2JzE4LjciTiAyN8KwMzknMDYuMCJF!5e0!3m2!1str!2str"
                width="100%"
                height="180"
                style={{ border: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Bayrak Emlak. Tüm hakları saklıdır.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
