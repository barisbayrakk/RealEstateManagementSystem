import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white px-2 py-4 sm:px-4 lg:px-8 border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Bayrak Emlak Logo" 
              className="h-16 sm:h-20 w-auto object-contain hover:opacity-90 transition-opacity mix-blend-multiply" 
            />
          </Link>
        </div>
        
        {/* Right side: Navigation Links */}
        <div className="flex items-center space-x-6 sm:space-x-12">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base">Ana Sayfa</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base">Hakkımızda</Link>
          <button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="text-gray-700 hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base"
          >
            İletişim
          </button>
          <Link to="/admin" className="px-5 py-2.5 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-sm text-sm sm:text-base">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
