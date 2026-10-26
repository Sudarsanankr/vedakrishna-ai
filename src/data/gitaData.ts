export interface Shloka {
  id: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  wordForWord: string;
  translation: string;
  commentary: string;
  theme: string;
  keyConcepts: string[];
}

export interface Chapter {
  number: number;
  sanskritTitle: string;
  englishTitle: string;
  yogaType: string;
  verseCount: number;
  summary: string;
  coreTeachings: string[];
  keyShlokas: Shloka[];
}

export const GITA_CHAPTERS: Chapter[] = [
  {
    number: 1,
    sanskritTitle: "अर्जुनविषादयोग",
    englishTitle: "Arjuna's Despondency",
    yogaType: "Arjuna Vishada Yoga",
    verseCount: 47,
    summary: "On the sacred battlefield of Kurukshetra, warrior Arjuna observes cherished elders, teachers, and kinsmen drawn up for battle. Overcome by grief and attachment, his bow Gandiva slips from his trembling hands, precipitating the existential crisis that prompts the highest spiritual discourse.",
    coreTeachings: [
      "The paralysis caused by confusion between emotional attachment and righteous duty (Dharma).",
      "How moral crisis and vulnerability become the fertile ground for spiritual awakening.",
      "The role of the divine preceptor (Guru) when one's intellect is overwhelmed."
    ],
    keyShlokas: [
      {
        id: "1-47",
        chapter: 1,
        verse: 47,
        sanskrit: "सञ्जय उवाच -\nएवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसंविग्नमानसः॥",
        transliteration: "sañjaya uvāca -\nevam uktvārjunaḥ saṅkhye rathopastha upāviśat |\nvisṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ ||",
        wordForWord: "sañjayaḥ uvāca—Sanjaya said; evam—thus; uktvā—speaking; arjunaḥ—Arjuna; saṅkhye—on the battlefield; rathopasthe—upon the chariot; upāviśat—sat down; visṛjya—casting aside; sa-śaram—with arrows; cāpam—bow; śoka—by lamentation; saṁvigna—distressed; mānasaḥ—mind.",
        translation: "Sanjaya said: Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sank down upon the seat of his chariot, his mind overwhelmed with sorrow.",
        commentary: "Arjuna's breakdown is not ordinary cowardice, but the crisis of a noble soul confronting the agony of duty versus attachment. This total exhaustion of the ego opens the gate to Krishna's divine wisdom.",
        theme: "Existential Crisis & Surrender",
        keyConcepts: ["Vishada (Sorrow)", "Shoka (Lamentation)", "Saranagati (Surrender)"]
      }
    ]
  },
  {
    number: 2,
    sanskritTitle: "साङ्ख्ययोग",
    englishTitle: "Transcendental Knowledge & Yoga of the Intellect",
    yogaType: "Sankhya Yoga / Buddhi Yoga",
    verseCount: 72,
    summary: "The immortal core of the Gita. Krishna awakens Arjuna from stupor by revealing the eternal, indestructible nature of the Soul (Atman), the science of detached duty (Nishkama Karma), and the characteristics of the enlightened sage of steady wisdom (Sthitaprajna).",
    coreTeachings: [
      "The Soul never dies; physical bodies are mere garments cast off at death.",
      "Equanimity in pleasure and pain, gain and loss (Samatvam).",
      "Karmanye vadikaraste: you own the action, never the fruits.",
      "The Sthitaprajna: mastery over senses and unwavering peace."
    ],
    keyShlokas: [
      {
        id: "2-14",
        chapter: 2,
        verse: 14,
        sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यस्तांस्तितिक्षस्व भारत॥",
        transliteration: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino 'nityās tāṁs titikṣasva bhārata ||",
        wordForWord: "mātrā-sparśāḥ—sensory contacts; tu—indeed; kaunteya—O son of Kunti; śīta-uṣṇa—cold and heat; sukha-duḥkha-dāḥ—giving pleasure and pain; āgama-apāyinaḥ—appearing and disappearing; anityāḥ—impermanent; tān—them; titikṣasva—endure with patience; bhārata—O descendant of Bharata.",
        translation: "O son of Kunti, the contacts of the senses with their objects give rise to feelings of heat and cold, pleasure and pain. They are fleeting and impermanent; endure them with patience, O Bharata.",
        commentary: "Krishna introduces 'Titiksha' — the heroic forbearance that recognizes sensations and emotions as passing weather in the sky of consciousness. Freedom is not eliminating winter or summer, but not being bound by either.",
        theme: "Titiksha & Impermanence",
        keyConcepts: ["Titiksha (Forbearance)", "Anitya (Impermanence)", "Dvandva (Dualities)"]
      },
      {
        id: "2-20",
        chapter: 2,
        verse: 20,
        sanskrit: "न जायते म्रियते वा कदाचि-\nन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",
        transliteration: "na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato 'yaṁ purāṇo\nna hanyate hanyamāne śarīre ||",
        wordForWord: "na—never; jāyate—is born; mriyate—dies; vā—or; kadācit—at any time; na—not; ayam—this; bhūtvā—having come to be; bhavitā—will come to be; vā—or; na—not; bhūyaḥ—again; ajaḥ—unborn; nityaḥ—eternal; śāśvataḥ—everlasting; ayam—this; purāṇaḥ—primeval; na—not; hanyate—is killed; hanyamāne—when being slain; śarīre—the body.",
        translation: "The soul is never born, nor does it ever die; nor having once existed does it cease to be. Unborn, eternal, ever-existing, and primeval, it is not slain when the body is slain.",
        commentary: "The supreme declaration of immortality. Your essential being was never created in time and cannot be erased by circumstance. Fear of physical loss dissolves when rooted in Atman-jnana.",
        theme: "The Immortality of the Self",
        keyConcepts: ["Atman (The Soul)", "Ajo Nitya (Unborn Eternal)", "Amritatva (Immortality)"]
      },
      {
        id: "2-47",
        chapter: 2,
        verse: 47,
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
        wordForWord: "karmaṇi—in prescribed duty; eva—only; adhikāraḥ—right; te—your; mā—never; phaleṣu—in fruits; kadācana—at any time; mā—not; karma-phala—results of work; hetuḥ—cause; bhūḥ—become; mā—not; te—your; saṅgaḥ—attachment; astu—let there be; akarmaṇi—in inaction.",
        translation: "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor let your attachment be to inaction.",
        commentary: "The universal anthem of Karma Yoga. Human anxiety is caused by obsessing over uncontrollable futures while neglecting the immediate ethical act. Dedicate 100% effort to the present act and release anxiety regarding results.",
        theme: "Nishkama Karma (Selfless Duty)",
        keyConcepts: ["Karmaphala-tyaga (Relinquishing Results)", "Adhikara (Rightful Duty)", "Nishkama (Desireless)"]
      },
      {
        id: "2-70",
        chapter: 2,
        verse: 70,
        sanskrit: "आपूर्यमाणमचलप्रतिष्ठं\nसमुद्रमापः प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे\nस शान्तिमाप्नोति न कामकामी॥",
        transliteration: "āpūryamāṇam acala-pratiṣṭhaṁ\nsamudram āpaḥ praviśanti yadvat |\ntadvat kāmā yaṁ praviśanti sarve\nsa śāntim āpnoti na kāma-kāmī ||",
        wordForWord: "āpūryamāṇam—continually filled; acala-pratiṣṭham—unmoved and stationary; samudram—unto the ocean; āpaḥ—waters; praviśanti—enter; yadvat—as; tadvat—so; kāmāḥ—desires; yam—unto whom; praviśanti—enter; sarve—all; saḥ—he; śāntim—peace; āpnoti—attains; na—not; kāma-kāmī—one who craves desires.",
        translation: "As the ocean remains calm and undisturbed while rivers continually flow into it, so the person into whom all desires enter without creating disturbance achieves peace, not the seeker of desires.",
        commentary: "A breathtaking metaphor for mental tranquility. The ocean never overflows when rivers flood, nor dries up when they cease. The liberated sage experiences worldly sensations without losing inner stillness.",
        theme: "The Ocean of Equanimity",
        keyConcepts: ["Sthitaprajna (Steady Intellect)", "Shanti (Peace)", "Samatvam (Balance)"]
      }
    ]
  },
  {
    number: 3,
    sanskritTitle: "कर्मयोग",
    englishTitle: "The Yoga of Action",
    yogaType: "Karma Yoga",
    verseCount: 43,
    summary: "Krishna resolves the apparent tension between renunciation and active engagement. Inaction is impossible as Nature's forces (Gunas) compel work. True freedom lies not in abandoning action, but in transforming action into a sacred offering (Yajna) for the welfare of the world (Lokasamgraha).",
    coreTeachings: [
      "No one can remain idle even for a moment; nature compels activity.",
      "Action done as Yajna (sacrifice) causes no karmic bondage.",
      "Leaders set the standard that society follows (Yad yad acarati sresthah).",
      "Svadharma: authentic alignment with one's innate nature."
    ],
    keyShlokas: [
      {
        id: "3-19",
        chapter: 3,
        verse: 19,
        sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥",
        transliteration: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara |\nasakto hy ācaran karma param āpnoti pūruṣaḥ ||",
        wordForWord: "tasmāt—therefore; asaktaḥ—without attachment; satatam—constantly; kāryam—duty; karma—action; samācara—perform well; asaktaḥ—unattached; hi—certainly; ācaran—performing; karma—work; param—the Supreme; āpnoti—attains; pūruṣaḥ—a person.",
        translation: "Therefore, without attachment, constantly perform whatever action needs to be done; for by doing work without attachment, a person attains the Supreme.",
        commentary: "Action itself becomes the vehicle for liberation when divested of selfish motives. Work is not a prison; our greed for results is what binds us.",
        theme: "Unattached Action as Liberation",
        keyConcepts: ["Asakti (Detachment)", "Karya Karma (Necessary Duty)", "Param (The Supreme)"]
      },
      {
        id: "3-35",
        chapter: 3,
        verse: 35,
        sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥",
        transliteration: "śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt |\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ ||",
        wordForWord: "śreyān—far better; sva-dharmaḥ—one's own duty; viguṇaḥ—imperfect; para-dharmāt—than another's duty; su-anuṣṭhitāt—well-performed; sva-dharme—in one's own duty; nidhanam—destruction; śreyaḥ—better; para-dharmaḥ—another's path; bhaya-āvahaḥ—fraught with danger.",
        translation: "It is far better to perform one's own natural duty (Svadharma), though imperfectly, than to master the duty of another. Destruction in the pursuit of one's own duty is auspicious, for adopting another's path invites fear and ruin.",
        commentary: "Each soul has a unique psycho-physical constitution (Svabhava) and organic purpose. Imitating others creates internal schizophrenia and spiritual despair. Authenticity is sacred.",
        theme: "The Sanctity of Svadharma",
        keyConcepts: ["Svadharma (Personal Duty)", "Svabhava (Innate Nature)", "Para-dharma (Alien Path)"]
      }
    ]
  },
  {
    number: 4,
    sanskritTitle: "ज्ञानकर्मसंन्यासयोग",
    englishTitle: "The Yoga of Knowledge & Renunciation of Action in Knowledge",
    yogaType: "Jnana Karma Sannyasa Yoga",
    verseCount: 42,
    summary: "Krishna reveals the ancient lineage of this wisdom, explains the cosmic purpose of divine incarnation (Avatar), and shows how the fire of self-knowledge (Jnana-agni) incinerates all accumulated karmas.",
    coreTeachings: [
      "The Avatar descends whenever righteousness decays to protect the good.",
      "He who sees inaction in action and action in inaction is wise.",
      "The sacrifice of knowledge (Jnana Yajna) excels all material offerings.",
      " श्रद्धावाँल्लभते ज्ञानं (The faithful seeker with controlled senses attains knowledge)."
    ],
    keyShlokas: [
      {
        id: "4-7",
        chapter: 4,
        verse: 7,
        sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
        transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||",
        wordForWord: "yadā yadā—whenever; hi—certainly; dharmasya—of righteousness; glāniḥ—decline; bhavati—occurs; bhārata—O descendant of Bharata; abhyutthānam—predominance; adharmasya—of unrighteousness; tadā—at that time; ātmānam—Myself; sṛjāmi—manifest; aham—I.",
        translation: "Whenever and wherever there is a decline in righteousness, O Bharata, and a rampant rise in unrighteousness, at that time I manifest Myself upon the earth.",
        commentary: "The divine does not abandon creation. The cosmic law of equilibrium ensures that whenever darkness threatens to overwhelm human evolution, transcendental grace manifests in tangible historical form.",
        theme: "The Divine Incarnation",
        keyConcepts: ["Avatar (Incarnation)", "Dharma-samsthapana (Establishing Dharma)", "Karuna (Grace)"]
      },
      {
        id: "4-38",
        chapter: 4,
        verse: 38,
        sanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥",
        transliteration: "na hi jñānena sadṛśaṁ pavitram iha vidyate |\ntat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati ||",
        wordForWord: "na—nothing; hi—certainly; jñānena—to knowledge; sadṛśam—comparable; pavitram—purifying; iha—in this world; vidyate—exists; tat—that; svayam—oneself; yoga-saṁsiddhaḥ—ripened in yoga; kālena—in due time; ātmani—within the Self; vindati—discovers.",
        translation: "In this world, there is nothing so sublime and pure as transcendental knowledge. One who has become perfected in Yoga finds this wisdom blossoming naturally within the Self in due course of time.",
        commentary: "Intellectual data is not wisdom; Jnana is direct intuitive realization of the divine Self. When internal discipline ripens, this sacred knowledge arises organically from within.",
        theme: "The Purifying Radiance of Knowledge",
        keyConcepts: ["Jnana (Spiritual Knowledge)", "Pavitram (Pure)", "Yoga-samsiddhi (Perfection in Yoga)"]
      }
    ]
  },
  {
    number: 6,
    sanskritTitle: "ध्यानयोग",
    englishTitle: "The Yoga of Meditation",
    yogaType: "Dhyana Yoga",
    verseCount: 47,
    summary: "A practical manual for mastering the restless mind. Krishna provides guidance on posture, moderation, focus, and breath. He assures Arjuna that the self alone is the friend of the self, and reveals that no sincere effort on the spiritual path is ever lost.",
    coreTeachings: [
      "The mind is a friend to the controlled, but an enemy to the undisciplined.",
      "Moderation in eating, sleeping, working, and recreation is essential for Yoga.",
      "The restless mind is conquered through Abhyasa (practice) and Vairagya (dispassion).",
      "The Yogi who sees the Divine in all beings and all beings in the Divine never falters."
    ],
    keyShlokas: [
      {
        id: "6-5",
        chapter: 6,
        verse: 5,
        sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
        transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||",
        wordForWord: "uddharet—one must elevate; ātmanā—by one's own mind; ātmānam—the self; na—not; ātmānam—oneself; avasādayet—degrade; ātmā—the mind; eva—indeed; hi—certainly; ātmanaḥ—of the self; bandhuḥ—friend; ātmā—the mind; eva—indeed; ripuḥ—enemy; ātmanaḥ—of oneself.",
        translation: "One must elevate oneself by one's own mind and never degrade oneself. For the mind alone is the dearest friend of the self, and the mind alone is the self's greatest enemy.",
        commentary: "Personal agency and self-responsibility in Vedic psychology. External circumstances do not enslave you; your own untrained inner monologue does. By befriending your intellect through awareness, you liberate your life.",
        theme: "Self-Mastery & Friendship with the Mind",
        keyConcepts: ["Atma-kripa (Self-grace)", "Bandhu (Friend)", "Ripu (Enemy)"]
      },
      {
        id: "6-30",
        chapter: 6,
        verse: 30,
        sanskrit: "यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति।\nतस्याहं न प्रणश्यामि स च मे न प्रणश्यति॥",
        transliteration: "yo māṁ paśyati sarvatra sarvaṁ ca mayi paśyati |\ntasyāhaṁ na praṇaśyāmi sa ca me na praṇaśyati ||",
        wordForWord: "yaḥ—whoever; mām—Me; paśyati—sees; sarvatra—everywhere; sarvam—everything; ca—and; mayi—in Me; paśyati—sees; tasya—for him; aham—I; na—never; praṇaśyāmi—am lost; saḥ—he; ca—and; me—to Me; na—never; praṇaśyati—is lost.",
        translation: "For one who sees Me in all things and sees all things in Me, I am never lost to him, nor is he ever lost to Me.",
        commentary: "The culmination of cosmic vision. When the illusion of separateness drops away, every tree, person, wave, and star is perceived as an expression of the one Infinite Heart.",
        theme: "Universal Vision of Oneness",
        keyConcepts: ["Sarvatra-darshana (Seeing All)", "Ananya-bhakti (Unbroken Connection)"]
      }
    ]
  },
  {
    number: 9,
    sanskritTitle: "राजविद्याराजगुह्ययोग",
    englishTitle: "The Sovereign Knowledge & Sovereign Secret",
    yogaType: "Raja Vidya Raja Guhya Yoga",
    verseCount: 34,
    summary: "Krishna reveals the royal secret of unreserved love and divine grace. He assures that even the simplest leaf, flower, fruit, or drop of water offered with pure devotion is received by the Infinite.",
    coreTeachings: [
      "The divine pervasive consciousness upholds all universes like pearls strung on a thread.",
      "Ananya-chinta: Krishna takes personal responsibility for those who meditate on Him with singular devotion.",
      "Patram pushpam phalam toyam: simplicity of heart transcends elaborate ritual."
    ],
    keyShlokas: [
      {
        id: "9-22",
        chapter: 9,
        verse: 22,
        sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
        transliteration: "ananyāś cintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||",
        wordForWord: "ananyāḥ—without distraction; cintayantaḥ—thinking upon; mām—Me; ye—who; janāḥ—people; paryupāsate—worship faithfully; teṣām—of them; nitya-abhiyuktānām—constantly engaged; yoga—what they lack; kṣemam—what they possess; vahāmi—carry/preserve; aham—I.",
        translation: "To those who worship Me with single-minded devotion, continually meditating on My divine presence, I personally carry what they lack and safeguard what they possess.",
        commentary: "The profound covenant of Yoga-Kshema. When our devotion is wholehearted, Providence assumes the guardianship of our spiritual and practical journey.",
        theme: "Divine Protection (Yoga-Kshema)",
        keyConcepts: ["Yoga-Kshema (Bestowal & Preservation)", "Ananya-cintana (Single-minded Contemplation)"]
      },
      {
        id: "9-26",
        chapter: 9,
        verse: 26,
        sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",
        transliteration: "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati |\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||",
        wordForWord: "patram—a leaf; puṣpam—a flower; phalam—a fruit; toyam—water; yaḥ—whoever; me—unto Me; bhaktyā—with love and devotion; prayacchati—offers; tat—that; aham—I; bhakti-upahṛtam—offered in devotion; aśnāmi—partake of; prayata-ātmanaḥ—from one of pure consciousness.",
        translation: "Whoever offers Me with love and devotion a mere leaf, a flower, a fruit, or even water — that offering brought with devotion by a pure-hearted soul, I delight in and accept.",
        commentary: "God is not hungry for wealth, jewels, or grand sacrifices. The only currency accepted by the Supreme is the purity of love (Bhakti).",
        theme: "The Currency of Loving Devotion",
        keyConcepts: ["Bhakti-upahritam (Offering of Love)", "Prayatatman (Pure Consciousness)"]
      }
    ]
  },
  {
    number: 11,
    sanskritTitle: "विश्वरूपदर्शनयोग",
    englishTitle: "The Vision of the Cosmic Universal Form",
    yogaType: "Vishvarupa Darshana Yoga",
    verseCount: 55,
    summary: "At Arjuna's earnest prayer, Krishna bestows the divine eye (Divya Chakshu) and unveils His awe-inspiring Cosmic Form (Vishvarupa) — containing infinite galaxies, suns, gods, time itself, birth, death, and resurrection in one blinding panorama.",
    coreTeachings: [
      "The entire cosmos exists simultaneously within the body of the Divine.",
      "Time (Kala) is the irresistible force of change that dissolves all forms.",
      "Arjuna is commanded: Nimitta-matram bhava savyasacin (Be merely an instrument).",
      "Only through humble, undivided devotion can this ultimate form be realized."
    ],
    keyShlokas: [
      {
        id: "11-12",
        chapter: 11,
        verse: 12,
        sanskrit: "दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता।\nयदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः॥",
        transliteration: "divi sūrya-sahasrasya bhaved yugapad utthitā |\nyadi bhāḥ sadṛśī sā syād bhāsas tasya mahātmanaḥ ||",
        wordForWord: "divi—in the sky; sūrya-sahasrasya—of a thousand suns; bhavet—were; yugapad—simultaneously; utthitā—blazing; yadi—if; bhāḥ—radiance; sadṛśī—comparable; sā—that; syāt—might be; bhāsaḥ—the brilliance; tasya—of that; mahā-ātmanaḥ—Mighty Supreme Being.",
        translation: "If the splendour of a thousand suns were to burst forth at once in the heavens, that might resemble the glory of that Supreme Being.",
        commentary: "Human language strains to convey transcendental infinite light. The universe is not dead matter, but living, shimmering, multi-dimensional conscious light.",
        theme: "The Radiance of a Thousand Suns",
        keyConcepts: ["Surya-sahasra (Thousand Suns)", "Divya-cakshu (Spiritual Vision)", "Vishvarupa (Cosmic Form)"]
      },
      {
        id: "11-33",
        chapter: 11,
        verse: 33,
        sanskrit: "तस्मात्त्वमुत्तिष्ठ यशो लभस्व\nजित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम्।\nमयैवैते निहताः पूर्वमेव\nनिमित्तमात्रं भव सव्यसाचिन्॥",
        transliteration: "tasmāt tvam uttiṣṭha yaśo labhasva\njitvā śatrūn bhuṅkṣva rājyaṁ samṛddham |\nmayaivaite nihatāḥ pūrvam eva\nnimitta-mātraṁ bhava savya-sācin ||",
        wordForWord: "tasmāt—therefore; tvam—you; uttiṣṭha—stand up; yaśaḥ—glory; labhasva—attain; jitvā—conquering; śatrūn—enemies; bhuṅkṣva—enjoy; rājyam—kingdom; samṛddham—flourishing; mayā—by Me; eva—alone; ete—all these; nihatāḥ—slain; pūrvam eva—already; nimitta-mātram—merely an instrument; bhava—become; savya-sācin—O skilled archer.",
        translation: "Therefore arise and win glory! Conquer your foes and enjoy a prosperous kingdom. By Me they have already been vanquished; become merely My instrument, O dexterous archer!",
        commentary: "The deepest counsel on purpose. When we align with the cosmic will, we do not act out of arrogant egoism. We become a clear flute through which the divine song plays.",
        theme: "Nimitta-matram (Being the Divine Instrument)",
        keyConcepts: ["Nimitta-matram (Mere Instrument)", "Uttistha (Arise)", "Daivi-ichha (Divine Will)"]
      }
    ]
  },
  {
    number: 12,
    sanskritTitle: "भक्तियोग",
    englishTitle: "The Yoga of Devotion",
    yogaType: "Bhakti Yoga",
    verseCount: 20,
    summary: "One of the most cherished and musical chapters of the Gita. Krishna details the stages of devotion and paints the portrait of the ideal devotee — one who harbors malice toward none, is a friend to all creatures, and remains serene amidst joy and sorrow.",
    coreTeachings: [
      "The path of the formless (Avyakta) is arduous for embodied beings; the path of devotion is sweet and direct.",
      "Grades of practice: complete focus → regular practice → work for the Divine → renouncing results.",
      "The 35 qualities of the beloved devotee: compassion, forgiveness, patience, and non-envious joy."
    ],
    keyShlokas: [
      {
        id: "12-13",
        chapter: 12,
        verse: 13,
        sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
        transliteration: "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca |\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī ||",
        wordForWord: "adveṣṭā—non-hater; sarva-bhūtānām—towards all beings; maitraḥ—friendly; karuṇaḥ—compassionate; eva—indeed; ca—and; nirmamaḥ—free from possessiveness; nirahaṅkāraḥ—free from arrogance/false ego; sama-duḥkha-sukhaḥ—equipoised in pain and pleasure; kṣamī—forgiving.",
        translation: "One who bears no malice toward any creature, who is friendly and compassionate, free from possessiveness and false pride, steady in both joy and sorrow, and ever forgiving...",
        commentary: "True spirituality is verified not by mystical visions, but by how we treat our fellow beings. The hallmark of enlightenment is universal goodwill and tender mercy towards all life.",
        theme: "The Virtues of the Beloved Devotee",
        keyConcepts: ["Maitri (Friendliness)", "Karuna (Compassion)", "Nirahamkara (Egolessness)"]
      }
    ]
  },
  {
    number: 14,
    sanskritTitle: "गुणत्रयविभागयोग",
    englishTitle: "The Yoga of the Three Modes of Material Nature",
    yogaType: "Gunatraya Vibhaga Yoga",
    verseCount: 27,
    summary: "The definitive psychological map of human behavior. Krishna dissects how the three modes (Gunas) — Sattva (luminescence, purity), Rajas (passion, restless ambition), and Tamas (inertia, heedlessness) — weave the fabric of mortal experience.",
    coreTeachings: [
      "Sattva binds by attachment to knowledge and happiness.",
      "Rajas binds by intense thirst for worldly achievement and sensory gratification.",
      "Tamas binds through lethargy, procrastination, and illusion.",
      "Transcendence (Gunatita): rising above the three gunas into pure spiritual freedom."
    ],
    keyShlokas: [
      {
        id: "14-6",
        chapter: 14,
        verse: 6,
        sanskrit: "तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम्।\nसुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ॥",
        transliteration: "tatra sattvaṁ nirmalatvāt prakāśakam anāmayam |\nsukha-saṅgena badhnāti jñāna-saṅgena cānagha ||",
        wordForWord: "tatra—there; sattvam—the mode of goodness; nirmalatvāt—due to being pure; prakāśakam—illuminating; anāmayam—free from distress; sukha-saṅgena—by attachment to happiness; badhnāti—binds; jñāna-saṅgena—by attachment to knowledge; ca—and; anagha—O sinless one.",
        translation: "Among these, Sattva, being luminous and pristine, is healthy and illuminating; yet it binds the soul through attachment to intellectual joy and conditioned virtue, O sinless one.",
        commentary: "Even virtue can become a subtle golden cage if tied to spiritual ego. True liberation requires moving from Tamas to Rajas, from Rajas to Sattva, and finally transcending even Sattva into unconditioned awareness.",
        theme: "The Anatomy of Sattva",
        keyConcepts: ["Sattva (Purity/Illumination)", "Guna-baddhatva (Bondage by Modes)", "Gunatita (Beyond Gunas)"]
      }
    ]
  },
  {
    number: 18,
    sanskritTitle: "मोक्षसंन्यासयोग",
    englishTitle: "The Yoga of Liberation through Renunciation",
    yogaType: "Moksha Sannyasa Yoga",
    verseCount: 78,
    summary: "The majestic grand finale. Krishna synthesizes all 18 chapters — clarifying the true meaning of Tyaga (relinquishing selfishness) versus Sannyasa (renunciation), summarizing human motivation through the Gunas, and concluding with the ultimate promise of total refuge (Sarva-dharman parityajya).",
    coreTeachings: [
      "True renunciation is relinquishing the selfish craving for fruits, not abandoning ethical duties.",
      "The culmination of all spiritual paths is wholehearted surrender to the Supreme Heart.",
      "Fearlessness: 'Do not grieve (Ma sucah)', for divine love is unconditional.",
      "Sanjaya's ecstatic conclusion: wherever is Krishna and wherever is Arjuna, there lies victory, morality, and abundance."
    ],
    keyShlokas: [
      {
        id: "18-65",
        chapter: 18,
        verse: 65,
        sanskrit: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे॥",
        transliteration: "man-manā bhava mad-bhakto mad-yājī māṁ namaskuru |\nmām evaiṣyasi satyaṁ te pratijāne priyo 'si me ||",
        wordForWord: "mat-manāḥ—absorb your mind in Me; bhava—become; mat-bhaktaḥ—My devotee; mat-yājī—My worshiper; mām—unto Me; namaskuru—bow down; mām—unto Me; eva—certainly; eṣyasi—you shall come; satyam—truly; te—to you; pratijāne—I promise; priyaḥ—dear; asi—you are; me—to Me.",
        translation: "Fix your mind always upon Me, offer your devotion, bow down before Me, and honor Me in your actions. In this way you will surely come to Me. Truly do I promise this, for you are dearly loved by Me.",
        commentary: "A tender, intimate promise from the Infinite to the individual soul. The divine longs for our communion even more than we seek divine grace.",
        theme: "The Divine Covenant of Love",
        keyConcepts: ["Man-mana (Mind Fixed on Divine)", "Pratijana (Divine Promise)", "Priya (Beloved)"]
      },
      {
        id: "18-66",
        chapter: 18,
        verse: 66,
        sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
        transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||",
        wordForWord: "sarva-dharmān—all varieties of religious rites and dogmatic duties; parityajya—relinquishing; mām—unto Me; ekam—alone; śaraṇam—for shelter; vraja—go; aham—I; tvām—you; sarva-pāpebhyaḥ—from all sins and reactions; mokṣayiṣyāmi—will liberate; mā—do not; śucaḥ—grieve.",
        translation: "Abandon all varieties of dogmatic duties and formal rites, and surrender unto Me alone. I shall deliver you from all fear, suffering, and reactions; do not grieve!",
        commentary: "The crown jewel shloka of the Bhagavad Gita (Charama Shloka). Total surrender (Saranagati) to the Supreme renders anxious religious anxiety obsolete. Divine grace sweeps away all karmic residues.",
        theme: "Charama Shloka: The Ultimate Refuge",
        keyConcepts: ["Saranagati (Total Surrender)", "Mokshayishyami (I Will Liberate)", "Ma Sucah (Grieve Not)"]
      },
      {
        id: "18-78",
        chapter: 18,
        verse: 78,
        sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",
        transliteration: "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ |\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama ||",
        wordForWord: "yatra—wherever; yoga-īśvaraḥ—the Lord of Yoga; kṛṣṇaḥ—Krishna; yatra—wherever; pārthaḥ—Arjuna; dhanuḥ-dharaḥ—the archer; tatra—there; śrīḥ—grace and prosperity; vijayaḥ—victory; bhūtiḥ—extraordinary power; dhruvā—unfailing; nītiḥ—righteousness; matiḥ—conviction; mama—my.",
        translation: "Wherever is Krishna, the Master of all Yoga, and wherever is Partha (Arjuna), the bearer of the bow, there will certainly be opulence, moral victory, boundless vitality, and steadfast justice. This is my firm conviction.",
        commentary: "The final benediction of the Mahabharata. Spiritual wisdom (Krishna) united with energetic moral action in the world (Arjuna) produces triumph, goodness, and lasting peace.",
        theme: "The Union of Grace and Endeavor",
        keyConcepts: ["Yogeshvara (Master of Yoga)", "Dhanurdhara (Righteous Action)", "Vijaya (Triumph)"]
      }
    ]
  }
];
