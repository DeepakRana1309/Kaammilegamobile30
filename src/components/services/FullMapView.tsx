import { ArrowLeft, Navigation, ZoomIn, ZoomOut, Locate } from 'lucide-react';
import { useState } from 'react';

interface Worker {
  id: string;
  name: string;
  rating: number;
  price: number;
  distance: string;
  avatar: string;
  lat: number;
  lng: number;
}

interface FullMapViewProps {
  serviceName: string;
  subServiceName: string;
  workers: Worker[];
  onBack: () => void;
  onWorkerSelect: (worker: Worker) => void;
}

export function FullMapView({ serviceName, subServiceName, workers, onBack, onWorkerSelect }: FullMapViewProps) {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleWorkerMarkerClick = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-[#0A0F1C] via-[#0A0F1C]/90 to-transparent px-5 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="p-2 bg-[#141A2A]/80 backdrop-blur-md hover:bg-[#141A2A] rounded-lg transition-colors border border-[#1f2937]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg">{serviceName}</h1>
            <p className="text-gray-400 text-sm">{subServiceName}</p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-full bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-blue-900/10 relative overflow-hidden">
        {/* In production, integrate Google Maps here */}
        <div 
          className="w-full h-full relative transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Grid lines for realistic feel */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full h-px bg-blue-500" style={{ top: `${i * 5}%` }}></div>
            ))}
            {[...Array(20)].map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full w-px bg-blue-500" style={{ left: `${i * 5}%` }}></div>
            ))}
          </div>

          {/* Your Location (Center) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-[#0A0F1C] px-2 py-1 rounded-lg border border-green-500 text-xs">
              You
            </div>
          </div>

          {/* Worker Markers */}
          {workers.map((worker, index) => {
            // Position workers around the center
            const positions = [
              { top: '30%', left: '35%' },
              { top: '25%', left: '60%' },
              { top: '55%', left: '30%' },
              { top: '50%', left: '65%' },
              { top: '40%', left: '75%' }
            ];
            const isSelected = selectedWorker?.id === worker.id;

            return (
              <div
                key={worker.id}
                className="absolute cursor-pointer transform transition-all duration-300"
                style={{
                  ...positions[index],
                  transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                }}
                onClick={() => handleWorkerMarkerClick(worker)}
              >
                <div className="relative group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-4 shadow-xl transition-all ${
                    isSelected 
                      ? 'bg-[#007BFF] border-white shadow-blue-500/50' 
                      : 'bg-[#007BFF] border-white'
                  }`}>
                    {worker.avatar}
                  </div>
                  
                  {/* Distance Badge */}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border-2 border-[#0A0F1C]">
                    {worker.distance}
                  </div>

                  {/* Hover Info */}
                  {!isSelected && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-[#0A0F1C]/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#007BFF] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <p className="text-white text-xs">{worker.name}</p>
                      <p className="text-[#007BFF] text-xs">₹{worker.price}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Roads/Paths visualization */}
          <svg className="absolute inset-0 opacity-20 pointer-events-none" width="100%" height="100%">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#38BDF8" strokeWidth="2" strokeDasharray="10,5" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#38BDF8" strokeWidth="2" strokeDasharray="10,5" />
          </svg>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-5 top-24 z-20 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-[#141A2A]/80 backdrop-blur-md border border-[#1f2937] rounded-lg flex items-center justify-center hover:bg-[#007BFF] hover:border-[#007BFF] transition-all"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-[#141A2A]/80 backdrop-blur-md border border-[#1f2937] rounded-lg flex items-center justify-center hover:bg-[#007BFF] hover:border-[#007BFF] transition-all"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          className="w-10 h-10 bg-[#141A2A]/80 backdrop-blur-md border border-[#1f2937] rounded-lg flex items-center justify-center hover:bg-[#007BFF] hover:border-[#007BFF] transition-all"
        >
          <Locate className="w-5 h-5" />
        </button>
      </div>

      {/* Selected Worker Info Card */}
      {selectedWorker && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/95 to-transparent p-5 animate-in slide-in-from-bottom">
          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#007BFF] shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-2xl">
                {selectedWorker.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">{selectedWorker.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-400">★ {selectedWorker.rating}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{selectedWorker.distance} away</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#007BFF] text-xl">₹{selectedWorker.price}</p>
                <p className="text-gray-400 text-xs">per service</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onWorkerSelect(selectedWorker)}
                className="flex-1 bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-3 rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all"
              >
                Book Now
              </button>
              <button
                onClick={() => setSelectedWorker(null)}
                className="px-4 bg-[#0A0F1C] text-gray-400 py-3 rounded-xl border border-[#1f2937] hover:border-[#007BFF] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-5 left-5 z-20 bg-[#141A2A]/80 backdrop-blur-md rounded-xl p-3 border border-[#1f2937]">
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#007BFF] rounded-full"></div>
            <span className="text-white">{workers.length} Workers Nearby</span>
          </div>
        </div>
        <p className="text-gray-500 text-[10px] mt-2">
          In production: Google Maps API
        </p>
      </div>
    </div>
  );
}
