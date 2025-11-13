import { ArrowLeft, ChevronRight } from 'lucide-react';

interface SubService {
  id: string;
  name: string;
  icon: string;
  basePrice: number;
}

interface SubServicesPageProps {
  serviceName: string;
  subServices: SubService[];
  onBack: () => void;
  onSubServiceSelect: (subService: SubService) => void;
}

export function SubServicesPage({ serviceName, subServices, onBack, onSubServiceSelect }: SubServicesPageProps) {
  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937] bg-[#0A0F1C] sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl">{serviceName}</h1>
          <p className="text-gray-400 text-sm">{subServices.length} services available</p>
        </div>
      </div>

      {/* Sub Services Grid */}
      <div className="px-5 py-6">
        <div className="space-y-3">
          {subServices.map((subService) => (
            <button
              key={subService.id}
              onClick={() => onSubServiceSelect(subService)}
              className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#007BFF]/10 rounded-xl flex items-center justify-center text-3xl border border-[#007BFF]/20">
                  {subService.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">{subService.name}</h3>
                  <p className="text-[#007BFF] text-sm">Starting from ₹{subService.basePrice}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#007BFF] group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
