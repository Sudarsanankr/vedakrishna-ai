
import krishnaFlute from '../assets/images/krishna_flute_vrindavan_1793049774692.jpg';
import vishvarupaImage from '../assets/images/vishvarupa_cosmic_vision_1793049774804.jpg';
import React, { useState } from 'react'; 
import { ENCYCLOPEDIA_ARTICLES, EncyclopediaArticle } from '../data/vedicEncyclopedia';
import { Search, BookOpen, Clock, Tag, ArrowRight, X } from 'lucide-react';

export const EncyclopediaBrowser: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<EncyclopediaArticle | null>(null);

  const categories = [
    'All',
    'Metaphysics',
    'The Three Gunas',
    'Four Yogas',
    'Scriptural Canon',
    'Krishna Leela & Avatars',
    'Sacred Geography'
  ];

  const filteredArticles = ENCYCLOPEDIA_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.sanskritTitle.includes(searchQuery) ||
      article.keyTerms.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="border-b border-stone-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-sans text-stone-500 mb-1">
              Sanatana Dharma Curatorial Archive
            </div>
            <h2 className="text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Krishna & Vedic Spiritual Encyclopedia
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, Sanskrit terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Featured Visual Spotlights Strip (2 Generated Paintings) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Card 1: Vrindavan Leela */}
          <div 
            onClick={() => {
              const vrindavanArticle = ENCYCLOPEDIA_ARTICLES.find(a => a.id === 'krishna-leelas-vrindavan');
              if (vrindavanArticle) setActiveArticle(vrindavanArticle);
            }}
            className="group cursor-pointer relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-xs hover:shadow-md transition-all h-64 sm:h-72"
          >
            <img
              src={krishnaFlute} /krishna_flute_vrindavan_1793049774692.jpg"
              alt="Lord Krishna playing flute in the groves of Vrindavan"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <span className="text-[11px] font-sans uppercase tracking-widest text-amber-300">
                Transcendental Sweetness · Madhurya Leela
              </span>
              <h3 className="text-xl font-serif font-medium text-stone-100 group-hover:text-amber-200 transition-colors mt-0.5">
                The Sacred Groves of Vrindavan & The Flute of Divine Love
              </h3>
              <p className="text-xs font-sans text-stone-300 mt-1 line-clamp-2">
                Discover the pastoral leelas of Gokula, Govardhana hill, and the full moon Raas Leela representing the soul's supreme union with God.
              </p>
            </div>
          </div>

          {/* Card 2: Vishvarupa Cosmic Form */}
          <div 
            onClick={() => {
              const metaphysicsArticle = ENCYCLOPEDIA_ARTICLES.find(a => a.id === 'atman-brahman');
              if (metaphysicsArticle) setActiveArticle(metaphysicsArticle);
            }}
            className="group cursor-pointer relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-xs hover:shadow-md transition-all h-64 sm:h-72"
          >
            <img
             src={vishvarupaImage}
              alt="The Vishvarupa cosmic universal form of Krishna"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <span className="text-[11px] font-sans uppercase tracking-widest text-indigo-300">
                Cosmic Revelation · Vishvarupa Darshana
              </span>
              <h3 className="text-xl font-serif font-medium text-stone-100 group-hover:text-indigo-200 transition-colors mt-0.5">
                The Multiverse in Krishna: Atman, Brahman & Universal Form
              </h3>
              <p className="text-xs font-sans text-stone-300 mt-1 line-clamp-2">
                Chapter 11's blinding revelation of infinite suns, galaxies, and time, unveiling the all-pervading conscious substratum.
              </p>
            </div>
          </div>

        </div>

        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100/80 rounded-xl border border-stone-200/60 overflow-x-auto no-scrollbar mb-8 font-sans">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-amber-400/60 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center gap-2 text-xs font-sans text-stone-500 mb-2">
                  <span className="text-amber-800 font-medium">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Sanskrit Title Kicker */}
                <div className="text-xs font-serif text-stone-400">
                  {article.sanskritTitle}
                </div>

                {/* Article Title */}
                <h3 className="text-xl font-serif font-medium text-stone-900 group-hover:text-amber-900 transition-colors mt-1 leading-snug">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="mt-3 text-xs sm:text-sm font-sans text-stone-600 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              {/* Card Footer: Terms & CTA */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-sans text-stone-500">
                  <Tag className="w-3 h-3 text-stone-400" />
                  <span className="line-clamp-1 max-w-[170px]">{article.keyTerms[0]}</span>
                </div>

                <span className="text-xs font-sans font-medium text-amber-800 group-hover:text-amber-950 flex items-center gap-1">
                  <span>Read Entry</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 text-xs font-sans text-stone-500">
                <span className="text-amber-800 font-medium">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="mt-6">
              <div className="text-xs font-serif text-amber-800 uppercase tracking-wider mb-1">
                {activeArticle.sanskritTitle}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 leading-tight">
                {activeArticle.title}
              </h2>

              <p className="mt-4 text-base font-sans text-stone-700 leading-relaxed font-normal bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                {activeArticle.summary}
              </p>

              {/* Sections with Drop-Caps and Quotes */}
              <div className="mt-8 space-y-6">
                {activeArticle.contentSections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg font-serif font-semibold text-stone-900">
                      {sec.heading}
                    </h3>
                    <p className={`font-sans text-sm sm:text-base leading-relaxed text-stone-800 ${
                      idx === 0
                        ? 'first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-amber-900'
                        : ''
                    }`}>
                      {sec.body}
                    </p>

                    {sec.quote && (
                      <div className="bg-[#FAF7F2] p-4 rounded-xl border-y border-stone-200 my-4">
                        <p className="font-serif italic text-base text-amber-950">
                          "{sec.quote.sanskrit}"
                        </p>
                        <p className="text-xs font-sans text-stone-600 mt-1">
                          — {sec.quote.source}: {sec.quote.translation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Scriptural Sources */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h4 className="text-xs font-sans uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Scriptural Foundations (Pramana)
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-sans text-stone-600">
                  {activeArticle.scripturalSources.map((source, i) => (
                    <span key={i} className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded-md">
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              {/* Practical Life Application */}
              <div className="mt-6 bg-amber-50/60 border border-amber-200/70 p-4 rounded-xl">
                <span className="text-xs font-sans uppercase tracking-wider text-amber-900 font-semibold block mb-1">
                  Living the Teaching
                </span>
                <p className="text-xs sm:text-sm font-sans text-stone-800 leading-relaxed">
                  {activeArticle.practicalApplication}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 font-sans"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
