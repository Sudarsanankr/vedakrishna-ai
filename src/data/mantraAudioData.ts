export interface MantraItem {
  id: string;
  name: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  significance: string;
  recommendedCount: number;
  pitchHz: number;
}

export const SACRED_MANTRAS: MantraItem[] = [
  {
    id: "maha-mantra",
    name: "Maha Mantra (The Great Chanted Deliverance)",
    sanskrit: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥",
    transliteration: "hare kṛṣṇa hare kṛṣṇa kṛṣṇa kṛṣṇa hare hare |\nhare rāma hare rāma rāma rāma hare hare ||",
    meaning: "O Divine Energy of the Lord (Hare), O All-Attractive Lord (Krishna), O Supreme Source of Transcendental Pleasure (Rama), please engage me in Your loving service.",
    significance: "Declared in the Kali-Santarana Upanishad as the supreme medicine for mental agitation and spiritual awakening in the current age (Kali Yuga).",
    recommendedCount: 108,
    pitchHz: 138.59 // C#3 root
  },
  {
    id: "vasudeva-mantra",
    name: "Dvadakshara Mantra (12-Syllable Mukti Mantra)",
    sanskrit: "ॐ नमो भगवते वासुदेवाय॥",
    transliteration: "oṁ namo bhagavate vāsudevāya ||",
    meaning: "I bow with reverence unto the Supreme Divinity Vasudeva, the all-pervading Indweller of all hearts.",
    significance: "The foundational mantra bestowed upon Dhruva Maharaja in the Bhagavata Purana, leading to immediate realization of the Supreme Lord.",
    recommendedCount: 108,
    pitchHz: 146.83 // D3
  },
  {
    id: "gita-dhyanam",
    name: "Gita Dhyanam (Invocation to the Gita)",
    sanskrit: "ॐ पार्थाय प्रतिबोधितां भगवता नारायणेन स्वयं\nव्यासेन ग्रथितां पुराणमुनिना मध्येमहाभारतम्।\nअद्वैतामृतवर्षिणीं भगवतीमष्टादशाध्यायिनीम्\nअम्ब त्वामनुसन्दधामि भगवद्गीते भवद्वेषिणीम्॥",
    transliteration: "oṁ pārthāya pratibodhitāṁ bhagavatā nārāyaṇena svayaṁ\nvyāsena grathitāṁ purāṇa-muninā madhye-mahābhāratam |\nadvaitāmṛta-varṣiṇīṁ bhagavatīm aṣṭādaśādhyāyinīm\namba tvām anusandadhāmi bhagavad-gīte bhava-dveṣiṇīm ||",
    meaning: "Om, O Mother Bhagavad Gita, with which Partha was enlightened by Lord Narayana Himself, which was penned by the ancient sage Vyasa in the epic Mahabharata, showerer of the nectar of non-duality, composed of eighteen chapters — upon you, O destroyer of rebirth, I continuously meditate.",
    significance: "Traditional opening invocation recited before chanting the Gita to tune the seeker's mind to receptivity.",
    recommendedCount: 1,
    pitchHz: 130.81 // C3
  },
  {
    id: "krishna-gayatri",
    name: "Krishna Gayatri Mantra",
    sanskrit: "ॐ देवकीनन्दनाय विद्महे वासुदेवाय धीमहि।\nतन्नः कृष्णः प्रचोदयात्॥",
    transliteration: "oṁ devakī-nandanāya vidmahe vāsudevāya dhīmahi |\ntan naḥ kṛṣṇaḥ pracodayāt ||",
    meaning: "Om, may we know the beloved son of Devaki; may we meditate upon Vasudeva; may that Lord Krishna illuminate our intellect and guide our steps.",
    significance: "A sacred Vedic Gayatri invoking divine intellectual clarity and purity of intent.",
    recommendedCount: 108,
    pitchHz: 138.59
  },
  {
    id: "asato-ma",
    name: "Pavamana Mantra (From Darkness to Light)",
    sanskrit: "असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।\nमृत्य switch: मृत्योर्मा अमृतं गमय। ॐ शान्तिः शान्तिः शान्तिः॥",
    transliteration: "asato mā sad-gamaya | tamaso mā jyotir-gamaya |\nmṛtyor mā amṛtaṁ gamaya | oṁ śāntiḥ śāntiḥ śāntiḥ ||",
    meaning: "Lead me from the unreal to the real. Lead me from darkness to spiritual light. Lead me from the fear of death to immortality. Om Peace, Peace, Peace.",
    significance: "From the Brihadaranyaka Upanishad (1.3.28), the timeless human prayer for liberation from ignorance.",
    recommendedCount: 3,
    pitchHz: 130.81
  }
];
