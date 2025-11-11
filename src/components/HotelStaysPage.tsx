import { User, Wallet, Menu, MapPin, Star, Wifi, Coffee, Car, Wind, ChevronDown, ChevronUp, IndianRupee, X } from 'lucide-react';
import { useState } from 'react';

interface HotelStaysPageProps {
  onProfileClick: () => void;
  onWalletClick: () => void;
  onMenuClick: () => void;
}

export function HotelStaysPage({ onProfileClick, onWalletClick, onMenuClick }: HotelStaysPageProps) {
  const [expandedHotel, setExpandedHotel] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showAllStates, setShowAllStates] = useState(false);

  const statesWithCities = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kolhapur', 'Solapur'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Dharwad', 'Shimoga', 'Tumkur'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Kanchipuram'],
    'Delhi': ['New Delhi', 'Central Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Dwarka', 'Rohini'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Noida', 'Ghaziabad'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Anand'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Pushkar', 'Mount Abu'],
    'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Durgapur', 'Asansol', 'Howrah', 'Bardhaman', 'Kalimpong'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Nalgonda', 'Secunderabad'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati', 'Kadapa', 'Kakinada', 'Rajahmundry'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam', 'Alappuzha', 'Munnar', 'Wayanad'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Ratlam', 'Dewas'],
    'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot'],
    'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar', 'Rohtak', 'Sonipat'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Bihar Sharif', 'Purnia', 'Munger'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur', 'Brahmapur', 'Balasore', 'Konark'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Tezpur', 'Nagaon', 'Tinsukia', 'Bongaigaon'],
    'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Bhilai', 'Korba', 'Raigarh', 'Jagdalpur', 'Rajnandgaon'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Nainital', 'Mussoorie', 'Rishikesh', 'Almora', 'Haldwani'],
    'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Solan', 'Mandi', 'Kasauli', 'Dalhousie'],
    'Jammu & Kashmir': ['Srinagar', 'Jammu', 'Gulmarg', 'Pahalgam', 'Leh', 'Ladakh', 'Katra', 'Sonamarg'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Calangute', 'Candolim', 'Anjuna'],
    'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Ambassa', 'Belonia', 'Khowai', 'Teliamura'],
    'Meghalaya': ['Shillong', 'Tura', 'Cherrapunji', 'Jowai', 'Nongstoin', 'Baghmara', 'Williamnagar', 'Resubelpara'],
    'Manipur': ['Imphal', 'Thoubal', 'Churachandpur', 'Bishnupur', 'Ukhrul', 'Senapati', 'Kakching', 'Moreh'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Mon', 'Phek'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Saiha', 'Lawngtlai', 'Mamit'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila', 'Tezu', 'Along'],
    'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Pelling', 'Ravangla', 'Yuksom', 'Lachung'],
    'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam', 'Auroville']
  };

  const popularStates = [
    { name: 'Maharashtra', emoji: '🏙️', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Goa', emoji: '🏖️', gradient: 'from-orange-500 to-red-600' },
    { name: 'Karnataka', emoji: '🌆', gradient: 'from-purple-500 to-purple-700' },
    { name: 'Delhi', emoji: '🏛️', gradient: 'from-red-500 to-pink-600' },
    { name: 'Rajasthan', emoji: '🏰', gradient: 'from-yellow-500 to-orange-600' },
    { name: 'Kerala', emoji: '🌴', gradient: 'from-green-500 to-emerald-700' },
    { name: 'Tamil Nadu', emoji: '🕉️', gradient: 'from-teal-500 to-cyan-700' },
    { name: 'Himachal Pradesh', emoji: '⛰️', gradient: 'from-indigo-500 to-blue-700' }
  ];

  const hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      reviews: 1254,
      price: 3500,
      image: '🏨',
      amenities: ['WiFi', 'AC', 'Parking', 'Breakfast'],
      rooms: [
        { type: 'Deluxe Room', price: 3500, available: 5 },
        { type: 'Premium Suite', price: 5500, available: 2 },
        { type: 'Executive Room', price: 4200, available: 8 }
      ]
    },
    {
      id: 2,
      name: 'Luxury Inn Resort',
      location: 'Bangalore, Karnataka',
      rating: 4.6,
      reviews: 892,
      price: 4200,
      image: '🏨',
      amenities: ['WiFi', 'Pool', 'Gym', 'Spa'],
      rooms: [
        { type: 'Standard Room', price: 2800, available: 10 },
        { type: 'Deluxe Room', price: 4200, available: 6 },
        { type: 'Royal Suite', price: 8500, available: 1 }
      ]
    },
    {
      id: 3,
      name: 'City View Heights',
      location: 'Pune, Maharashtra',
      rating: 4.5,
      reviews: 673,
      price: 2800,
      image: '🏨',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Bar'],
      rooms: [
        { type: 'Economy Room', price: 2800, available: 12 },
        { type: 'Business Class', price: 3800, available: 7 }
      ]
    },
    {
      id: 4,
      name: 'Beach Paradise Resort',
      location: 'Goa',
      rating: 4.9,
      reviews: 2103,
      price: 6500,
      image: '🏨',
      amenities: ['WiFi', 'Beach', 'Pool', 'Restaurant'],
      rooms: [
        { type: 'Sea View Room', price: 6500, available: 4 },
        { type: 'Beach Villa', price: 12000, available: 2 }
      ]
    }
  ];

  const filters = ['All', 'Budget', 'Premium', 'Luxury'];

  const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'AC': Wind,
    'Parking': Car,
    'Breakfast': Coffee,
    'Pool': '🏊',
    'Gym': '💪',
    'Spa': '💆',
    'Restaurant': '🍽️',
    'Bar': '🍹',
    'Beach': '🏖️'
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl mb-1">Hotel & Stays</h1>
            <p className="text-gray-400 text-sm">Find your perfect accommodation</p>
          </div>
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

      {/* Search Bar */}
      <div className="px-5 mb-4">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search city or hotel name..."
            className="w-full bg-[#141A2A] text-white pl-12 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 mb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                selectedFilter === filter
                  ? 'bg-[#007BFF] text-white'
                  : 'bg-[#141A2A] text-gray-400 border border-[#1f2937]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Banner */}
      <div className="mx-5 mb-6 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-5">
        <h3 className="text-white mb-2">Special Weekend Offers!</h3>
        <p className="text-blue-100 text-sm mb-3">Up to 40% off on premium stays</p>
        <button className="bg-white text-[#007BFF] px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">
          View Deals
        </button>
      </div>

      {/* Hotels List */}
      <div className="px-5 space-y-4">
        <h2 className="text-lg">Available Hotels</h2>
        {hotels.map((hotel) => {
          const isExpanded = expandedHotel === hotel.id;
          
          return (
            <div
              key={hotel.id}
              className="bg-[#141A2A] rounded-xl border border-[#1f2937] overflow-hidden hover:border-[#007BFF] transition-all"
            >
              {/* Hotel Card */}
              <div className="p-4">
                <div className="flex gap-3 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center text-3xl">
                    {hotel.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{hotel.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">{hotel.rating}</span>
                        <span className="text-gray-400 text-xs">({hotel.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#007BFF] flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      <span className="text-xl">{hotel.price}</span>
                    </div>
                    <p className="text-gray-400 text-xs">per night</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 bg-[#0A0F1C] px-2 py-1 rounded-md text-xs text-gray-400"
                      >
                        {typeof Icon === 'string' ? (
                          <span>{Icon}</span>
                        ) : (
                          <Icon className="w-3 h-3" />
                        )}
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>

                {/* View Rooms Button */}
                <button
                  onClick={() => setExpandedHotel(isExpanded ? null : hotel.id)}
                  className="w-full bg-[#007BFF]/10 text-[#007BFF] py-2 rounded-lg border border-[#007BFF]/20 hover:bg-[#007BFF]/20 transition-all flex items-center justify-center gap-2"
                >
                  {isExpanded ? 'Hide Rooms' : 'View Available Rooms'}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expanded Room Details */}
              {isExpanded && (
                <div className="border-t border-[#1f2937] p-4 bg-[#0A0F1C] animate-in slide-in-from-top">
                  <h4 className="text-sm text-gray-400 mb-3">Available Rooms</h4>
                  <div className="space-y-2">
                    {hotel.rooms.map((room, idx) => (
                      <div
                        key={idx}
                        className="bg-[#141A2A] rounded-lg p-3 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-white text-sm mb-1">{room.type}</p>
                          <p className="text-gray-400 text-xs">{room.available} rooms available</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-[#007BFF] flex items-center">
                              <IndianRupee className="w-3 h-3" />
                              <span className="text-sm">{room.price}</span>
                            </div>
                            <p className="text-gray-400 text-xs">per night</p>
                          </div>
                          <button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white px-4 py-2 rounded-lg text-xs hover:shadow-lg transition-all">
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Booking Section */}
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg">Popular States</h2>
          <button
            onClick={() => setShowAllStates(true)}
            className="text-[#007BFF] text-sm hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {popularStates.map((state) => (
            <button
              key={state.name}
              onClick={() => setSelectedState(state.name)}
              className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937] hover:border-[#007BFF] transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${state.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative">
                <div className="text-4xl mb-2">{state.emoji}</div>
                <p className="text-white text-sm">{state.name}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {statesWithCities[state.name as keyof typeof statesWithCities]?.length || 0}+ cities
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All States Modal */}
      {showAllStates && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-in fade-in"
          onClick={() => setShowAllStates(false)}
        >
          <div 
            className="bg-[#141A2A] rounded-t-3xl w-full max-w-[390px] max-h-[80%] flex flex-col animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#1f2937] flex items-center justify-between">
              <div>
                <h3 className="text-white text-lg">All States & UTs</h3>
                <p className="text-gray-400 text-sm">
                  {Object.keys(statesWithCities).length} locations available
                </p>
              </div>
              <button
                onClick={() => setShowAllStates(false)}
                className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* States List */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-2">
                {Object.keys(statesWithCities).map((state) => (
                  <button
                    key={state}
                    onClick={() => {
                      setSelectedState(state);
                      setShowAllStates(false);
                    }}
                    className="w-full bg-[#0A0F1C] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center text-xl">
                        📍
                      </div>
                      <div className="text-left">
                        <p className="text-white text-sm">{state}</p>
                        <p className="text-gray-400 text-xs">
                          {statesWithCities[state as keyof typeof statesWithCities].length} cities
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-[#007BFF] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cities Popup Modal */}
      {selectedState && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-in fade-in"
          onClick={() => setSelectedState(null)}
        >
          <div 
            className="bg-[#141A2A] rounded-t-3xl w-full max-w-[390px] max-h-[70%] flex flex-col animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#1f2937] flex items-center justify-between">
              <div>
                <h3 className="text-white text-lg">{selectedState}</h3>
                <p className="text-gray-400 text-sm">
                  {statesWithCities[selectedState as keyof typeof statesWithCities].length} cities available
                </p>
              </div>
              <button
                onClick={() => setSelectedState(null)}
                className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Cities Grid */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                {statesWithCities[selectedState as keyof typeof statesWithCities].map((city) => (
                  <button
                    key={city}
                    className="bg-[#0A0F1C] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#007BFF]" />
                      <p className="text-white text-sm">{city}</p>
                    </div>
                    <p className="text-gray-400 text-xs">View hotels</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}