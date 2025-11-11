import { MapPin, Star, IndianRupee, Navigation2, Wrench, Zap, Car, Droplet, User, Wallet } from 'lucide-react';

interface ServicesPageProps {
  onProfileClick: () => void;
  onWalletClick: () => void;
}

export function ServicesPage({ onProfileClick, onWalletClick }: ServicesPageProps) {
  const services = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      type: 'Plumber',
      icon: Droplet,
      rating: 4.8,
      distance: '1.2 km',
      price: '₹300/hr',
      lat: 40,
      lng: 40
    },
    {
      id: 2,
      name: 'Amit Singh',
      type: 'Electrician',
      icon: Zap,
      rating: 4.9,
      distance: '0.8 km',
      price: '₹350/hr',
      lat: 45,
      lng: 50
    },
    {
      id: 3,
      name: 'Vijay Sharma',
      type: 'Mechanic',
      icon: Car,
      rating: 4.7,
      distance: '2.1 km',
      price: '₹400/hr',
      lat: 55,
      lng: 35
    },
    {
      id: 4,
      name: 'Suresh Patel',
      type: 'Technician',
      icon: Wrench,
      rating: 4.6,
      distance: '1.5 km',
      price: '₹320/hr',
      lat: 30,
      lng: 60
    }
  ];

  const categories = ['All', 'Plumber', 'Electrician', 'Mechanic', 'Technician'];

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl mb-1">Services</h1>
          <p className="text-gray-400 text-sm">Find nearby service providers</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onWalletClick}
            className="bg-[#141A2A] p-2.5 rounded-full border border-[#1f2937] hover:border-[#007BFF] transition-all"
          >
            <Wallet className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={onProfileClick}
            className="bg-[#141A2A] p-2.5 rounded-full border border-[#1f2937] hover:border-[#007BFF] transition-all"
          >
            <User className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                category === 'All'
                  ? 'bg-[#007BFF] text-white'
                  : 'bg-[#141A2A] text-gray-400 border border-[#1f2937]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="mx-5 mb-4 bg-[#141A2A] rounded-xl overflow-hidden border border-[#1f2937] relative h-64">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] to-[#141A2A]">
          {/* Grid pattern for map effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border border-[#1f2937]"></div>
              ))}
            </div>
          </div>
          
          {/* Service provider pins */}
          {services.map((service) => (
            <div
              key={service.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${service.lng}%`, top: `${service.lat}%` }}
            >
              <div className="relative group">
                <div className="bg-[#007BFF] p-2 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                  <service.icon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#141A2A] px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#007BFF]">
                  {service.type}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My Location Button */}
        <button className="absolute bottom-4 right-4 bg-white text-[#007BFF] p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <Navigation2 className="w-5 h-5" />
        </button>
      </div>

      {/* Service Cards */}
      <div className="flex-1 px-5 pb-24 overflow-y-auto">
        <h2 className="text-lg mb-3">Available Services</h2>
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="bg-[#007BFF]/10 p-3 rounded-lg">
                  <service.icon className="w-6 h-6 text-[#007BFF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">{service.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{service.type}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{service.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{service.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#007BFF]">
                      <IndianRupee className="w-4 h-4" />
                      <span>{service.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Service Button */}
      <div className="absolute bottom-20 left-0 right-0 px-5">
        <button className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          Request Service
        </button>
      </div>
    </div>
  );
}