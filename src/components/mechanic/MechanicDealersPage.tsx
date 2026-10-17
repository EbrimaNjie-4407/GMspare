import { useState } from 'react';
import { Store, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { DealerProfile } from '../../types';
import alternatorImg from '../../assets/images/alternator_assembly_1791849520193.jpg';

interface MechanicDealersPageProps {
  onSelectDealer: (dealer: DealerProfile) => void;
  onNavigate: (view: string) => void;
}

export function MechanicDealersPage({ onSelectDealer, onNavigate: _onNavigate }: MechanicDealersPageProps) {
  const store = useStore();
  const [filterLocation, setFilterLocation] = useState('all');

  const dealers = store.dealers.filter((d) => {
    if (filterLocation === 'jeshwang') return d.shopLocation.toLowerCase().includes('jeshwang');
    if (filterLocation === 'serrekunda') return d.shopLocation.toLowerCase().includes('serrekunda') || d.shopLocation.toLowerCase().includes('westfield');
    return true;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Title from Figma Page 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose your prefered dealer
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified auto parts dealers in Jeshwang and Greater Banjul Area
          </p>
        </div>

        {/* Location Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl text-xs">
          <button
            onClick={() => setFilterLocation('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterLocation === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Areas ({store.dealers.length})
          </button>
          <button
            onClick={() => setFilterLocation('jeshwang')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterLocation === 'jeshwang' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Jeshwang Hub
          </button>
          <button
            onClick={() => setFilterLocation('serrekunda')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterLocation === 'serrekunda' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Westfield / Serrekunda
          </button>
        </div>
      </div>

      {/* Grid of Dealer Cards matching Figma Page 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealers.map((dealer) => {
          return (
            <div
              key={dealer.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Dealer Logo Graphic Showcase matching Figma Page 3 */}
                <div className="h-44 bg-slate-100 flex items-center justify-center p-4 border-b border-slate-100 relative overflow-hidden">
                  {dealer.id === 'dealer_burgi' ? (
                    <img
                      src={alternatorImg}
                      alt={dealer.businessName}
                      className="w-32 h-32 object-contain"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-xl font-black text-slate-800 tracking-wider">
                        {dealer.logoText || dealer.businessName.slice(0, 5).toUpperCase()}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                        AUTO SPARES
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs" title="Open for orders" />
                  </div>
                </div>

                {/* Dealer Info from Figma Page 3 */}
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">
                      {dealer.businessName}
                    </h3>
                    {dealer.verificationStatus === 'approved' && (
                      <span className="text-blue-600" title="Verified dealer">
                        <CheckCircle2 className="w-4 h-4 fill-blue-50" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Location: {dealer.shopLocation.split(',')[0]}</span>
                  </p>

                  <p className="text-xs text-slate-600 font-medium pt-1">
                    New spare parts · {dealer.specialization.split('·')[0]}
                  </p>
                </div>
              </div>

              {/* View Dealer Button from Figma Page 3 */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectDealer(dealer)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>View Dealer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
