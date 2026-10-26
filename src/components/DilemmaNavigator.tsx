import React, { useState } from 'react';
import { DILEMMA_PRESETS, DilemmaPreset } from '../data/interactiveTeachings';
import { Compass, Sparkles, CheckCircle2, ArrowRight, Copy, Check, Volume2 } from 'lucide-react';
import { vedicAudio } from '../utils/audioSynthesizer';

interface DilemmaResult {
  gitaChapter: string;
  primaryShloka: {
    sanskrit: string;
    transliteration: string;
    reference: string;
    translation: string;
  };
  philosophicalDiagnosis: string;
  krishnaGuidance: string;
  practicalActionSteps: string[];
  contemplationMantra: string;
}

export const DilemmaNavigator: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DILEMMA_PRESETS[0].id);
  const [customDilemma, setCustomDilemma] = useState<string>('');
  const [lifeDomain, setLifeDomain] = useState<string>('Career & Duty');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DilemmaResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedPreset = DILEMMA_PRESETS.find(p => p.id === selectedPresetId);

  const handleResolve = async (dilemmaText: string, domain: string) => {
    setLoading(true);
    setResult(null);

    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/dilemma`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dilemma: dilemmaText, lifeDomain: domain })
      });
      const data = await res.json();
      setResult(data);
      vedicAudio.playTempleBell(528);
    } catch (err) {
      // Graceful fallback
      setResult({
        gitaChapter: "Chapter 2: Sankhya Yoga (The Way of Self-Knowledge)",
        primaryShloka: {
          sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
          transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
          reference: "Bhagavad Gita 2.47",
          translation: "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor let your attachment be to inaction."
        },
        philosophicalDiagnosis: "Your current mental unrest arises from the natural friction between the mode of passion (Rajas) and fear of outcome, obscuring the steady light of your inner Self (Atman).",
        krishnaGuidance: "Do not let imaginary future scenarios paralyze your present noble duty. Act with devotion, uphold justice with courage, and leave the unfolding of time to cosmic law.",
        practicalActionSteps: [
          "Disentangle your self-worth from the praise or criticism of others.",
          "Identify the one clear ethical duty (Svadharma) right before you and execute it cleanly.",
          "Observe anxious thoughts as passing weather rather than defining truths.",
          "Dedicate your labor as an offering to the universal good."
        ],
        contemplationMantra: "योगस्थः कुरु कर्माणि (Perform your duty established in equanimity)."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!result) return;
    const text = `Vedic Dilemma Resolution:\n\n${result.gitaChapter}\n${result.primaryShloka.reference}: "${result.primaryShloka.translation}"\n\nDiagnosis: ${result.philosophicalDiagnosis}\n\nKrishna's Guidance:\n${result.krishnaGuidance}\n\nAction Steps:\n${result.practicalActionSteps.map((s, i) => `${i+1}. ${s}`).join('\n')}\n\nContemplation: ${result.contemplationMantra}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-6 mb-8">
          <div className="text-xs uppercase tracking-widest font-sans text-stone-500 mb-1">
            Kurukshetra Moral Navigator
          </div>
          <h2 className="text-3xl font-serif font-medium text-stone-900 tracking-tight">
            Resolve Real-World Dilemmas Through Gita Wisdom
          </h2>
          <p className="mt-2 text-sm font-sans text-stone-700 max-w-3xl leading-relaxed">
            Just as Arjuna faced acute moral and emotional paralysis on the battlefield, we face complex ethical crossroads in work, family, and relationships. Apply the diagnostic framework of Krishna's dialogue to untangle your path.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Preset Selection & Custom Input */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Presets Card */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-sans font-semibold text-stone-900 uppercase tracking-wider mb-3">
                1. Select Common Life Dilemma
              </h3>

              <div className="space-y-2.5">
                {DILEMMA_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id && !customDilemma;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPresetId(preset.id);
                        setCustomDilemma('');
                      }}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all font-sans ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500'
                          : 'bg-white border-stone-200 hover:border-amber-400/60 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-stone-800">{preset.title}</span>
                        <span className="text-stone-500 text-[11px]">{preset.domain}</span>
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {preset.description}
                      </p>
                      <div className="mt-2 text-[11px] text-amber-800 font-medium">
                        Arjuna Parallel: {preset.arjunaParallel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Dilemma Form */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-sans font-semibold text-stone-900 uppercase tracking-wider mb-2">
                2. Or Enter Your Own Specific Situation
              </h3>
              
              <div className="mb-3">
                <label className="block text-xs font-sans text-stone-600 mb-1">Context / Realm</label>
                <select
                  value={lifeDomain}
                  onChange={(e) => setLifeDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-sans text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option>Career, Work & Leadership</option>
                  <option>Family, Marriage & Duty</option>
                  <option>Internal Peace & Anxiety</option>
                  <option>Moral Conflict & Integrity</option>
                  <option>Grief, Loss & Major Life Transitions</option>
                </select>
              </div>

              <textarea
                rows={4}
                placeholder="Describe what you are torn between (e.g. 'I was offered a lucrative position that conflicts with my values, but declining it might upset my family...')"
                value={customDilemma}
                onChange={(e) => setCustomDilemma(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />

              <button
                onClick={() => {
                  const text = customDilemma.trim() || (selectedPreset?.description || '');
                  handleResolve(text, lifeDomain);
                }}
                disabled={loading}
                className="w-full mt-4 py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-300 text-amber-950 font-sans font-medium text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-amber-900 border-t-transparent rounded-full animate-spin" />
                    <span>Consulting Divine Charioteer...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-900" />
                    <span>Analyze & Resolve with Gita</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Solution Card */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Result Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-sans text-amber-800 font-semibold">
                      Scriptural Exegesis
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 mt-0.5">
                      {result.gitaChapter}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => vedicAudio.playMantraToneSequence()}
                      title="Play Meditation Tone"
                      className="p-2 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={copyResult}
                      className="px-3 py-1.5 text-xs font-sans font-medium border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Counsel'}</span>
                    </button>
                  </div>
                </div>

                {/* Shloka Citation Card */}
                <div className="bg-[#FAF7F2] border border-amber-900/15 rounded-xl p-5">
                  <div className="text-xs font-mono font-semibold text-amber-900 mb-1">
                    {result.primaryShloka.reference}
                  </div>
                  <p className="font-serif text-base sm:text-lg text-amber-950 font-normal leading-relaxed">
                    {result.primaryShloka.sanskrit}
                  </p>
                  <p className="text-xs font-sans italic text-stone-600 mt-1">
                    {result.primaryShloka.transliteration}
                  </p>
                  <p className="text-xs sm:text-sm font-sans text-stone-800 mt-2 font-medium">
                    "{result.primaryShloka.translation}"
                  </p>
                </div>

                {/* Philosophical Diagnosis */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-sans font-semibold text-stone-500 mb-1.5">
                    Root Psychological Diagnosis (Gunas & Maya)
                  </h4>
                  <p className="text-sm font-sans text-stone-800 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                    {result.philosophicalDiagnosis}
                  </p>
                </div>

                {/* Krishna's Direct Counsel */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-sans font-semibold text-amber-800 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Charioteer's Counsel</span>
                  </h4>
                  <p className="text-sm font-sans text-stone-900 leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-200/70">
                    {result.krishnaGuidance}
                  </p>
                </div>

                {/* Action Steps */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-sans font-semibold text-stone-500 mb-2">
                    Actionable Steps for Svadharma & Peace
                  </h4>
                  <div className="space-y-2.5">
                    {result.practicalActionSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-stone-200 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm font-sans text-stone-800 leading-relaxed">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meditation Mantra */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-sans text-stone-600">
                  <div>
                    <span className="font-semibold text-stone-800">Contemplation Seed: </span>
                    <span className="font-serif italic text-amber-900">{result.contemplationMantra}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 mb-4">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-900">
                  Ready to Navigate Your Kurukshetra
                </h3>
                <p className="mt-2 text-sm font-sans text-stone-600 max-w-md">
                  Select a common moral dilemma on the left, or articulate your own specific circumstances. The AI Charioteer will map it to the Gita's eternal principles.
                </p>
                <button
                  onClick={() => {
                    const text = selectedPreset?.description || DILEMMA_PRESETS[0].description;
                    handleResolve(text, 'Career & Duty');
                  }}
                  className="mt-6 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium font-sans flex items-center gap-2"
                >
                  <span>Resolve Sample Dilemma</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
