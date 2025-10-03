import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg relative">
      {/* Decorative wave at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-4 text-white"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="currentColor"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="currentColor"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎬</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-sm">
                MovieFlix
              </h1>
              <p className="text-pink-100 text-xs font-medium -mt-1">
                Your girly movie guide
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                to="/" 
                className={`relative px-4 py-2 rounded-full font-semibold transition-all duration-300 group ${
                  isActive("/") 
                    ? "bg-white text-pink-500 shadow-lg" 
                    : "text-white hover:bg-white/20 hover:backdrop-blur-sm"
                }`}
              >
                Home
                {!isActive("/") && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                )}
              </Link>
            </li>
            
            <li>
              <Link 
                to="/movies" 
                className={`relative px-4 py-2 rounded-full font-semibold transition-all duration-300 group ${
                  isActive("/movies") 
                    ? "bg-white text-pink-500 shadow-lg" 
                    : "text-white hover:bg-white/20 hover:backdrop-blur-sm"
                }`}
              >
                Movies
                {!isActive("/movies") && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                )}
              </Link>
            </li>
            
            <li>
              <Link 
                to="/login" 
                className="relative px-6 py-2 bg-white/90 text-pink-500 rounded-full font-semibold hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
              >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-2 left-1/4 w-3 h-3 bg-pink-200 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-4 right-1/3 w-2 h-2 bg-purple-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
    </nav>
  );
}

