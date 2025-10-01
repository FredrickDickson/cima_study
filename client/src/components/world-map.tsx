import worldMapImage from "@assets/istockphoto-1197369584-612x612_1757102993890.jpg";

export default function WorldMap() {
  const locations = [
    { id: 'london', name: 'London', x: 47.0, y: 36.4, color: 'bg-accent' },
    { id: 'newyork', name: 'New York', x: 24.2, y: 42.6, color: 'bg-primary' },
    { id: 'accra', name: 'Accra', x: 46.6, y: 59.0, color: 'bg-secondary' },
    { id: 'dubai', name: 'Dubai', x: 62.0, y: 50.2, color: 'bg-accent' },
    { id: 'singapore', name: 'Singapore', x: 78.4, y: 63.0, color: 'bg-primary' }
  ];

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg" data-testid="world-map">
      {/* World Map Image */}
      <img 
        src={worldMapImage} 
        alt="World map showing global CIMA locations" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Light overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>

      {/* Location Dots */}
      {locations.map((location, index) => (
        <div
          key={location.id}
          className={`absolute w-4 h-4 ${location.color} rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-pulse z-10`}
          style={{ 
            left: `${location.x}%`, 
            top: `${location.y}%`,
            animationDelay: `${index * 0.8}s`
          }}
          data-testid={`location-dot-${location.id}`}
        >
          {/* Ripple effect */}
          <div className={`absolute inset-0 ${location.color} rounded-full animate-ping opacity-40`}></div>
          
          {/* Location label */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-semibold text-gray-800 bg-white/90 px-2 py-1 rounded backdrop-blur-sm shadow-lg border">
              {location.name}
            </span>
          </div>
        </div>
      ))}

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-5" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.8)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        
        {/* Connection paths */}
        <g stroke="url(#connectionGradient)" strokeWidth="0.3" fill="none" className="opacity-70">
          <path d="M47 36.4 Q35.6 39.5 24.2 42.6" className="animate-pulse" style={{animationDelay: '2s', animationDuration: '3s'}} />
          <path d="M24.2 42.6 Q35.4 50.8 46.6 59" className="animate-pulse" style={{animationDelay: '2.5s', animationDuration: '3s'}} />
          <path d="M46.6 59 Q54.3 54.6 62 50.2" className="animate-pulse" style={{animationDelay: '3s', animationDuration: '3s'}} />
          <path d="M62 50.2 Q70.2 56.6 78.4 63" className="animate-pulse" style={{animationDelay: '3.5s', animationDuration: '3s'}} />
          <path d="M78.4 63 Q62.5 49.8 47 36.4" className="animate-pulse" style={{animationDelay: '4s', animationDuration: '3s'}} />
        </g>
      </svg>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 via-transparent to-gray-100/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-200/10 via-transparent to-gray-100/5 pointer-events-none"></div>
    </div>
  );
}