import React from 'react';
import { BookOpen, Compass, MessageCircle, Heart, Sparkles, Feather } from 'lucide-react';
import chariotImage from '../assets/images/krishna_arjuna_chariot_1793049774568.jpg';

interface HeroSectionProps {
  onSelectTab: (tab: string) => void;
  onOpenDailyReflection: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectTab,
  onOpenDailyReflection,
  onOpenQuiz,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] to-[#FAF7F2] border-b border-stone-200 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Curatorial Header & Philosophical Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Natural editorial kicker with attribution */}
              <div className="flex items-center gap-2 text-xs font-sans text-stone-600 mb-3 tracking-wide">
                <span className="font-semibold text-amber-800">Sacred Vedic Encyclopedia</span>
                <span aria-hidden="true">·</span>
                <span>Bhagavad Gita & Vedic Scriptures</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-800 font-medium">Curated by Sudarsanan K R</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.15] text-balance">
                Timeless Wisdom for Modern Souls: The Gita & Vedic Teachings
              </h1>

              {/* Deck Prose */}
              <p className="mt-4 text-base sm:text-lg font-sans text-stone-700 leading-relaxed max-w-2xl">
                Immerse yourself in the transcendental dialogue between Lord Krishna and Arjuna. 
                Explore sacred shlokas in Sanskrit Devanagari with word-for-word exegesis, resolve complex modern dilemmas through Gita philosophy, and converse with the <strong>Malayalam-first Krishna Spiritual AI</strong> for guidance in മലയാളം and English.
              </p>

              {/* Primary Interactive CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectTab('gita')}
                  className="px-5 py-3 text-sm font-medium text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 font-sans"
                >
                  <BookOpen className="w-4 h-4 text-amber-900" />
                  <span>Explore Bhagavad Gita</span>
                </button>

                <button
                  onClick={() => onSelectTab('charioteer')}
                  className="px-5 py-3 text-sm font-medium text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 font-sans"
                >
                  <MessageCircle className="w-4 h-4 text-amber-700" />
                  <span>Krishna AI (മലയാളം & English)</span>
                </button>

                <button
                  onClick={() => onSelectTab('dilemma')}
                  className="px-4 py-3 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors flex items-center gap-1.5 font-sans"
                >
                  <Compass className="w-4 h-4 text-stone-500" />
                  <span>Resolve a Dilemma</span>
                </button>
              </div>
            </div>

            {/* Curatorial Utility Strip */}
            <div className="mt-8 pt-6 border-t border-stone-300/60 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-stone-600">
              <div className="flex items-center gap-4">
                <span>700 Gita Shlokas</span>
                <span aria-hidden="true">·</span>
                <span>18 Yoga Chapters</span>
                <span aria-hidden="true">·</span>
                <span>108-Bead Japa</span>
                <span aria-hidden="true">·</span>
                <span>Web Audio Tanpura</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenDailyReflection}
                  className="text-amber-800 hover:text-amber-950 font-medium underline underline-offset-4 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Daily Dharma Card</span>
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={onOpenQuiz}
                  className="text-stone-700 hover:text-stone-950 font-medium underline underline-offset-4 flex items-center gap-1"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Gita Quiz</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Museum Art Presentation */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-xl overflow-hidden border border-amber-900/20 bg-stone-900 shadow-md h-full flex flex-col justify-between group">
              <img
                src={chariotImage}/krishna_arjuna_chariot_1793049774568.jpg"
                alt="Lord Krishna and Arjuna upon the chariot at Kurukshetra, traditional museum painting"
                className="w-full h-72 sm:h-80 lg:h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 text-stone-200">
                <div className="text-[11px] font-sans uppercase tracking-widest text-amber-300/90 mb-1">
                  Archival Manuscript Art · Kurukshetra Dialogue
                </div>
                <div className="text-lg font-serif font-medium text-white">
                  "Karmanye vadikaraste ma phaleshu kadachana"
                </div>
                <div className="text-xs text-stone-300 font-sans mt-1">
                  Act without feverish craving for the fruit; let selfless duty be your true worship.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
