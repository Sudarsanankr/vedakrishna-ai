import React from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { vedicAudio } from '../utils/audioSynthesizer';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
  droneActive: boolean;
  setDroneActive: (active: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenConsultation,
  droneActive,
  setDroneActive,
}) => {
  const toggleDrone = () => {
    if (droneActive) {
      vedicAudio.stopDrone();
      setDroneActive(false);
    } else {
      vedicAudio.startTanpuraDrone();
      setDroneActive(true);
    }
  };

  const navLinks = [
    { id: 'encyclopedia', label: 'Encyclopedia' },
    { id: 'gita', label: 'Bhagavad Gita' },
    { id: 'charioteer', label: 'Krishna AI (മലയാളം)' },
    { id: 'dilemma', label: 'Dilemmas' },
    { id: 'japa', label: 'Japa & Mantras' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => setActiveTab('encyclopedia')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-stone-900 flex items-center justify-center text-amber-100 shadow-sm border border-amber-300/40">
              <span className="font-display font-bold text-lg select-none">ॐ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-display font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
                VedaKrishna
              </span>
              <span className="text-[11px] font-sans text-stone-500 tracking-wider uppercase -mt-0.5">
                Vedic Encyclopedia & AI
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-amber-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action button + Tanpura Ambient drone toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleDrone}
              title={droneActive ? 'Silence Tanpura Drone' : 'Play Ambient Tanpura Drone (138Hz)'}
              className={`p-2 rounded-lg border transition-all text-xs font-sans flex items-center gap-1.5 ${
                droneActive
                  ? 'bg-amber-100/80 border-amber-400 text-amber-900 shadow-sm'
                  : 'bg-stone-100/80 border-stone-300 text-stone-600 hover:text-stone-900'
              }`}
            >
              {droneActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span className="hidden lg:inline text-[11px] font-medium">Tanpura Drone Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-stone-500" />
                  <span className="hidden lg:inline text-[11px] font-medium">Tanpura Drone</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenConsultation}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 font-sans border border-amber-400/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-900" />
              <span>Ask Charioteer AI</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-stone-200/60 no-scrollbar">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-900 text-amber-50 font-medium'
                    : 'text-stone-600 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
