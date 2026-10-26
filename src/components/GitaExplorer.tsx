import React, { useState } from 'react';
import { GITA_CHAPTERS, Chapter, Shloka } from '../data/gitaData';
import { Search, Volume2, Sparkles, Copy, Check, Bookmark, BookOpen, Layers } from 'lucide-react';
import { vedicAudio } from '../utils/audioSynthesizer';

export const GitaExplorer: React.FC = () => {
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(2);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeShlokaInsight, setActiveShlokaInsight] = useState<{
    shloka: Shloka;
    loading: boolean;
    analysis?: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('vedic_gita_bookmarks') || '["2-47"]');
    } catch {
      return ['2-47'];
    }
  });

  const selectedChapter = GITA_CHAPTERS.find(c => c.number === selectedChapterNum) || GITA_CHAPTERS[1];

  const toggleBookmark = (id: string) => {
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter(b => b !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('vedic_gita_bookmarks', JSON.stringify(updated));
    } catch {}
  };

  const copyToClipboard = (shloka: Shloka) => {
    const text = `${shloka.sanskrit}\n\n${shloka.transliteration}\n\nTranslation: ${shloka.translation}\n— Bhagavad Gita ${shloka.chapter}.${shloka.verse}`;
    navigator.clipboard.writeText(text);
    setCopiedId(shloka.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handlePlayTone = (shloka: Shloka) => {
    vedicAudio.playMantraToneSequence();
  };

  const fetchAIExegesis = async (shloka: Shloka) => {
    setActiveShlokaInsight({ shloka, loading: true });
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/shloka-insight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter: shloka.chapter,
          verse: shloka.verse,
          shlokaText: shloka.translation,
        }),
      });
      const data = await res.json();
      setActiveShlokaInsight({
        shloka,
        loading: false,
        analysis: data.analysis || data.insight || 'Wisdom illuminates the disciplined mind.',
      });
    } catch (err) {
      setActiveShlokaInsight({
        shloka,
        loading: false,
        analysis: 'This immortal verse encapsulates the eternal essence of Vedic non-duality and selfless action. When the mind rests in equanimity, action flows unimpeded by anxiety.',
      });
    }
  };

  // Filter shlokas across all chapters if searching, else show selected chapter's shlokas
  const allShlokas = GITA_CHAPTERS.flatMap(c => c.keyShlokas);
  const filteredShlokas = searchQuery.trim()
    ? allShlokas.filter(s => 
        s.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.sanskrit.includes(searchQuery) ||
        s.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.keyConcepts.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : selectedChapter.keyShlokas;

  return (
    <div className="py-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-stone-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-sans text-stone-500 mb-1">
              Shrimad Bhagavad Gita · The Celestial Song
            </div>
            <h2 className="text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Interactive Shloka Exegesis & 18 Yogas
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search verses, Sanskrit terms, themes..."
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

        {/* Chapter Carousel / Selector (Shown if not searching) */}
        {!searchQuery && (
          <div className="mb-8">
            <div className="text-xs font-sans text-stone-500 mb-2 uppercase tracking-wider">
              Select Chapter (1 to 18)
            </div>
            <div className="flex gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar">
              {GITA_CHAPTERS.map((ch) => {
                const isSelected = ch.number === selectedChapterNum;
                return (
                  <button
                    key={ch.number}
                    onClick={() => setSelectedChapterNum(ch.number)}
                    className={`px-4 py-2.5 rounded-lg border text-left shrink-0 transition-all font-sans ${
                      isSelected
                        ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-sm'
                        : 'bg-white border-stone-300 text-stone-700 hover:border-amber-700/50 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-medium opacity-90">
                      <span>Chapter {ch.number}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[11px]">{ch.verseCount}v</span>
                    </div>
                    <div className="text-xs font-serif font-semibold mt-0.5 whitespace-nowrap">
                      {ch.englishTitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Chapter Banner */}
            <div className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-xs mt-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-sans text-amber-800 font-medium">
                    {selectedChapter.yogaType} · {selectedChapter.sanskritTitle}
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-stone-900 mt-1">
                    Chapter {selectedChapter.number}: {selectedChapter.englishTitle}
                  </h3>
                  <p className="text-sm font-sans text-stone-700 mt-2 max-w-3xl leading-relaxed">
                    {selectedChapter.summary}
                  </p>
                </div>
              </div>

              {/* Core Chapter Takeaways */}
              <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedChapter.coreTeachings.map((teaching, i) => (
                  <div key={i} className="text-xs font-sans text-stone-600 flex items-start gap-2">
                    <span className="text-amber-700 font-bold shrink-0">0{i + 1}.</span>
                    <span>{teaching}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Shlokas Listing */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-sans text-stone-500">
            <span>
              Showing {filteredShlokas.length} {filteredShlokas.length === 1 ? 'shloka' : 'shlokas'}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          {filteredShlokas.length === 0 ? (
            <div className="text-center py-16 bg-white border border-dashed border-stone-300 rounded-xl">
              <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-stone-700 font-serif text-lg">No shlokas found for this search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-medium text-amber-800 underline"
              >
                Reset search
              </button>
            </div>
          ) : (
            filteredShlokas.map((shloka) => {
              const isBookmarked = bookmarkedIds.includes(shloka.id);
              const isCopied = copiedId === shloka.id;

              return (
                <article
                  key={shloka.id}
                  className="bg-white border border-stone-200/90 rounded-xl p-6 sm:p-8 shadow-xs hover:border-amber-400/60 transition-all group"
                >
                  {/* Top Bar for Shloka */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-stone-100 text-stone-800 rounded">
                        BG {shloka.chapter}.{shloka.verse}
                      </span>
                      <span className="text-xs font-sans text-stone-500">
                        {shloka.theme}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audio recitation sequence */}
                      <button
                        onClick={() => handlePlayTone(shloka)}
                        title="Chant Sanskrit Melodic Tone"
                        className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Copy */}
                      <button
                        onClick={() => copyToClipboard(shloka)}
                        title="Copy Sanskrit and Translation"
                        className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded transition-colors"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={() => toggleBookmark(shloka.id)}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Shloka'}
                        className={`p-1.5 rounded transition-colors ${
                          isBookmarked
                            ? 'text-amber-700 bg-amber-50'
                            : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      {/* Deep AI Exegesis */}
                      <button
                        onClick={() => fetchAIExegesis(shloka)}
                        className="ml-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-md text-xs font-medium font-sans flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>AI Exegesis</span>
                      </button>
                    </div>
                  </div>

                  {/* Shloka Body */}
                  <div className="mt-5 space-y-4">
                    {/* Sanskrit Devanagari */}
                    <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-lg border border-amber-900/10 text-stone-900">
                      <p className="font-serif text-lg sm:text-xl leading-relaxed whitespace-pre-line tracking-wide text-amber-950">
                        {shloka.sanskrit}
                      </p>
                      <p className="mt-2.5 font-sans italic text-xs sm:text-sm text-stone-600 tracking-wide">
                        {shloka.transliteration}
                      </p>
                    </div>

                    {/* Word-for-Word Breakdown */}
                    <div className="text-xs font-sans text-stone-600 bg-stone-50 p-3.5 rounded-lg border border-stone-200/60 leading-relaxed">
                      <span className="font-semibold text-stone-800 block mb-1">Word-for-Word Translation (Anvaya):</span>
                      {shloka.wordForWord}
                    </div>

                    {/* Translation */}
                    <div>
                      <div className="text-xs font-sans uppercase tracking-wider text-stone-400 font-semibold mb-1">
                        Translation
                      </div>
                      <p className="font-serif text-base sm:text-lg text-stone-900 leading-relaxed font-normal">
                        "{shloka.translation}"
                      </p>
                    </div>

                    {/* Classical Commentary */}
                    <div className="pt-2">
                      <div className="text-xs font-sans uppercase tracking-wider text-stone-400 font-semibold mb-1">
                        Philosophical Insight
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {shloka.commentary}
                      </p>
                    </div>

                    {/* Key Terms */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-sans text-stone-500">
                      <span className="font-medium text-stone-700">Key Vedic Concepts:</span>
                      {shloka.keyConcepts.map((k, idx) => (
                        <React.Fragment key={k}>
                          <span className="text-amber-800 font-medium">{k}</span>
                          {idx < shloka.keyConcepts.length - 1 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      {/* AI Exegesis Modal */}
      {activeShlokaInsight && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <h4 className="font-serif text-xl font-medium text-stone-900">
                  Philosophical Exegesis · BG {activeShlokaInsight.shloka.chapter}.{activeShlokaInsight.shloka.verse}
                </h4>
              </div>
              <button
                onClick={() => setActiveShlokaInsight(null)}
                className="text-stone-400 hover:text-stone-700 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <div className="bg-[#FAF7F2] p-3 rounded-lg border border-amber-900/10 mb-4 text-xs font-serif italic text-stone-700">
                "{activeShlokaInsight.shloka.translation}"
              </div>

              {activeShlokaInsight.loading ? (
                <div className="py-12 text-center">
                  <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm font-sans text-stone-600">
                    Consulting Vedic commentaries and philosophical traditions...
                  </p>
                </div>
              ) : (
                <div className="prose prose-stone text-sm font-sans leading-relaxed text-stone-800 whitespace-pre-line space-y-3">
                  {activeShlokaInsight.analysis}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setActiveShlokaInsight(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 font-sans"
              >
                Close Exegesis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
