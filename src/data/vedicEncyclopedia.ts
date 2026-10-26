export interface EncyclopediaArticle {
  id: string;
  title: string;
  sanskritTitle: string;
  category: 'Metaphysics' | 'The Three Gunas' | 'Four Yogas' | 'Scriptural Canon' | 'Krishna Leela & Avatars' | 'Sacred Geography' | 'Acharyas & Traditions';
  summary: string;
  readTime: string;
  scripturalSources: string[];
  keyTerms: string[];
  contentSections: {
    heading: string;
    body: string;
    quote?: {
      sanskrit: string;
      source: string;
      translation: string;
    };
  }[];
  practicalApplication: string;
}

export const ENCYCLOPEDIA_ARTICLES: EncyclopediaArticle[] = [
  {
    id: "atman-brahman",
    title: "Atman & Brahman: The Individual Soul and Supreme Reality",
    sanskritTitle: "आत्मन् च ब्रह्मन्",
    category: "Metaphysics",
    summary: "The fundamental ontology of Vedic thought: distinguishing the changing physical vehicle from the unchanging conscious observer (Atman), and realizing its eternal connection with the infinite substratum of existence (Brahman).",
    readTime: "6 min read",
    scripturalSources: ["Chandogya Upanishad (Tat Tvam Asi)", "Bhagavad Gita 2.20", "Mandukya Upanishad"],
    keyTerms: ["Atman (Self)", "Brahman (Infinite Reality)", "Sat-Chit-Ananda", "Upadhi (Limiting Adjunct)"],
    contentSections: [
      {
        heading: "1. The Inward Witness (Sakshi)",
        body: "In Vedic psychology, human identity is layered into five sheaths (Pancha Koshas): physical body, vital breath, lower reactive mind, discriminating intellect, and bliss sheath. Beneath all five lies the Atman — pure, luminous awareness that illuminates all perceptions without being modified by them.",
        quote: {
          sanskrit: "न जायते म्रियते वा कदाचित्",
          source: "Katha Upanishad 1.2.18 / BG 2.20",
          translation: "The Self is never born, nor does it ever die; having existed, it does not cease to be."
        }
      },
      {
        heading: "2. Brahman: The Infinite Ground of Being",
        body: "Brahman is defined as Satyam (Truth), Jnanam (Consciousness), and Anantam (Infinitude). Just as countless waves emerge, play, and dissolve within the single water of the sea, all transient universes and sentient beings arise within the ocean of Brahman."
      },
      {
        heading: "3. The Mahavakyas (The Great Utterances)",
        body: "Four monumental aphorisms from the Upanishads declare this truth: 'Prajnanam Brahma' (Consciousness is Brahman - Rig Veda), 'Aham Brahmasmi' (I am the Infinite - Yajur Veda), 'Tat Tvam Asi' (You are That - Sama Veda), and 'Ayam Atma Brahma' (This Self is Brahman - Atharva Veda)."
      }
    ],
    practicalApplication: "When anxious thoughts or emotional turbulence arise, step back internally. Inquire: 'Who is observing this panic?' You are the unshakeable witness, not the passing storm."
  },
  {
    id: "the-three-gunas",
    title: "The Three Gunas: The Matrix of Human Consciousness",
    sanskritTitle: "त्रिगुणात्मिका प्रकृतिः",
    category: "The Three Gunas",
    summary: "Vedic science describes all matter and mental states as an interplay of three fundamental qualitative forces: Sattva (clarity, harmony), Rajas (passion, agitation), and Tamas (inertia, confusion).",
    readTime: "7 min read",
    scripturalSources: ["Bhagavad Gita Chapter 14 & 17", "Sankhya Karika", "Srimad Bhagavatam Canto 11"],
    keyTerms: ["Sattva (Luminescence)", "Rajas (Kinetic Desire)", "Tamas (Inertial Resistance)", "Gunatita (Transcendence)"],
    contentSections: [
      {
        heading: "1. Sattva: The Quality of Light and Wisdom",
        body: "Sattva manifests as clarity of perception, compassion, cleanliness, mental peace, and selfless joy. It produces happiness born of inner fulfillment. However, if clung to with pride, it can bind one through intellectual vanity."
      },
      {
        heading: "2. Rajas: The Energy of Ambition and Craving",
        body: "Rajas is characterized by intense longing, thirst for achievement, restless movement, competition, and sensory stimulation. It drives civilization and technological progress, but leads inexorably to stress, burnout, and envy when unchecked."
      },
      {
        heading: "3. Tamas: The Shadow of Lethargy and Delusion",
        body: "Tamas is the gravitational force of inertia, dullness, sleepiness, procrastination, substance dependence, and cognitive denial. It resists change and obscures truth."
      },
      {
        heading: "4. The Art of Spiritual Engineering",
        body: "Vedic masters teach a systematic progression: First overcome Tamas through disciplined Rajas (energetic action, exercise, focused work). Then refine Rajas into Sattva (calm, wholesome diet, meditation, ethical living). Finally, rest in the Self beyond all three (Gunatita)."
      }
    ],
    practicalApplication: "Audit your day: Notice when your mind is in Tamas (lying in bed scrolling), Rajas (feverishly rushing from task to task), or Sattva (deep focused presence and gratitude). Choose foods, companions, and media that nurture Sattva."
  },
  {
    id: "nishkama-karma",
    title: "Nishkama Karma: The Art of Effortless Action",
    sanskritTitle: "निष्काम कर्मयोग",
    category: "Four Yogas",
    summary: "The profound paradox at the heart of the Bhagavad Gita: achieving peak performance and absolute inner freedom by totally surrendering attachment to outcomes while investing 100% devotion in the work itself.",
    readTime: "5 min read",
    scripturalSources: ["Bhagavad Gita 2.47-50", "Isha Upanishad Verse 2"],
    keyTerms: ["Nishkama (Without selfish craving)", "Karmaphala (Fruits of action)", "Yajna (Sacrifice)", "Samatvam (Equanimity)"],
    contentSections: [
      {
        heading: "1. The Anatomy of Work Anxiety",
        body: "Modern psychological studies on flow state mirror Krishna's teaching: when the ego is obsessively calculating future recognition, financial gains, or fear of failure, cognitive bandwidth is drained. Anxiety is simply the mind living in an imaginary future."
      },
      {
        heading: "2. Yogah Karmasu Kaushalam (Yoga is Skill in Action)",
        body: "Detachment does not mean sloppy indifference or mediocrity. When personal neurotic stakes are dissolved, action becomes razor-sharp, joyous, and artistic. One operates with the freedom of a master painter."
      }
    ],
    practicalApplication: "Before beginning any high-stakes project or meeting, mentally say: 'This effort is my sacred duty. The results belong to the cosmic whole.' Notice the sudden release of tension in your shoulders."
  },
  {
    id: "krishna-leelas-vrindavan",
    title: "The Leelas of Vrindavan: Divine Sweetness and Transcendental Love",
    sanskritTitle: "श्रीवृन्दावन बाललीला",
    category: "Krishna Leela & Avatars",
    summary: "In the pastoral forests of Vrindavan, the Supreme Divinity plays not as an intimidating sovereign, but as an affectionate child, loyal friend, and divine lover, inviting the soul into intimate relational love (Madhurya Bhava).",
    readTime: "8 min read",
    scripturalSources: ["Srimad Bhagavatam Canto 10", "Gita Govinda of Jayadeva", "Bhakti-rasamrita-sindhu"],
    keyTerms: ["Madhurya (Sweetness)", "Aishwarya (Majesty)", "Damodara Leela", "Govardhana Dharana", "Raas Leela"],
    contentSections: [
      {
        heading: "1. Madhurya versus Aishwarya",
        body: "While the cosmic Vishvarupa inspires awe and reverence (Aishwarya), the pastoral pastimes of Vrindavan manifest intimacy (Madhurya). Here, God allows Himself to be bound with a rope of love by Mother Yashoda (Damodara) and plays flute melodies that call every soul out of material forgetfulness."
      },
      {
        heading: "2. The Lifting of Mount Govardhana",
        body: "When the rain-god Indra sent torrential storms to punish the villagers, Krishna lifted the Govardhana hill upon His little finger for seven days, sheltering all cows, cowherds, and forest creatures under divine grace. It represents turning away from ritualistic barter to pure loving surrender."
      },
      {
        heading: "3. The Raas Leela: Dance of the Infinite",
        body: "Beneath the Sharad Purnima full moon, the Raas Leela depicts the union of individual souls (Jivas, represented by the Gopis) with the Supreme Paramatman. Krishna expands into infinite forms so that each soul experiences personal, undivided divine companionship."
      }
    ],
    practicalApplication: "Approach spirituality not out of cold obligation or fear of punishment, but as an awakening of dormant love. Treat all duties as loving offerings."
  },
  {
    id: "vedic-scriptural-hierarchy",
    title: "The Vedic Canon: Shruti, Smriti, and the Darshanas",
    sanskritTitle: "श्रुतिस्मृतिमीमांसा",
    category: "Scriptural Canon",
    summary: "A panoramic guide to the sacred library of Sanatana Dharma: the timeless heard revelations (Shruti) and the remembered, lived applications (Smriti).",
    readTime: "9 min read",
    scripturalSources: ["Rig, Sama, Yajur, Atharva Veda", "Prasthanatrayi", "Brahma Sutras"],
    keyTerms: ["Shruti (Revealed Wisdom)", "Smriti (Tradition & Itihasa)", "Upanishads (Vedanta)", "Prasthanatrayi (The Three Foundations)"],
    contentSections: [
      {
        heading: "1. Shruti (What was Heard): The Four Vedas",
        body: "Rig Veda (hymns of praise), Sama Veda (melodic chants), Yajur Veda (sacrificial formulas), and Atharva Veda (practical and psychological hymns). Each Veda contains four layers: Samhitas (mantras), Brahmanas (explanations), Aranyakas (forest contemplations), and Upanishads (philosophical summits)."
      },
      {
        heading: "2. Smriti (What is Remembered): Epics and Puranas",
        body: "The Mahabharata (including the Bhagavad Gita) and Ramayana bring metaphysical truths into dynamic human drama. The 18 Puranas, led by the Srimad Bhagavatam, express cosmology, ethics, and devotion through illustrative narrative."
      },
      {
        heading: "3. The Prasthanatrayi: The Triple Canon of Vedanta",
        body: "Any authoritative philosophical school must ground its thesis upon three pillars: The Upanishads (Shruti-prasthana), The Bhagavad Gita (Smriti-prasthana), and The Brahma Sutras (Nyaya-prasthana)."
      }
    ],
    practicalApplication: "Understand that Vedic wisdom is an open inquiry into truth, not dogmatic belief. Study with discrimination, questioning, and reverent application."
  },
  {
    id: "sacred-tirthas",
    title: "Sacred Pilgrimages (Tirthas) of Krishna's Earthly Walk",
    sanskritTitle: "तीर्थयात्रा महात्म्यम्",
    category: "Sacred Geography",
    summary: "The sacred geography connecting inner spiritual states to geographical power spots across the Indian subcontinent where the Mahabharata and Krishna Leelas transpired.",
    readTime: "6 min read",
    scripturalSources: ["Mahabharata Vana Parva", "Mathura Mahatmya", "Skanda Purana"],
    keyTerms: ["Tirtha (Spiritual Ford / Crossing Point)", "Kurukshetra (Field of Dharma)", "Vrindavan (Grove of Tulasi)", "Dwarka (Gateway City)"],
    contentSections: [
      {
        heading: "1. Kurukshetra: Dharmakshetra",
        body: "Located in modern Haryana, Kurukshetra is described in the Gita's first word as 'Dharmakshetra' — the testing ground of righteous duty. At Jyotisar, under an immortal banyan tree, the celestial song of the Gita was sung."
      },
      {
        heading: "2. Mathura and Vrindavan: The Heartland of Braj",
        body: "Mathura, Krishna's birthplace on the banks of the sacred Yamuna, and Vrindavan, where the divine pastimes unfolded. To this day, the dust of Braj (Braj Raj) is revered as infused with transcendental devotional frequency."
      },
      {
        heading: "3. Dwarka: The Sovereign Golden Capital",
        body: "Built upon the western shores of Gujarat, Dwarka symbolized righteous governance, international diplomacy, and royal sovereignty. Submerged beneath the Arabian Sea at the end of the Dvapara Yuga, marine archaeology continues to reveal its stone foundations."
      }
    ],
    practicalApplication: "A Tirtha is literally a ford where one crosses a turbulent river. Even from home, meditating on sacred geography transforms your physical environment into an altar."
  }
];
