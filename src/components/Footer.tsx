import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-stone-200/90 py-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Curatorial Attribution */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-stone-900 flex items-center justify-center text-amber-100 font-display font-bold text-sm">
                ॐ
              </div>
              <span className="text-xl font-display font-bold text-stone-900">
                VedaKrishna
              </span>
            </div>
            
            <p className="text-xs font-sans text-stone-600 leading-relaxed max-w-sm">
              Comprehensive spiritual encyclopedia of Lord Krishna, the 18 chapters of the Bhagavad Gita, and Vedic scriptures. Featuring AI-guided philosophical counsel and sacred acoustic chanting.
            </p>

            {/* Prominent Attribution requested by User */}
            <div className="pt-2 text-xs font-sans text-stone-800 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Conceived & Made by <strong>Sudarsanan K R</strong></span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-sans uppercase tracking-widest text-stone-400 font-semibold block mb-2">
              Spiritual Exploration
            </span>
            <ul className="space-y-1.5 text-xs font-sans text-stone-600">
              <li>
                <button
                  onClick={() => onSelectTab('encyclopedia')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Vedic Spiritual Encyclopedia & Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('gita')}
                  className="hover:text-amber-800 transition-colors"
                >
                  18 Yogas of the Bhagavad Gita & Shloka Exegesis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('charioteer')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Krishna Spiritual AI (മലയാളം & English)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('dilemma')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Kurukshetra Moral & Life Dilemma Navigator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('japa')}
                  className="hover:text-amber-800 transition-colors"
                >
                  108-Bead Japa Mala & Synthesized Tanpura Drone
                </button>
              </li>
            </ul>
          </div>

          {/* Sacred Benediction */}
          <div className="md:col-span-3 space-y-2 text-right md:text-right">
            <span className="text-xs font-sans uppercase tracking-widest text-stone-400 font-semibold block mb-2">
              Sacred Benediction
            </span>
            <div className="font-serif italic text-sm text-stone-800">
              "ॐ असतो मा सद्गमय।<br />तमसो मा ज्योतिर्गमय।"
            </div>
            <p className="text-[11px] font-sans text-stone-500">
              Lead us from the unreal to the real, from darkness into eternal light.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-sans text-stone-500">
          <div>
            © {new Date().getFullYear()} VedaKrishna Encyclopedia · Dedicated to universal spiritual enlightenment
          </div>
          <div className="flex items-center gap-3">
            <span>Made by Sudarsanan K R</span>
            <span aria-hidden="true">·</span>
            <span>Om Shanti Shanti Shanti</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
