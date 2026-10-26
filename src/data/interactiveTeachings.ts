export interface DilemmaPreset {
  id: string;
  title: string;
  domain: string;
  arjunaParallel: string;
  description: string;
  gitaReference: string;
}

export const DILEMMA_PRESETS: DilemmaPreset[] = [
  {
    id: "work-burnout-anxiety",
    title: "Burnout, Overwork & Future Anxiety",
    domain: "Career & Work",
    arjunaParallel: "Arjuna shivering upon the chariot, paralyzed by dread of uncertain consequences and loss.",
    description: "I pour enormous energy into my career, but I am perpetually anxious about promotions, recognition, and competitors. I feel depleted and wonder if my efforts even matter.",
    gitaReference: "BG 2.47 (Nishkama Karma) & BG 2.70 (The Calm Ocean)"
  },
  {
    id: "family-conflict-boundaries",
    title: "Ethical Duty vs. Family Expectations",
    domain: "Relationships & Dharma",
    arjunaParallel: "Arjuna confronting grandfather Bhishma and teacher Drona across battle lines.",
    description: "My family pressures me into life decisions or behaviors that violate my ethical principles. I dread hurting them, yet conforming feels like betraying my true conscience.",
    gitaReference: "BG 3.35 (Svadharma) & BG 11.33 (Being a Divine Instrument)"
  },
  {
    id: "impostor-syndrome",
    title: "Self-Doubt & Feeling Unqualified for Leadership",
    domain: "Personal Purpose",
    arjunaParallel: "Arjuna saying: 'I shall not fight' (Na yotsya iti Govindam), dropping his celestial bow.",
    description: "I have been given a major responsibility, but I feel like an impostor. The stakes are immense and fear of failure tempts me to run away and hide.",
    gitaReference: "BG 6.5 (The Self is Friend of Self) & BG 18.78 (Union of Wisdom and Action)"
  },
  {
    id: "grief-loss",
    title: "Coping with Irreversible Loss & Grief",
    domain: "Existential / Loss",
    arjunaParallel: "Arjuna weeping over the fleeting mortality of loved ones on the battlefield.",
    description: "I have suffered a tragic loss of someone precious to me. The world feels hollow and sorrow clouds every thought.",
    gitaReference: "BG 2.11 (The Wise Grieve Neither for the Living nor the Dead) & BG 2.20 (The Eternal Soul)"
  },
  {
    id: "anger-betrayal",
    title: "Responding to Betrayal, Injustice & Anger",
    domain: "Ethics & Conflict",
    arjunaParallel: "The Pandavas enduring humiliation in the dice game while maintaining righteous discipline.",
    description: "Someone I trusted has acted maliciously and caused grave harm. Rage and a desire for revenge consume my peace of mind.",
    gitaReference: "BG 2.62-63 (The Chain of Anger and Ruin) & BG 12.13 (Friendliness to All)"
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  gitaVerse: string;
  explanation: string;
}

export const VEDIC_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "According to Bhagavad Gita 2.47, what does a seeker possess the rightful claim to?",
    options: [
      "Both the effort and the guaranteed fruit of action",
      "Only the execution of rightful duty, never to the fruits of action",
      "The choice to abstain completely from physical work",
      "Worldly fame and praise when the action succeeds"
    ],
    correctIndex: 1,
    gitaVerse: "BG 2.47: 'Karmaṇy evādhikāras te mā phaleṣu kadācana'",
    explanation: "Krishna explicitly teaches that one has control only over present deliberate duty (Adhikara), not over the cosmic web of ripening results (Phala). Releasing ownership of fruits dissolves anxiety and guarantees inner freedom."
  },
  {
    id: 2,
    question: "What is the meaning of 'Sthitaprajna' as described by Lord Krishna in Chapter 2?",
    options: [
      "A scholar who has memorized all four Vedas word for word",
      "A hermit who has abandoned society and lives in a cave",
      "A person of steady wisdom who remains undisturbed in pleasure and pain",
      "A fierce warrior who knows no physical fatigue"
    ],
    correctIndex: 2,
    gitaVerse: "BG 2.56: 'Duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ'",
    explanation: "A Sthitaprajna is one whose mind remains undisturbed amidst adversity, devoid of feverish craving amidst prosperity, and free from passion, fear, and rage."
  },
  {
    id: 3,
    question: "Which of the three Gunas is associated with unbridled ambition, restless activity, and intense craving?",
    options: [
      "Sattva",
      "Rajas",
      "Tamas",
      "Nirguna"
    ],
    correctIndex: 1,
    gitaVerse: "BG 14.7: 'Rajo rāgātmakaṁ viddhi tṛṣṇā-saṅga-samudbhavam'",
    explanation: "Rajas is characterized by passion, longing, attachment to achievements, and intense thirst for sensory stimulation, binding the embodied soul through feverish action."
  },
  {
    id: 4,
    question: "In Chapter 11, what does Krishna command Arjuna to become with the phrase 'Nimitta-matram bhava'?",
    options: [
      "A sovereign king ruling all three worlds",
      "Merely an instrument of the divine will",
      "A silent ascetic renouncing his bow",
      "An unfeeling avenger of injustice"
    ],
    correctIndex: 1,
    gitaVerse: "BG 11.33: 'Mayaivaite nihatāḥ pūrvam eva nimitta-mātraṁ bhava savya-sācin'",
    explanation: "Krishna reveals that destiny and the cosmic law of equilibrium have already ordained the outcome; Arjuna is called to shed arrogant authorship and act as a noble, humble instrument."
  },
  {
    id: 5,
    question: "What does Krishna declare about one's own natural duty (Svadharma) in BG 3.35?",
    options: [
      "It is always superior to imitate a higher person's duty flawlessly",
      "One should adopt whatever profession brings the quickest wealth",
      "It is better to perform one's own duty imperfectly than another's duty perfectly",
      "One should renounce all duties at the first sign of difficulty"
    ],
    correctIndex: 2,
    gitaVerse: "BG 3.35: 'Śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt'",
    explanation: "Each soul has a unique psychophysical makeup (Svabhava). Forcing yourself into another person's mould causes psychological fracture and spiritual harm."
  }
];

export interface DailyReflection {
  date: string;
  sanskritPhrase: string;
  transliteration: string;
  source: string;
  theme: string;
  contemplation: string;
  dailyPractice: string;
}

export const DAILY_REFLECTIONS: DailyReflection[] = [
  {
    date: "Day 1",
    sanskritPhrase: "समत्वं योग उच्यते",
    transliteration: "samatvaṁ yoga ucyate",
    source: "Bhagavad Gita 2.48",
    theme: "Equanimity in All Circumstances",
    contemplation: "Yoga is not merely a physical posture on a mat; it is the poise of the mind when praised or blamed, winning or losing, gaining or failing.",
    dailyPractice: "Today, when something disrupts your schedule, take a conscious breath before reacting and remember: equilibrium is your true sanctuary."
  },
  {
    date: "Day 2",
    sanskritPhrase: "योगः कर्मसु कौशलम्",
    transliteration: "yogaḥ karmasu kauśalam",
    source: "Bhagavad Gita 2.50",
    theme: "Yoga is Skill in Action",
    contemplation: "True skill is doing whatever is before you with complete love and undivided attention, free from the heavy baggage of vanity or fear.",
    dailyPractice: "Pick one routine task today (writing an email, washing dishes, speaking with a friend) and perform it as a sacred work of art."
  },
  {
    date: "Day 3",
    sanskritPhrase: "आत्मैव ह्यात्मनो बन्धुः",
    transliteration: "ātmaiva hy ātmano bandhuḥ",
    source: "Bhagavad Gita 6.5",
    theme: "The Mind as Your Dearest Ally",
    contemplation: "No external enemy can harm you as deeply as a mind unchecked by self-love and wisdom. Likewise, no friend is more faithful than a trained, gentle intellect.",
    dailyPractice: "Catch negative self-talk today. Address yourself with the gentle, firm encouragement of a loving teacher."
  }
];
