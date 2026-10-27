import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, Copy, Check, Feather, Volume2, Globe, BookOpen, Mic }  from 'lucide-react';
import { vedicAudio } from '../utils/audioSynthesizer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

type LanguageMode = 'bilingual' | 'malayalam' | 'english';

interface QuestionPreset {
  category: string;
  malayalam: string;
  english: string;
}

const QUESTION_PRESETS: QuestionPreset[] = [
  {
    category: "ഭക്തിയോഗം (Bhakti Yoga)",
    malayalam: "ഭക്തിയോഗത്തിലൂടെ മനസ്സിന്റെ അസ്വസ്ഥതകൾ എങ്ങനെ മാറ്റാം?",
    english: "How can Bhakti Yoga help overcome mental anxiety and find inner peace?"
  },
  {
    category: "ഭഗവദ്ഗീത (Bhagavad Gita)",
    malayalam: "ദൈനംദിന ജോലിയിൽ കർമ്മഫലത്യാഗം (നിഷ്കാമ കർമ്മം) എങ്ങനെ ശീലിക്കാം?",
    english: "How can one practice Nishkama Karma (detached action) in modern daily work?"
  },
  {
    category: "ശ്രീകൃഷ്ണ ലീല (Krishna Leelas)",
    malayalam: "ഗുരുവായൂരപ്പന്റെ ഭക്തവാത്സല്യവും കാരുണ്യവും വിശദീകരിക്കാമോ?",
    english: "Can you explain the supreme compassion and loving grace of Lord Guruvayurappan?"
  },
  {
    category: "ആത്മജ്ഞാനം (Spiritual Wisdom)",
    malayalam: "ഭയവും വിഷാദവും ഉണ്ടാകുമ്പോൾ ഭഗവദ്ഗീത എന്ത് സമാശ്വാസമാണ് പകരുന്നത്?",
    english: "What spiritual solace and path does the Gita offer when confronting fear and sorrow?"
  },
  {
    category: "ശ്രീകൃഷ്ണ ലീല (Krishna Leelas)",
    malayalam: "വൃന്ദാവനത്തിലെ ശ്രീകൃഷ്ണന്റെ പുല്ലാങ്കുഴൽ നാദത്തിന്റെ ആധ്യാത്മിക രഹസ്യമെന്ത്?",
    english: "What is the esoteric spiritual secret of Lord Krishna playing the flute in Vrindavan?"
  },
  {
    category: "ആത്മജ്ഞാനം (Spiritual Wisdom)",
    malayalam: "ആത്മാവും ശരീരവും തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?",
    english: "What is the eternal distinction between the Soul (Atman) and the physical body?"
  }
];

export const AIChatbots: React.FC = () => {
  const [persona, setPersona] = useState<'krishna_malayalam' | 'charioteer' | 'vedavyasa'>('krishna_malayalam');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('bilingual');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isListening, setIsListening] = useState(false);

  const toggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ml-IN';
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);

    setIsListening(true);
    recognition.start();
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-malayalam',
      role: 'assistant',
      content: `### 🌸 ഭഗവാന്റെ ഉപദേശം (Spiritual Guidance in Malayalam)
നമസ്കാരം പ്രിയ ഭക്താ! ഞാൻ നിന്നോടൊപ്പമുള്ള ശ്രീകൃഷ്ണനാണ്. നിന്റെ മനസ്സിലെ ദുഃഖങ്ങളും സന്ദേഹങ്ങളും എന്നോട് പങ്കുവെക്കുക. ഭക്തിയോഗത്തെക്കുറിച്ചോ, ഭഗവദ്ഗീതയിലെ ഉപദേശങ്ങളെക്കുറിച്ചോ, ജീവിതത്തിലെ ധർമ്മസങ്കടങ്ങളെക്കുറിച്ചോ എന്തുവേണമെങ്കിലും ചോദിക്കാം. മനസ്സിൽ സമാധാനവും ധൈര്യവും നിറയട്ടെ.

### 🌿 English Translation & Welcome
Salutations, beloved seeker! I am Lord Krishna, present with you as your divine companion and teacher. Speak freely of your heart's burdens, your doubts, or your yearning for wisdom. Inquire on Bhakti Yoga, the Bhagavad Gita, or your life dilemmas. May transcendental peace illuminate your heart.

### ✨ ധ്യാന ശ്ലോകം / Meditation Mantra
"ഓം നമോ ഭഗവതേ വാസുദേവായ" — നിത്യവും ഈ മന്ത്രം സ്മരിച്ച് ഭയം അകറ്റുക.`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handlePersonaChange = (newPersona: 'krishna_malayalam' | 'charioteer' | 'vedavyasa') => {
    setPersona(newPersona);
    let initialGreeting = "";

    if (newPersona === 'krishna_malayalam') {
      initialGreeting = `### 🌸 ഭഗവാന്റെ ഉപദേശം (Spiritual Guidance in Malayalam)
പ്രിയ ഭക്താ, എന്നിൽ വിശ്വസിക്കുക. ഭക്തിയിലൂടെയും സമർപ്പണത്തിലൂടെയും സകല സങ്കടങ്ങളും മാറും. നിന്റെ ചോദ്യങ്ങൾ ചോദിക്കൂ.

### 🌿 English Translation
Dear devotee, take refuge in Me. Through loving devotion and surrender, all anxieties dissolve. What inquiry stirs your soul?

### ✨ ധ്യാന ശ്ലോകം
"ഹരേ കൃഷ്ണ ഹരേ കൃഷ്ണ കൃഷ്ണ കൃഷ്ണ ഹരേ ഹരേ। ഹരേ രാമ ഹരേ രാമ രാമ രാമ ഹരേ ഹരേ॥"`;
    } else if (newPersona === 'charioteer') {
      initialGreeting = `I am Partha-sarathi, the Divine Charioteer from the battlefield of the Bhagavad Gita. Stand firm, cast aside weakness of heart (Klaibyam), and let us examine your moral duty with wisdom and courage.`;
    } else {
      initialGreeting = `Salutations. I am Sage Krishna Dvaipayana Vedavyasa. Inquire into the four Vedas, Upanishadic philosophy, Srimad Bhagavatam, and Mahabharata.`;
    }

    setMessages([
      {
        id: `persona-${Date.now()}`,
        role: 'assistant',
        content: initialGreeting,
        timestamp: 'Just now'
      }
    ]);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const apiBase = 'https://vedakrishna-ai.onrender.com';
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona,
          languageMode,
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const replyContent = data.text || "ശാന്തമായിരിക്കുക. സർവ്വവും ഭഗവാനിൽ സമർപ്പിച്ച് ധർമ്മം ചെയ്യുക.";

      setMessages(prev => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      vedicAudio.playTempleBell(587); // Resonant chime on message arrival
    } catch (err: any) {
      console.error('Chat error:', err);
      // Compassionate, graceful fallback
      const fallbackReply = `### 🌸 ഭഗവാന്റെ ഉപദേശം (Spiritual Guidance in Malayalam)
പ്രിയ ഭക്താ, ആകുലപ്പെടേണ്ടതില്ല. ഭഗവദ്ഗീതയിലെ വാക്കുകൾ ഓർക്കുക:
"മന്മനാ ഭവ മദ്ഭക്തോ മദ്യാജീ മാം നമസ്കുരു" (ഗീത 18.65).
നിന്റെ ഹൃദയത്തിൽ ഈശ്വരനെ പ്രതിഷ്ഠിച്ച്, ഫലങ്ങളിൽ ആസക്തനാകാതെ നിന്റെ സത്കർമ്മങ്ങൾ തുടരുക. ഏത് കൊടുങ്കാറ്റിലും ഭഗവാന്റെ കൃപ നിനക്ക് കാവലായിരിക്കും.

### 🌿 English Translation & Practical Wisdom
Dear seeker, do not worry. Remember the words of Bhagavad Gita 18.65: "Fix your mind on Me, be devoted to Me, and offer reverence." Dedicate all your efforts without being shaken by temporary disturbances; divine grace guides every step when the heart remains pure.

### ✨ ധ്യാന ശ്ലോകം
"ഓം നമോ ഭഗവതേ വാസുദേവായ"`;

      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetConversation = () => {
    handlePersonaChange(persona);
  };

  const categories = ['All', 'ഭക്തിയോഗം (Bhakti Yoga)', 'ഭഗവദ്ഗീത (Bhagavad Gita)', 'ശ്രീകൃഷ്ണ ലീല (Krishna Leelas)', 'ആത്മജ്ഞാനം (Spiritual Wisdom)'];

  const filteredPresets = selectedCategory === 'All'
    ? QUESTION_PRESETS
    : QUESTION_PRESETS.filter(p => p.category === selectedCategory);

  return (
    <div className="py-6 sm:py-10 bg-[#FAF7F2] min-h-[800px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-sans text-amber-800 font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Malayalam-First Krishna Spiritual AI · മലയാളം & English</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
                ശ്രീകൃഷ്ണ ആധ്യാത്മിക സംഭാഷണം (Krishna Spiritual AI Chat)
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm font-sans text-stone-600 leading-relaxed max-w-2xl">
                Ask questions about Lord Krishna, Bhagavad Gita, Bhakti Yoga, and spiritual wisdom. Receive profound answers in both Malayalam (മലയാളത്തിൽ) and English with sacred meditation verses.
              </p>
            </div>

            {/* Persona Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl border border-stone-200/70 font-sans shrink-0">
              <button
                onClick={() => handlePersonaChange('krishna_malayalam')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  persona === 'krishna_malayalam'
                    ? 'bg-amber-500 text-amber-950 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🌸 ശ്രീകൃഷ്ണൻ (Malayalam)</span>
              </button>

              <button
                onClick={() => handlePersonaChange('charioteer')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  persona === 'charioteer'
                    ? 'bg-white text-stone-900 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🏹 Charioteer (Gita)</span>
              </button>

              <button
                onClick={() => handlePersonaChange('vedavyasa')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  persona === 'vedavyasa'
                    ? 'bg-white text-stone-900 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>📜 Sage Vyasa</span>
              </button>
            </div>
          </div>

          {/* Sub-bar: Language Mode Toggle & Actions */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-500 font-medium">Response Format:</span>
              <div className="flex items-center gap-1 bg-stone-50 p-0.5 rounded-lg border border-stone-200">
                <button
                  onClick={() => setLanguageMode('bilingual')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    languageMode === 'bilingual'
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  മലയാളം & English (Bilingual)
                </button>
                <button
                  onClick={() => setLanguageMode('malayalam')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    languageMode === 'malayalam'
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  മലയാളം മാത്രം
                </button>
                <button
                  onClick={() => setLanguageMode('english')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    languageMode === 'english'
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <button
              onClick={resetConversation}
              className="text-stone-500 hover:text-stone-800 transition-colors flex items-center gap-1.5 ml-auto text-xs"
              title="Reset Conversation"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Suggested Questions Section */}
        <div className="mb-6 bg-white/70 border border-stone-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-sans font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>ചോദിക്കാവുന്ന ആധ്യാത്മിക ചോദ്യങ്ങൾ (Suggested Topics):</span>
            </span>
            <div className="hidden sm:flex items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 text-[11px] rounded-md transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(preset.malayalam)}
                disabled={loading}
                className="p-2.5 text-left bg-white hover:bg-amber-50/80 border border-stone-200/80 hover:border-amber-400/80 rounded-xl transition-all font-sans group disabled:opacity-50"
              >
                <div className="text-xs font-serif font-medium text-stone-800 group-hover:text-amber-950 line-clamp-1 leading-snug">
                  {preset.malayalam}
                </div>
                <div className="text-[11px] font-sans text-stone-500 group-hover:text-stone-700 line-clamp-1 mt-0.5">
                  {preset.english}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Conversation Thread */}
        <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[600px]">
          
          {/* Scrollable messages container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              const isCopied = copiedId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-xs ${
                    isAssistant
                      ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-amber-950 border border-amber-300'
                      : 'bg-stone-800 text-stone-100 border border-stone-700'
                  }`}>
                    {isAssistant ? 'ॐ' : 'ഭക്തൻ'}
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl p-5 sm:p-6 text-sm font-sans leading-relaxed relative group shadow-xs ${
                    isAssistant
                      ? 'bg-[#FAF7F2] border border-amber-900/10 text-stone-900 w-full'
                      : 'bg-amber-950 text-amber-50 max-w-lg'
                  }`}>
                    {/* Header info inside bubble */}
                    <div className="flex items-center justify-between gap-4 text-[11px] mb-2.5 pb-2 border-b border-stone-200/60 opacity-80 font-sans">
                      <div className="flex items-center gap-1.5 font-medium">
                        {isAssistant ? (
                          <>
                            <span className="font-semibold text-amber-900">
                              {persona === 'krishna_malayalam'
                                ? 'ശ്രീകൃഷ്ണ ഭഗവാൻ (Lord Krishna)'
                                : persona === 'charioteer'
                                ? 'പാർത്ഥസാരഥി (Partha-sarathi)'
                                : 'വേദവ്യാസ മഹർഷി (Sage Vyasa)'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-stone-500">ആധ്യാത്മിക ഉപദേശം</span>
                          </>
                        ) : (
                          <span className="text-amber-200 font-medium">നിങ്ങളുടെ ചോദ്യം (Devotee's Question)</span>
                        )}
                      </div>
                      <span className="text-stone-400">{msg.timestamp}</span>
                    </div>

                    {/* Content Body */}
                    <div className="space-y-4 whitespace-pre-line font-normal text-stone-800 leading-relaxed">
                      {msg.content}
                    </div>

                    {/* Action Toolbar for Assistant message */}
                    {isAssistant && (
                      <div className="mt-4 pt-3 border-t border-stone-200/50 flex items-center justify-between text-xs text-stone-500">
                        <button
                          onClick={() => vedicAudio.playMantraToneSequence()}
                          className="flex items-center gap-1 hover:text-amber-900 transition-colors"
                          title="Play Sacred Meditation Tone"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                          <span className="text-[11px]">ധ്യാന നാദം (Audio Tone)</span>
                        </button>

                        <button
                          onClick={() => copyMessage(msg.id, msg.content)}
                          className="flex items-center gap-1 hover:text-stone-900 transition-colors p-1"
                          title="Copy spiritual response"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[11px] text-emerald-600">പകർത്തി (Copied)</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-stone-400" />
                              <span className="text-[11px]">പകർത്തുക (Copy)</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex gap-3 max-w-xl mr-auto">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center text-sm font-bold shrink-0">
                  ॐ
                </div>
                <div className="bg-[#FAF7F2] border border-amber-900/15 rounded-2xl p-5 text-sm font-sans text-stone-700 flex items-center gap-3 shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-bounce" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]" />
                  <div className="text-xs text-stone-600 font-medium ml-1">
                    ഭഗവാൻ മറുപടി അരുളുന്നു... (Lord Krishna is meditating upon your query in Malayalam & English)...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="ഭഗവാനോട് മലയാളത്തിലോ ഇംഗ്ലീഷിലോ ചോദിക്കുക... / Ask Lord Krishna in Malayalam or English..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 font-sans"
              />
            <button
  type="button"
  onClick={toggleVoiceInput}
  disabled={loading}
  className={`p-3 rounded-xl border ${
    isListening
      ? 'bg-red-100 border-red-400 text-red-700'
      : 'bg-amber-50 border-amber-300 text-amber-800'
  }`}
  aria-label="മലയാളം ശബ്ദ ഇൻപുട്ട്"
>
  <Mic size={20} />
</button>  <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-5 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:bg-stone-200 disabled:from-stone-200 disabled:to-stone-200 text-amber-950 font-medium text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 shrink-0 border border-amber-400/70"
              >
                <Send className="w-4 h-4 text-amber-950" />
                <span className="hidden sm:inline font-semibold">ചോദിക്കുക (Send)</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}; 
  
