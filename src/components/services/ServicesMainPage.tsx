import { Search, MapPin, Filter, Wrench, Zap, Droplet, Home, Car, Paintbrush, Scissors, Camera, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface ServicesMainPageProps {
  onServiceSelect: (service: string, subServices: any[]) => void;
  onBack?: () => void;
}

export function ServicesMainPage({ onServiceSelect, onBack }: ServicesMainPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = ['Top Rated', 'Nearby', 'Budget Friendly', 'Fast Service', 'Verified'];

  const serviceCategories = [
    {
      id: 'plumber',
      name: 'Plumber',
      icon: <Droplet className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-700',
      count: 45,
      subServices: [
        { id: 'tap-repair', name: 'Tap Repair', icon: '🚰', basePrice: 150 },
        { id: 'pipe-fitting', name: 'Pipe Fitting', icon: '🔧', basePrice: 300 },
        { id: 'tank-cleaning', name: 'Tank Cleaning', icon: '💧', basePrice: 500 },
        { id: 'bathroom-fitting', name: 'Bathroom Fitting', icon: '🚿', basePrice: 800 },
        { id: 'drainage-cleaning', name: 'Drainage Cleaning', icon: '🔩', basePrice: 400 },
        { id: 'leak-repair', name: 'Leak Repair', icon: '💦', basePrice: 250 }
      ]
    },
    {
      id: 'electrician',
      name: 'Electrician',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600',
      count: 38,
      subServices: [
        { id: 'wiring-repair', name: 'Wiring Repair', icon: '⚡', basePrice: 300 },
        { id: 'switch-installation', name: 'Switch Installation', icon: '🔌', basePrice: 150 },
        { id: 'fan-installation', name: 'Fan Installation', icon: '🌀', basePrice: 200 },
        { id: 'light-fitting', name: 'Light Fitting', icon: '💡', basePrice: 180 },
        { id: 'ac-installation', name: 'AC Installation', icon: '❄️', basePrice: 800 },
        { id: 'mcb-repair', name: 'MCB Repair', icon: '🔋', basePrice: 250 }
      ]
    },
    {
      id: 'carpenter',
      name: 'Carpenter',
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-amber-600 to-amber-800',
      count: 32,
      subServices: [
        { id: 'furniture-repair', name: 'Furniture Repair', icon: '🪑', basePrice: 400 },
        { id: 'door-fitting', name: 'Door Fitting', icon: '🚪', basePrice: 600 },
        { id: 'cabinet-making', name: 'Cabinet Making', icon: '🗄️', basePrice: 1500 },
        { id: 'bed-repair', name: 'Bed Repair', icon: '🛏️', basePrice: 500 },
        { id: 'window-repair', name: 'Window Repair', icon: '🪟', basePrice: 350 },
        { id: 'custom-furniture', name: 'Custom Furniture', icon: '🔨', basePrice: 2000 }
      ]
    },
    {
      id: 'painter',
      name: 'Painter',
      icon: <Paintbrush className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-700',
      count: 28,
      subServices: [
        { id: 'wall-painting', name: 'Wall Painting', icon: '🎨', basePrice: 800 },
        { id: 'exterior-painting', name: 'Exterior Painting', icon: '🏠', basePrice: 1500 },
        { id: 'texture-painting', name: 'Texture Painting', icon: '✨', basePrice: 1200 },
        { id: 'waterproofing', name: 'Waterproofing', icon: '🛡️', basePrice: 900 },
        { id: 'polish-work', name: 'Polish Work', icon: '💫', basePrice: 600 },
        { id: 'stencil-art', name: 'Stencil Art', icon: '🖌️', basePrice: 400 }
      ]
    },
    {
      id: 'cleaner',
      name: 'Home Cleaning',
      icon: <Home className="w-6 h-6" />,
      color: 'from-green-500 to-green-700',
      count: 52,
      subServices: [
        { id: 'deep-cleaning', name: 'Deep Cleaning', icon: '🧹', basePrice: 1000 },
        { id: 'bathroom-cleaning', name: 'Bathroom Cleaning', icon: '🚽', basePrice: 300 },
        { id: 'kitchen-cleaning', name: 'Kitchen Cleaning', icon: '🍳', basePrice: 400 },
        { id: 'sofa-cleaning', name: 'Sofa Cleaning', icon: '🛋️', basePrice: 500 },
        { id: 'carpet-cleaning', name: 'Carpet Cleaning', icon: '🧽', basePrice: 350 },
        { id: 'pest-control', name: 'Pest Control', icon: '🐛', basePrice: 800 }
      ]
    },
    {
      id: 'mechanic',
      name: 'Mechanic',
      icon: <Car className="w-6 h-6" />,
      color: 'from-red-500 to-red-700',
      count: 25,
      subServices: [
        { id: 'bike-service', name: 'Bike Service', icon: '🏍️', basePrice: 500 },
        { id: 'car-service', name: 'Car Service', icon: '🚗', basePrice: 1200 },
        { id: 'oil-change', name: 'Oil Change', icon: '🛢️', basePrice: 300 },
        { id: 'tire-replacement', name: 'Tire Replacement', icon: '⚙️', basePrice: 400 },
        { id: 'ac-repair', name: 'AC Repair', icon: '🌡️', basePrice: 600 },
        { id: 'general-checkup', name: 'General Checkup', icon: '🔍', basePrice: 250 }
      ]
    },
    {
      id: 'salon',
      name: 'Salon at Home',
      icon: <Scissors className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-700',
      count: 42,
      subServices: [
        { id: 'haircut', name: 'Haircut', icon: '💇', basePrice: 200 },
        { id: 'hair-coloring', name: 'Hair Coloring', icon: '🎨', basePrice: 800 },
        { id: 'facial', name: 'Facial', icon: '🧖', basePrice: 600 },
        { id: 'manicure', name: 'Manicure', icon: '💅', basePrice: 300 },
        { id: 'massage', name: 'Massage', icon: '💆', basePrice: 700 },
        { id: 'makeup', name: 'Makeup', icon: '💄', basePrice: 1500 }
      ]
    },
    {
      id: 'photographer',
      name: 'Photographer',
      icon: <Camera className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-700',
      count: 18,
      subServices: [
        { id: 'event-photography', name: 'Event Photography', icon: '📸', basePrice: 5000 },
        { id: 'portrait-shoot', name: 'Portrait Shoot', icon: '👤', basePrice: 2000 },
        { id: 'product-photography', name: 'Product Photography', icon: '📦', basePrice: 3000 },
        { id: 'wedding-photography', name: 'Wedding Photography', icon: '💑', basePrice: 15000 },
        { id: 'video-shoot', name: 'Video Shoot', icon: '🎥', basePrice: 8000 },
        { id: 'drone-photography', name: 'Drone Photography', icon: '🚁', basePrice: 10000 }
      ]
    }
  ];

  const filteredServices = serviceCategories.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.subServices.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-[#141A2A] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          )}
          <div className="flex-1">
            <h1 className="text-2xl mb-1">Services</h1>
            <p className="text-gray-400 text-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#007BFF]" />
              Mumbai, Maharashtra
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Which service are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141A2A] text-white pl-12 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-xl border transition-all ${
              showFilters || selectedFilters.length > 0
                ? 'bg-[#007BFF] border-[#007BFF] text-white'
                : 'bg-[#141A2A] border-[#1f2937] text-gray-400 hover:border-[#007BFF]'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="px-5 mb-4">
          <div className="bg-[#141A2A] rounded-xl border border-[#1f2937] p-4">
            <h4 className="text-white text-sm mb-3">Filter by</h4>
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    selectedFilters.includes(filter)
                      ? 'bg-[#007BFF] border-[#007BFF] text-white'
                      : 'bg-[#0A0F1C] border-[#1f2937] text-gray-400 hover:border-[#007BFF]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Map Placeholder */}
      <div className="px-5 mb-6">
        <div className="bg-[#141A2A] rounded-xl border border-[#1f2937] overflow-hidden h-48 relative">
          {/* Map Placeholder - In production, integrate Google Maps */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-[#007BFF] animate-bounce" />
            </div>
            {/* Simulated markers */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-[#007BFF] rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 20}%`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-[#0A0F1C]/90 backdrop-blur-sm rounded-lg p-2 border border-[#1f2937]">
            <p className="text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {filteredServices.reduce((acc, service) => acc + service.count, 0)} service providers nearby
            </p>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="px-5">
        <h2 className="text-lg mb-3">Available Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {filteredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service.name, service.subServices)}
              className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all text-left relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 text-white`}>
                {service.icon}
              </div>
              <h3 className="text-white mb-1">{service.name}</h3>
              <p className="text-gray-400 text-xs mb-2">{service.count} available</p>
              <div className="flex items-center justify-between">
                <span className="text-[#007BFF] text-xs">View Services</span>
                <ChevronRight className="w-4 h-4 text-[#007BFF] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}