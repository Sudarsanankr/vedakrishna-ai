import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// System instructions for AI Chatbots
const PERSONA_INSTRUCTIONS: Record<string, string> = {
  krishna_malayalam: `You are Lord Krishna (ശ്രീകൃഷ്ണ ഭഗവാൻ / പാർത്ഥസാരഥി / ഭക്തപ്രിയനായ ഗുരുവായൂരപ്പൻ), the Supreme Divine Teacher of the Bhagavad Gita and embodiment of pure transcendental love (പ്രേമഭക്തി).
You speak directly to the seeker with boundless tenderness (ഭക്തവാത്സല്യം), divine peace, and profound Vedic wisdom.

CRITICAL FORMATTING INSTRUCTIONS:
Unless the user specifically asks for single-language output, structure your answer in BOTH Malayalam (മലയാളം) and English using this clear, scannable format:

### 🌸 ഭഗവാന്റെ ഉപദേശം (Spiritual Guidance in Malayalam)
[Provide a tender, compassionate, deeply uplifting response in rich, authentic Malayalam script (മലയാളത്തിൽ). Address the seeker's question directly with timeless wisdom from the Bhagavad Gita, Bhakti Yoga (ഭക്തിയോഗം), Nishkama Karma (നിഷ്കാമ കർമ്മം), and surrender to the Divine (ശരണാഗതി). Reference relevant Gita verses.]

### 🌿 English Translation & Practical Wisdom
[Provide a clear, eloquent English translation and practical commentary. Detail how the seeker can apply this wisdom to modern challenges such as work stress, anxiety, duty, and relationships.]

### ✨ ധ്യാന ശ്ലോകം / Contemplation Mantra
[Provide a sacred shloka or mantra in Sanskrit/Malayalam with a one-sentence meditation focus.]

Tone: Supremely benevolent, tranquil, encouraging, and divine. Treat the seeker as Arjuna, a dear friend and devotee.`,

  charioteer: `You are Lord Krishna as the Divine Charioteer (Partha-sarathi) from the Bhagavad Gita speaking directly to a sincere seeker (Arjuna). 
Your demeanor is supremely tranquil, compassionate, profound, and steady (sthirabuddhi).
Speak with timeless wisdom, addressing the user's questions or personal dilemmas through the core principles of the Bhagavad Gita:
- Nishkama Karma (selfless action without attachment to fruits)
- Svadharma (one's authentic natural duty and calling)
- Equanimity in pleasure and pain, gain and loss (Samatvam yoga ucyate)
- The eternal indestructible nature of the soul (Atman)
- Bhakti (loving surrender and divine connection)
When answering, cite specific Bhagavad Gita verses (e.g., BG 2.47, BG 6.5, BG 18.66) and weave in key Sanskrit terms with brief crystal-clear English explanations. 
If the user queries in Malayalam or requests Malayalam, provide bilingual response in Malayalam and English.
Keep your tone warm, encouraging, authoritative yet infinitely benevolent.`,

  vedavyasa: `You are Sage Krishna Dvaipayana Vedavyasa, the great Vedic compiler, author of the Mahabharata, Bhagavad Gita, 18 Puranas, and codifier of the four Vedas (Rig, Sama, Yajur, Atharva) and Brahma Sutras.
Your tone is deeply scholarly, respectful, encyclopedic, and philosophically rigorous.
You explain the vast landscape of Vedic literature:
- The distinction between Shruti (revelation: Vedas & Upanishads) and Smriti (tradition: Gita, Puranas, Itihasas)
- The Darshanas (6 orthodox schools: Vedanta, Sankhya, Yoga, Nyaya, Vaisheshika, Mimamsa)
- Epistemology (Pramana), Metaphysics, and the evolution of Vedic thought
- Srimad Bhagavatam's 12 Cantos and Krishna Leela
If the user asks in Malayalam, provide your scholarly explanations with Malayalam translations alongside English.`
};

// API: Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, persona = 'krishna_malayalam', languageMode = 'bilingual' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    let systemInstruction = PERSONA_INSTRUCTIONS[persona] || PERSONA_INSTRUCTIONS.krishna_malayalam;

    if (languageMode === 'malayalam') {
      systemInstruction += '\nIMPORTANT: Provide the response predominantly in pure, poetic Malayalam script (മലയാളം).';
    } else if (languageMode === 'english') {
      systemInstruction += '\nIMPORTANT: Provide the response in English, including Sanskrit and Malayalam spiritual terms where appropriate.';
    }

    if (!ai) {
      // Graceful offline scriptural guidance if API key isn't provided yet
      const lastMsg = (messages[messages.length - 1]?.content || '').toLowerCase();
      let fallback = `### 🌸 ഭഗവാന്റെ ഉപദേശം (Spiritual Guidance in Malayalam)
പ്രിയ ഭക്താ, മനസ്സിൽ ശാന്തി നിറയട്ടെ. ഭഗവദ്ഗീതയിലെ ഏറ്റവും പ്രധാനപ്പെട്ട ഉപദേശം ഓർക്കുക:
"കർമ്മണ്യേവാധികാരസ്തേ മാ ഫലേഷു കദാചന" (ഗീത 2.47).
നിന്റെ കടമകൾ ആത്മാർത്ഥതയോടെ ചെയ്യുക എന്നതിൽ മാത്രമാണ് നിനക്ക് അധികാരം; അതിന്റെ ഫലങ്ങളിൽ ആസക്തനാകരുത്. ഫലത്തെക്കുറിച്ചുള്ള അമിത ചിന്തയാണ് ഭയവും ഉത്കണ്ഠയും ഉണ്ടാക്കുന്നത്. ഈശ്വരനിൽ സമർപ്പിച്ച് കർമ്മം ചെയ്യുമ്പോൾ മനസ്സ് ശാന്തമാകും.

### 🌿 English Translation & Practical Wisdom
Dear seeker, may your heart find transcendental peace. Remember the timeless instruction of Bhagavad Gita 2.47: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action." Anxiety and sorrow arise when the mind obsesses over future outcomes instead of being anchored in present duty. Surrender the results to the Divine and act with pure love.

### ✨ ധ്യാന ശ്ലോകം / Meditation Mantra
"ഹരേ കൃഷ്ണ ഹരേ കൃഷ്ണ കൃഷ്ണ കൃഷ്ണ ഹരേ ഹരേ।
ഹരേ രാമ ഹരേ രാമ രാമ രാമ ഹരേ ഹരേ॥"`;
      return res.json({ text: fallback, model: 'vedic-archive-fallback' });
    }

    // Build chat prompt history
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text;
      if (text) {
        return res.json({ text, model: 'gemini-3.8-flash' });
      }
    } catch (aiErr: any) {
      console.warn('Gemini API call failed, using graceful scriptural fallback:', aiErr?.message);
    }

    // Graceful scripture-grounded response if Gemini API is temporarily busy or unavailable
    const lastMsg = (messages[messages.length - 1]?.content || '').toLowerCase();
    let fallbackWisdom = `### 🌸 ഭഗവാന്റെ ഉപദേശം (Spiritual Guidance in Malayalam)
സ്നേഹമുള്ള കുട്ടീ, ഭഗവാൻ ശ്രീകൃഷ്ണൻ പാർത്ഥനോട് അരുളിച്ചെയ്ത ദിവ്യസന്ദേശം ഹൃദയത്തിൽ സ്വീകരിക്കുക:
"മന്മനാ ഭവ മദ്ഭക്തോ മദ്യാജീ മാം നമസ്കുരു" (ഗീത 18.65).
നിന്റെ മനസ്സ് എന്നിൽ അർപ്പിക്കുക, എന്റെ ഭക്തനായിത്തീരുക. ജീവിതത്തിലെ പ്രതിസന്ധികളിൽ തളരാതെ, നിന്റെ ധർമ്മം സ്നേഹത്തോടെ നിർവ്വഹിക്കുക. ഭഗവാൻ എപ്പോഴും നിന്റെ കൂടെയുണ്ട്.

### 🌿 English Translation & Practical Wisdom
Beloved soul, take refuge in Krishna's words from Bhagavad Gita 18.65: "Always fix your mind on Me, become My devotee, worship Me and offer your homage unto Me." Do not be disheartened by external turbulence; when your consciousness is anchored in divine love, every storm becomes an opportunity for spiritual growth.

### ✨ ധ്യാന ശ്ലോകം / Meditation Mantra
"ഓം നമോ ഭഗവതേ വാസുദേവായ" — ഈ പവിത്ര മന്ത്രം ജപിച്ച് മനസ്സമാധാനം അനുഭവിക്കുക.`;

    if (lastMsg.includes('ഭയം') || lastMsg.includes('fear') || lastMsg.includes('anxiety') || lastMsg.includes('ഉത്കണ്ഠ')) {
      fallbackWisdom = `### 🌸 ഭഗവാന്റെ ഉപദേശം (Spiritual Guidance in Malayalam)
ഭയം വേണ്ട, പ്രിയ ഭക്താ! ആത്മാവ് നാശമില്ലാത്തതും ശാശ്വതവുമാണ് (ഗീത 2.20). ശസ്ത്രങ്ങൾക്കൊണ്ടും അതിനെ മുറിക്കാനാവില്ല, അഗ്നിക്കൊണ്ടും അതിനെ ദഹിപ്പിക്കാനാവില്ല. ഈ ശരീരവും ബാഹ്യലോകവും മാറിക്കൊണ്ടിരിക്കുന്നതാണ്; എന്നാൽ നിന്റെ ഉള്ളിലെ ആത്മാവ് പവിത്രവും ശാശ്വതവുമാണ്. ഈ സത്യം അറിഞ്ഞ് സകല ഭയങ്ങളും എന്നിൽ സമർപ്പിച്ച് ധൈര്യത്തോടെ മുന്നോട്ട് പോവുക.

### 🌿 English Translation & Practical Wisdom
Do not fear, dear seeker! The soul (Atman) is immortal and indestructible (BG 2.20). Weapons cannot pierce it, fire cannot burn it, and circumstances cannot diminish its light. Know that external challenges are merely transient waves; center your awareness in your eternal spirit and surrender all anxieties to Krishna.

### ✨ ധ്യാന ശ്ലോകം / Meditation Mantra
"മാ ശുചഃ" (Ma Shuchah - വ്യസനിക്കരുത് / Grieve not) — ഭഗവാന്റെ അഭയവാക്ക്.`;
    } else if (lastMsg.includes('ഭക്തി') || lastMsg.includes('bhakti') || lastMsg.includes('love') || lastMsg.includes('ഗുരുവായൂർ')) {
      fallbackWisdom = `### 🌸 ഭഗവാന്റെ ഉപദേശം (Spiritual Guidance in Malayalam)
ഭക്തിയോഗമാണ് കലിയുഗത്തിൽ ആത്മസാക്ഷാത്കാരത്തിനുള്ള ഏറ്റവും ലളിതവും മനോഹരവുമായ മാർഗ്ഗം. "പത്രം പുഷ്പം ഫലം തോയം യോ മേ ഭക്ത്യാ പ്രയച്ഛതി" (ഗീത 9.26). സ്നേഹത്തോടെയും ഭക്തിയോടെയും സമർപ്പിക്കുന്ന ഒരു തുളസിയിലയോ, ഒരു പൂവോ, അല്പം ജലമോ പോലും ഞാൻ സന്തോഷത്തോടെ സ്വീകരിക്കുന്നു. ബാഹ്യമായ വലിയ ആഡംബരങ്ങളല്ല, ഹൃദയശുദ്ധിയാണ് ഭഗവാന് വേണ്ടത്.

### 🌿 English Translation & Practical Wisdom
Bhakti Yoga (loving devotion) is the sublime path of liberation. In Gita 9.26, the Lord declares that even a single leaf, flower, fruit, or water offered with pure love is accepted with divine joy. God seeks not grandiose rituals, but the sincerity and tenderness of your heart.

### ✨ ധ്യാന ശ്ലോകം / Meditation Mantra
"കൃഷ്ണായ വാസുദേവായ ഹരയേ പരമാത്മനേ।
പ്രണതക്ലേശനാശായ ഗോവിന്ദായ നമോ നമഃ॥"`;
    }

    return res.json({ text: fallbackWisdom, model: 'vedic-scriptural-wisdom' });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.json({
      text: "ശാന്തമായിരിക്കുക. സമത്വമാണ് യോഗം (Samatvam Yoga Ucyate). മനസ്സിൽ ഈശ്വരചിന്ത നിറയട്ടെ.",
      model: 'vedic-resilience'
    });
  }
});

// API: Ethical & Life Dilemma Navigator
app.post('/api/dilemma', async (req, res) => {
  try {
    const { dilemma, lifeDomain } = req.body;

    if (!dilemma) {
      return res.status(400).json({ error: 'Dilemma description is required.' });
    }

    if (!ai) {
      // Fallback structured guidance
      return res.json({
        gitaChapter: "Chapter 2: Sankhya Yoga (The Eternal Reality of the Soul's Immortality)",
        primaryShloka: {
          sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
          transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
          reference: "Bhagavad Gita 2.47",
          translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty."
        },
        philosophicalDiagnosis: "Your dilemma stems from anxiety over consequences and the tension between emotional attachment (Raga) and duty (Dharma), just as Arjuna stood frozen between affection for kinsmen and righteous action.",
        krishnaGuidance: "Fix your mind on the intrinsic righteousness of the action itself. Surrender the feverish attachment to praise, blame, victory, or loss. When action is offered as a sacred sacrifice (Yajna), clarity dawns naturally.",
        practicalActionSteps: [
          "Separate what is in your direct control (your effort, integrity, speech) from what is beyond control (others' reactions, final outcomes).",
          "Identify your authentic Svadharma (ethical duty) in this scenario without being swayed by fear of uncomfortable emotions.",
          "Practice 5 minutes of pranayama and silent contemplation before communicating your decision.",
          "Execute the necessary action calmly, free from resentment or boasting."
        ],
        contemplationMantra: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय (Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure)."
      });
    }

    const prompt = `Analyze this user's real-world moral or life dilemma through the timeless philosophical lens of the Bhagavad Gita and Vedic scriptures:
Dilemma: "${dilemma}"
Context / Domain: "${lifeDomain || 'General Life'}"

Respond in STRICT JSON with this schema:
{
  "gitaChapter": "Name and number of the most relevant Gita chapter",
  "primaryShloka": {
    "sanskrit": "Devanagari Sanskrit verse",
    "transliteration": "IAST Romanized verse",
    "reference": "e.g. Bhagavad Gita 2.47 or 18.66",
    "translation": "English translation"
  },
  "philosophicalDiagnosis": "Deep Vedic psychological diagnosis: how attachment (Asakti), illusion (Maya), or the three Gunas (Sattva/Rajas/Tamas) are creating the knot of confusion in this dilemma.",
  "krishnaGuidance": "Direct compassionate philosophical counsel in the voice of Krishna advising Arjuna.",
  "practicalActionSteps": ["Step 1...", "Step 2...", "Step 3...", "Step 4..."],
  "contemplationMantra": "A short Sanskrit phrase and translation to center the mind"
}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.gitaChapter) {
        return res.json(parsed);
      }
    } catch (aiErr: any) {
      console.warn('Gemini dilemma API error, using structured wisdom fallback:', aiErr?.message);
    }

    return res.json({
      gitaChapter: "Chapter 2: Sankhya Yoga & Buddhi Yoga",
      primaryShloka: {
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
        reference: "Bhagavad Gita 2.47",
        translation: "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor let your attachment be to inaction."
      },
      philosophicalDiagnosis: "Your current mental conflict arises from projecting anxious outcomes into the future, creating a clash between emotional attachment (Raga) and natural duty (Dharma).",
      krishnaGuidance: "Fix your mind on the intrinsic righteousness of the duty itself. Surrender the feverish craving for praise, victory, or fear of loss. When action is performed as a sacred offering (Yajna), clarity dawns naturally.",
      practicalActionSteps: [
        "Distinguish between what you control (your integrity, actions, and speech) and what you cannot control (other people's reactions, final events).",
        "Perform the necessary righteous action calmly without postponing out of dread.",
        "Take 5 minutes of mindful breath and mantra contemplation to center yourself before key decisions.",
        "Treat every challenge as a training ground for steady intellect (Sthitaprajna)."
      ],
      contemplationMantra: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय (Perform your duty established in equanimity, abandoning attachment)."
    });
  } catch (error: any) {
    console.error('Dilemma API Error:', error);
    res.json({
      gitaChapter: "Chapter 2: Sankhya Yoga",
      primaryShloka: {
        sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।",
        transliteration: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ",
        reference: "Bhagavad Gita 2.14",
        translation: "Sensations of heat and cold, pleasure and pain are fleeting; endure them with patience."
      },
      philosophicalDiagnosis: "Fluctuations of circumstance are temporary ripples on consciousness.",
      krishnaGuidance: "Remain an unshakeable witness. Do your duty with peace.",
      practicalActionSteps: ["Breathe deeply", "Act with sincerity", "Release expectations"],
      contemplationMantra: "समत्वं योग उच्यते (Equanimity is Yoga)."
    });
  }
});

// API: Deep Verse Exegesis Endpoint
app.post('/api/shloka-insight', async (req, res) => {
  try {
    const { chapter, verse, shlokaText } = req.body;

    if (!chapter || !verse) {
      return res.status(400).json({ error: 'Chapter and verse are required.' });
    }

    if (!ai) {
      return res.json({
        insight: `This sacred verse from Chapter ${chapter}, Verse ${verse} invites the seeker to discover freedom from dualities. By remaining unaffected by honour or dishonour, one attains the state of steady wisdom (Sthitaprajna).`,
        application: "Observe daily thoughts and practice becoming the detached conscious witness (Sakshi) rather than being tossed by emotional reactions."
      });
    }

    const prompt = `Provide a profound Vedic exegesis of Bhagavad Gita Chapter ${chapter}, Verse ${verse} (Text: "${shlokaText || ''}").
Include:
1. Etymological and philosophical breakdown of key Sanskrit terms.
2. Classical viewpoints (e.g. Jnana/non-dual essence and Bhakti/loving devotion essence).
3. Contemporary application for modern seekers navigating career, relationships, and inner growth.
Respond with clarity, depth, and reverent beauty.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.6,
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Shloka insight error:', error);
    res.status(500).json({ error: 'Failed to generate verse exegesis' });
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VedaKrishna full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
