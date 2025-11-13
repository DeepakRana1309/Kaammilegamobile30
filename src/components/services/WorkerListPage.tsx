import { ArrowLeft, Star, MapPin, Clock, Shield, Maximize2, IndianRupee, Map } from 'lucide-react';
import { useState } from 'react';

interface Worker {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  experience: string;
  verified: boolean;
  avatar: string;
  completedJobs: number;
  responseTime: string;
  lat: number;
  lng: number;
}

interface WorkerListPageProps {
  serviceName: string;
  subServiceName: string;
  onBack: () => void;
  onWorkerSelect: (worker: Worker) => void;
  onViewMap?: (workers: Worker[]) => void;
}

export function WorkerListPage({ serviceName, subServiceName, onBack, onWorkerSelect, onViewMap }: WorkerListPageProps) {
  // Mock worker data
  const workers: Worker[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 4.8,
      reviews: 156,
      price: 300,
      distance: '1.2 km',
      experience: '8 years',
      verified: true,
      avatar: '👨‍🔧',
      completedJobs: 450,
      responseTime: '10 min',
      lat: 28.6139,
      lng: 77.2090
    },
    {
      id: '2',
      name: 'Amit Sharma',
      rating: 4.9,
      reviews: 203,
      price: 350,
      distance: '2.5 km',
      experience: '10 years',
      verified: true,
      avatar: '👨‍🔧',
      completedJobs: 620,
      responseTime: '5 min',
      lat: 28.6139,
      lng: 77.2090
    },
    {
      id: '3',
      name: 'Suresh Patel',
      rating: 4.6,
      reviews: 98,
      price: 250,
      distance: '3.8 km',
      experience: '5 years',
      verified: true,
      avatar: '👨‍🔧',
      completedJobs: 280,
      responseTime: '15 min',
      lat: 28.6139,
      lng: 77.2090
    },
    {
      id: '4',
      name: 'Vijay Singh',
      rating: 4.7,
      reviews: 134,
      price: 320,
      distance: '1.8 km',
      experience: '7 years',
      verified: true,
      avatar: '👨‍🔧',
      completedJobs: 380,
      responseTime: '8 min',
      lat: 28.6139,
      lng: 77.2090
    },
    {
      id: '5',
      name: 'Ramesh Verma',
      rating: 4.5,
      reviews: 67,
      price: 280,
      distance: '4.2 km',
      experience: '4 years',
      verified: false,
      avatar: '👨‍🔧',
      completedJobs: 190,
      responseTime: '20 min',
      lat: 28.6139,
      lng: 77.2090
    }
  ];

  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-[#1f2937] bg-[#0A0F1C] sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl mb-1">{serviceName}</h1>
        <p className="text-gray-400 text-sm">{subServiceName} • {workers.length} professionals available</p>
      </div>

      {/* Map Section with Worker Locations */}
      <div className="px-5 py-4">
        <div className="bg-[#141A2A] rounded-xl border border-[#1f2937] overflow-hidden relative">
          {/* Map Preview */}
          <div className="h-64 bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative">
            {/* Center marker (Your location) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>

            {/* Worker markers positioned around the map */}
            {workers.slice(0, 5).map((worker, index) => {
              const positions = [
                { top: '25%', left: '30%' },
                { top: '20%', left: '65%' },
                { top: '60%', left: '25%' },
                { top: '55%', left: '70%' },
                { top: '40%', left: '80%' }
              ];
              return (
                <div
                  key={worker.id}
                  className="absolute cursor-pointer group"
                  style={positions[index]}
                  onClick={() => {
                    // Scroll to worker card
                    const element = document.getElementById(`worker-${worker.id}`);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-[#007BFF] rounded-full flex items-center justify-center text-xl border-2 border-white shadow-lg">
                      {worker.avatar}
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#0A0F1C] px-3 py-1.5 rounded-lg border border-[#007BFF] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="text-white text-xs">{worker.name}</p>
                      <p className="text-[#007BFF] text-xs">₹{worker.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* View Map Button Overlay */}
            <button
              onClick={() => onViewMap && onViewMap(workers)}
              className="absolute top-3 right-3 bg-[#007BFF] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0056b3] transition-all shadow-lg z-20"
            >
              <Map className="w-4 h-4" />
              <span className="text-sm">View Map</span>
            </button>
          </div>

          {/* Map Legend */}
          <div className="bg-[#0A0F1C]/90 backdrop-blur-sm p-2 border-t border-[#1f2937] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white text-xs">Your Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
              <span className="text-white text-xs">{workers.length} Workers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workers List */}
      <div className="px-5 py-6 space-y-4">
        {workers.map((worker) => (
          <div
            key={worker.id}
            id={`worker-${worker.id}`}
            onClick={() => onWorkerSelect(worker)}
            className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all cursor-pointer"
          >
            {/* Worker Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-3xl">
                {worker.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white">{worker.name}</h3>
                  {worker.verified && (
                    <Shield className="w-4 h-4 text-[#007BFF] fill-[#007BFF]" />
                  )}
                </div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm">{worker.rating}</span>
                    <span className="text-gray-400 text-xs">({worker.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{worker.distance} away</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs">{worker.experience} experience</p>
              </div>
            </div>

            {/* Worker Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-[#0A0F1C] rounded-lg p-2 border border-[#1f2937]">
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Jobs Done</span>
                </div>
                <p className="text-white text-sm">{worker.completedJobs}</p>
              </div>
              <div className="bg-[#0A0F1C] rounded-lg p-2 border border-[#1f2937]">
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                  <Clock className="w-3 h-3" />
                  <span>Response</span>
                </div>
                <p className="text-white text-sm">{worker.responseTime}</p>
              </div>
              <div className="bg-[#0A0F1C] rounded-lg p-2 border border-[#1f2937]">
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                  <IndianRupee className="w-3 h-3" />
                  <span>Starting</span>
                </div>
                <p className="text-white text-sm">₹{worker.price}</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-[#007BFF] text-white py-2.5 rounded-lg hover:bg-[#0056b3] transition-all flex items-center justify-center gap-2">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}