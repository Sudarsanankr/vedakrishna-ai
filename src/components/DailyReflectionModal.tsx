import React, { useState } from 'react';
import { DAILY_REFLECTIONS } from '../data/interactiveTeachings';
import { X, Sparkles, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { vedicAudio } from '../utils/audioSynthesizer';

interface DailyReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyReflectionModal: React.FC<DailyReflectionModalProps> = ({ isOpen, onClose }) => {
  const [reflectionIdx, setReflectionIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const item = DAILY_REFLECTIONS[reflectionIdx];

  const handleNext = () => {
    setReflectionIdx((prev) => (prev + 1) % DAILY_REFLECTIONS.length);
  };

  const handlePrev = () => {
    setReflectionIdx((prev) => (prev - 1 + DAILY_REFLECTIONS.length) % DAILY_REFLECTIONS.length);
  };

  const handleCopy = () => {
    const text = `Daily Vedic Reflection · ${item.source}\n\n"${item.sanskritPhrase}" (${item.transliteration})\nTheme: ${item.theme}\n\nContemplation:\n${item.contemplation}\n\nDaily Practice:\n${item.dailyPractice}\n\nCurated by Sudarsanan K R | VedaKrishna`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    vedicAudio.playTempleBell(528);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2 text-xs font-sans text-amber-800 font-semibold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Daily Dharma Card</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="mt-5 space-y-4">
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-amber-900/15 text-center relative overflow-hidden">
            <div className="text-[11px] font-mono text-stone-400 uppercase tracking-widest mb-1">
              {item.source}
            </div>
            <h3 className="font-serif text-2xl text-amber-950 font-medium">
              {item.sanskritPhrase}
            </h3>
            <p className="font-sans italic text-xs text-stone-600 mt-1">
              {item.transliteration}
            </p>
            <div className="mt-3 text-xs font-sans font-semibold text-amber-900 uppercase tracking-wider">
              {item.theme}
            </div>
          </div>

          {/* Contemplation */}
          <div>
            <span className="text-xs font-sans uppercase tracking-wider text-stone-400 font-semibold block mb-1">
              Contemplative Seed
            </span>
            <p className="text-sm font-sans text-stone-800 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200/60">
              {item.contemplation}
            </p>
          </div>

          {/* Practical Action */}
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/70">
            <span className="text-xs font-sans uppercase tracking-wider text-amber-900 font-semibold block mb-1">
              Mindful Practice for Today
            </span>
            <p className="text-xs sm:text-sm font-sans text-stone-800 leading-relaxed">
              {item.dailyPractice}
            </p>
          </div>
        </div>

        {/* Footer with Prev / Next & Copy */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2 border border-stone-200 hover:bg-stone-50 rounded-lg text-stone-600"
              title="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-stone-200 hover:bg-stone-50 rounded-lg text-stone-600"
              title="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-sans text-stone-400 ml-2">
              {reflectionIdx + 1} of {DAILY_REFLECTIONS.length}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-lg text-xs font-medium font-sans flex items-center gap-1.5 shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-900" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share Card'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
