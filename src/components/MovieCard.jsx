import { Link } from "react-router-dom";

export default function MovieCard({ id, title, year, poster }) {
  return (
    <Link 
      to={`/movie/${id}`} 
      className="block w-48 transform hover:scale-105 transition-all duration-300 group"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-pink-100 h-full flex flex-col">
        {/* Poster Container with Gradient Overlay */}
        <div className="relative overflow-hidden">
          <img 
            src={poster} 
            alt={title} 
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* View Details Indicator */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200 text-center">
            {title}
          </h3>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
              {year}
            </span>
            
            {/* Animated Arrow */}
            <div className="text-pink-400 group-hover:text-pink-600 transform group-hover:translate-x-1 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="h-1 bg-gradient-to-r from-pink-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
}

