# VedaKrishna — Krishna Spiritual Encyclopedia & Malayalam-First AI

> **Conceived & Curated by Sudarsanan K R**  
> A comprehensive spiritual encyclopedia and interactive Vedic wisdom sanctuary exploring the divine teachings of Lord Krishna, the 18 Chapters of the Bhagavad Gita, and authentic Vedic scriptures.

---

## 🌟 Key Features

### 1. 🌸 Malayalam-First Krishna Spiritual AI Chat (ശ്രീകൃഷ്ണ ആധ്യാത്മിക സംഭാഷണം)
- **Bilingual Wisdom (മലയാളം & English)**: Provides compassionate spiritual guidance structured with:
  - **ഭഗവാന്റെ ഉപദേശം**: Eloquent spiritual counsel in authentic Malayalam script (മലയാളത്തിൽ).
  - **English Translation & Practical Application**: Clear, modern actionable guidance for daily work, family duty, anxiety, and relationships.
  - **ധ്യാന ശ്ലോകം**: Sacred meditation mantras and Gita verses.
- **Core Topics**:
  - **ഭക്തിയോഗം (Bhakti Yoga)**: Cultivating loving devotion, surrender (*Sharanagati*), and mental tranquility.
  - **നിഷ്കാമ കർമ്മം (Nishkama Karma)**: Performing duty without feverish attachment to outcomes.
  - **ശ്രീകൃഷ്ണ ലീല (Krishna Leelas)**: The sweetness of Vrindavan, Govardhana Hill, Raas Leela, and Guruvayurappan's grace.
  - **ആത്മജ്ഞാനം (Self-Knowledge)**: Distinguishing the immortal *Atman* from the transient ego and body.
- **Interactive Controls**: Responsive chat input, send action, animated bouncing loading indicator, audio chime, and copy-to-clipboard affordances.
- **Language Mode Switcher**: Select between **Bilingual (മലയാളം & English)**, **Pure Malayalam (മലയാളം മാത്രം)**, or **English**.

### 2. 📜 Interactive Bhagavad Gita Shloka Explorer
- Complete directory of all 18 Chapters with Sanskrit titles, English descriptions, and verse counts.
- Shloka cards featuring original Sanskrit Devanagari, IAST Roman transliteration, word-for-word grammatical breakdown (*Anvaya*), English translation, and philosophical commentary.
- Interactive **AI Exegesis** providing multi-dimensional Advaita, Vishishtadvaita, and modern psychological insights.
- **Sanskrit Chanting Tone**: Synthesizes traditional Vedic pitch progressions directly in the browser.

### 3. ⚖️ Kurukshetra Moral Dilemma Navigator
- Choose from common life crises (Career Burnout & Anxiety, Ethical Duty vs. Family Pressure, Impostor Syndrome, Coping with Loss, Betrayal & Rage) or articulate personal dilemmas.
- Diagnoses the root conflict in terms of *Gunas* and attachment (*Asakti*), prescribing the exact Gita chapter and Sanskrit verse with 4 actionable steps.

### 4. 📿 108-Bead Japa Mala & Synthesized Web Audio Tanpura Drone
- Interactive 108-bead Japa Mala with tactile click animation, round tracking, and temple bell chimes.
- Real-time **Web Audio API Tanpura Synthesizer** generating authentic acoustic harmonic drones (138Hz root C# with cyclical Pa-Sa-Sa-Sa acoustic strumming) without external audio file dependencies.
- Sacred mantras: Maha Mantra, Vasudeva 12-Syllable Mantra, Gita Dhyanam, Krishna Gayatri, and Pavamana Mantra.

### 5. 📚 Vedic Spiritual Encyclopedia
- Deep archival articles on *Atman & Brahman*, *The Three Gunas*, *Four Yogas*, *The Vedic Scriptural Hierarchy*, *Krishna Leelas*, and *Sacred Tirthas*.
- Museum-grade editorial design with classical artwork, pull quotes, and scriptural citations (*Pramana*).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons.
- **Backend**: Node.js, Express, tsx.
- **AI Engine**: Google GenAI SDK (`@google/genai`) using `gemini-3.8-flash`.
- **Audio**: Web Audio API (real-time harmonic Tanpura synthesizer and frequency chime generator).
- **Typography**: Google Fonts (*Noto Serif Malayalam*, *Noto Sans Malayalam*, *Cinzel*, *Cormorant Garamond*, *Plus Jakarta Sans*).

---

## 🔒 Security & Architecture

- **Zero Client-Side API Keys**: The `GEMINI_API_KEY` is kept strictly server-side in Node.js / Express routes (`/api/chat`, `/api/dilemma`, `/api/shloka-insight`).
- **Resilient Fallback Mode**: Even during temporary upstream network or model unavailability, the server gracefully delivers rich, authentic scripture-grounded Malayalam and English wisdom.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/krishna-spiritual-encyclopedia.git
cd krishna-spiritual-encyclopedia
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory (based on `.env.example`):
```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

4. Start the development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

5. Build for production:
```bash
npm run build
npm start
```

---

## 🌐 GitHub Pages Deployment Guide

This project is configured for seamless deployment to **GitHub Pages** via GitHub Actions:

### 1. Repository Setup & Permissions
1. On GitHub, navigate to your repository: [https://github.com/Sudarsanankr/krishna-](https://github.com/Sudarsanankr/krishna-)
2. Go to **Settings > Pages**:
   - Under **Build and deployment > Source**, select **GitHub Actions**.
3. Under **Settings > Actions > General**:
   - Under **Workflow permissions**, ensure **Read and write permissions** is selected.

### 2. Pushing from Local Terminal
To push changes to your repository:
```bash
git push -u origin main
```
*(If prompted for authentication, provide your GitHub Personal Access Token (PAT) with `repo` and `workflow` scopes, or use your configured SSH key).*

### 3. Automated Deployment
Once pushed, the GitHub Actions workflow in `.github/workflows/deploy.yml` will automatically build the application and deploy it live to:
```
https://sudarsanankr.github.io/krishna-/
```

---

## 📖 Credits & Dedication

- **Conceived and Curated by**: Sudarsanan K R
- Dedicated to universal spiritual enlightenment and the preservation of timeless Vedic wisdom.
- *Om Shanti Shanti Shanti* ॐ
