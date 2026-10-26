import React, { useState } from 'react';
import { SACRED_MANTRAS, MantraItem } from '../data/mantraAudioData';
import { Volume2, VolumeX, RotateCcw, Sparkles, CheckCircle2, Play, Pause } from 'lucide-react';
import { vedicAudio } from '../utils/audioSynthesizer';

interface JapaMeditationProps {
  droneActive: boolean;
  setDroneActive: (active: boolean) => void;
}

export const JapaMeditation: React.FC<JapaMeditationProps> = ({
  droneActive,
  setDroneActive,
}) => {
  const [selectedMantraId, setSelectedMantraId] = useState<string>(SACRED_MANTRAS[0].id);
  const [beadCount, setBeadCount] = useState<number>(0);
  const [completedRounds, setCompletedRounds] = useState<number>(0);

  const selectedMantra = SACRED_MANTRAS.find((m) => m.id === selectedMantraId) || SACRED_MANTRAS[0];

  const handleNextBead = () => {
    const nextCount = beadCount + 1;
    if (nextCount >= 108) {
      setBeadCount(0);
      setCompletedRounds((prev) => prev + 1);
      vedicAudio.playTempleBell(528); // Festive completion bell
    } else {
      setBeadCount(nextCount);
      vedicAudio.playTempleBell(nextCount % 12 === 0 ? 440 : 880); // Subtle bead click tone
    }
  };

  const resetCounter = () => {
    setBeadCount(0);
  };

  const toggleDrone = () => {
    if (droneActive) {
      vedicAudio.stopDrone();
      setDroneActive(false);
    } else {
      vedicAudio.startTanpuraDrone(selectedMantra.pitchHz);
      setDroneActive(true);
    }
  };

  const progressPercentage = Math.round((beadCount / 108) * 100);

  return (
    <div className="py-8 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-sans text-stone-500 mb-1">
              Naama-Smarana & Dhyana
            </div>
            <h2 className="text-3xl font-serif font-medium text-stone-900 tracking-tight">
              108-Bead Japa Mala & Sacred Vedic Mantras
            </h2>
          </div>

          {/* Tanpura Acoustic Drone Controller */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDrone}
              className={`px-4 py-2.5 rounded-xl border text-xs font-sans font-medium transition-all flex items-center gap-2 ${
                droneActive
                  ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              {droneActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-800 animate-pulse" />
                  <span>Tanpura Drone: Active (138Hz)</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-stone-400" />
                  <span>Start Meditative Tanpura Drone</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mantra Selector & Spiritual Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mantra Selector */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
              <span className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold block mb-3">
                Select Sacred Mantra
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SACRED_MANTRAS.map((mantra) => {
                  const isSelected = selectedMantraId === mantra.id;
                  return (
                    <button
                      key={mantra.id}
                      onClick={() => {
                        setSelectedMantraId(mantra.id);
                        if (droneActive) {
                          vedicAudio.startTanpuraDrone(mantra.pitchHz);
                        }
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all font-sans ${
                        isSelected
                          ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500 shadow-xs'
                          : 'bg-white border-stone-200 hover:border-amber-400/60 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-semibold text-stone-800 line-clamp-1">
                        {mantra.name}
                      </div>
                      <div className="text-[11px] font-serif text-stone-500 mt-0.5 line-clamp-1">
                        {mantra.transliteration}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Mantra Presentation */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-sans text-amber-800 font-semibold tracking-wider uppercase">
                  Sacred Chanted Sound
                </span>
                <span className="text-xs font-mono text-stone-400">
                  Target: {selectedMantra.recommendedCount} beads
                </span>
              </div>

              {/* Devanagari Sanskrit */}
              <div className="bg-[#FAF7F2] p-6 rounded-xl border border-amber-900/10 text-center">
                <p className="font-serif text-xl sm:text-2xl text-amber-950 font-medium whitespace-pre-line leading-relaxed">
                  {selectedMantra.sanskrit}
                </p>
                <p className="font-sans italic text-xs sm:text-sm text-stone-600 mt-3 tracking-wide">
                  {selectedMantra.transliteration}
                </p>
              </div>

              {/* Translation */}
              <div>
                <span className="text-xs font-sans uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                  Transcendental Meaning
                </span>
                <p className="text-sm font-sans text-stone-800 leading-relaxed">
                  "{selectedMantra.meaning}"
                </p>
              </div>

              {/* Significance */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                <span className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                  Scriptural Authority
                </span>
                <p className="text-xs sm:text-sm font-sans text-stone-600 leading-relaxed">
                  {selectedMantra.significance}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: 108 Japa Mala Counter */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
              
              <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-semibold mb-2">
                Japa Mala Meditation
              </span>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-6">
                Chant & Count Beads
              </h3>

              {/* Circular Progress & Bead Counter */}
              <div className="relative w-56 h-56 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="112"
                    cy="112"
                    r="92"
                    className="text-stone-100"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="112"
                    cy="112"
                    r="92"
                    className="text-amber-500 transition-all duration-300 ease-out"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 92}
                    strokeDashoffset={2 * Math.PI * 92 * (1 - beadCount / 108)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>

                {/* Inner counter button */}
                <button
                  onClick={handleNextBead}
                  className="absolute inset-4 rounded-full bg-gradient-to-b from-[#FAF7F2] to-[#F2ECE1] border-4 border-amber-200/70 shadow-inner flex flex-col items-center justify-center p-4 hover:scale-102 active:scale-98 transition-all focus:outline-none group cursor-pointer"
                >
                  <span className="text-xs font-sans uppercase tracking-widest text-stone-400 group-hover:text-amber-800 transition-colors">
                    Click to Bead
                  </span>
                  <span className="text-5xl font-serif font-semibold text-stone-900 my-1 tabular-nums">
                    {beadCount}
                  </span>
                  <span className="text-xs font-sans text-stone-500">
                    of 108 beads
                  </span>
                </button>
              </div>

              {/* Progress Bar & Stats */}
              <div className="w-full bg-stone-50 p-4 rounded-xl border border-stone-200/70 mb-6 flex items-center justify-around text-xs font-sans">
                <div>
                  <span className="text-stone-400 block">Progress</span>
                  <span className="font-semibold text-stone-800 text-sm">{progressPercentage}%</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-stone-400 block">Rounds Done</span>
                  <span className="font-semibold text-amber-900 text-sm">{completedRounds}</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-stone-400 block">Remaining</span>
                  <span className="font-semibold text-stone-800 text-sm">{108 - beadCount}</span>
                </div>
              </div>

              {/* Counter Controls */}
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={handleNextBead}
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-sans font-medium text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-900" />
                  <span>Count Bead (+1)</span>
                </button>
                <button
                  onClick={resetCounter}
                  title="Reset Bead Count"
                  className="p-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-4 text-[11px] font-sans text-stone-400 max-w-xs">
                Chant with focused heart. At every 108th bead, the temple bell chimes to celebrate one completed round.
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
