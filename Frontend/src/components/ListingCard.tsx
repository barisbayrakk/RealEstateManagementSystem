import { Link } from 'react-router-dom';

interface ListingProps {
  id: number;
  title: string;
  price: number;
  roomCount: string;
  squareMeters: number;
  imageUrl: string;
  location: string;
  category?: string;
  landType?: string;
}

export default function ListingCard({ id, title, price, roomCount, squareMeters, imageUrl, location, category, landType }: ListingProps) {
  return (
    <Link to={`/listing/${id}`} className="block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${category === 'Arsa' ? 'bg-green-500/90 text-white' : category === 'Büro' ? 'bg-yellow-500/90 text-white' : 'bg-blue-600/90 text-white'}`}>
          {category === 'Arsa' ? 'Arsa' : category === 'Büro' ? 'Büro' : 'Konut'}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {location}
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 text-sm text-gray-600 font-medium">
            {category === 'Arsa' ? (
              <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>{landType || 'Arsa'}</span>
            ) : category === 'Büro' ? (
              <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>{roomCount} Oda</span>
            ) : (
              <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>{roomCount} Oda</span>
            )}
            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>{squareMeters} m²</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">₺{price.toLocaleString('tr-TR')}</span>
          <span className="text-blue-600 hover:text-blue-800 font-semibold group-hover:translate-x-1 transition-transform">
            İncele →
          </span>
        </div>
      </div>
    </Link>
  );
}
