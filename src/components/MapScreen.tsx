import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Star, Phone, Navigation } from 'lucide-react';

interface MapScreenProps {
  onBack: () => void;
}

const providers = [
  { id: 1, name: 'Rajesh Kumar', service: 'Plumber', rating: 4.8, distance: '1.2 km', price: '₹300/hr', lat: 28.6139, lng: 77.2090 },
  { id: 2, name: 'Amit Singh', service: 'Electrician', rating: 4.9, distance: '0.8 km', price: '₹400/hr', lat: 28.6169, lng: 77.2120 },
  { id: 3, name: 'Suresh Patel', service: 'Carpenter', rating: 4.7, distance: '2.1 km', price: '₹350/hr', lat: 28.6109, lng: 77.2060 },
  { id: 4, name: 'Vikram Mehta', service: 'Painter', rating: 4.6, distance: '1.5 km', price: '₹250/hr', lat: 28.6189, lng: 77.2140 },
];

export function MapScreen({ onBack }: MapScreenProps) {
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white">Nearby Providers</h1>
        <button className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center">
          <Navigation className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Map Area - Simplified representation */}
      <div className="relative flex-1 bg-gradient-to-b from-[#1A2332] to-[#141A2A]">
        {/* Map placeholder with dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {providers.map((provider, index) => (
              <motion.button
                key={provider.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProvider(provider)}
                className={`absolute w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  selectedProvider.id === provider.id
                    ? 'bg-[#007BFF] scale-125'
                    : 'bg-[#141A2A]'
                }`}
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + (index % 2) * 20}%`,
                }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Current location indicator */}
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-[#007BFF] rounded-full animate-pulse">
          <div className="absolute inset-0 bg-[#007BFF] rounded-full animate-ping opacity-75"></div>
        </div>
      </div>

      {/* Bottom Sheet - Provider List */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-[#141A2A] rounded-t-3xl p-4 max-h-[40%] overflow-y-auto"
      >
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4"></div>
        <div className="space-y-3">
          {providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(provider)}
              className={`w-full rounded-2xl p-4 transition-all ${
                selectedProvider.id === provider.id
                  ? 'bg-[#007BFF]/20 border-2 border-[#007BFF]'
                  : 'bg-[#0A0F1C]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#007BFF] flex items-center justify-center">
                    <span className="text-white">{provider.name[0]}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white">{provider.name}</h3>
                    <p className="text-gray-400 text-sm">{provider.service}</p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  {provider.rating}
                </span>
                <span className="text-gray-400">{provider.distance} away</span>
                <span className="text-[#007BFF]">{provider.price}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
