import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { GitaExplorer } from './components/GitaExplorer';
import { AIChatbots } from './components/AIChatbots';
import { DilemmaNavigator } from './components/DilemmaNavigator';
import { EncyclopediaBrowser } from './components/EncyclopediaBrowser';
import { JapaMeditation } from './components/JapaMeditation';
import { VedicQuizModal } from './components/VedicQuizModal';
import { DailyReflectionModal } from './components/DailyReflectionModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('encyclopedia');
  const [droneActive, setDroneActive] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isDailyReflectionOpen, setIsDailyReflectionOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConsultation={() => setActiveTab('charioteer')}
        droneActive={droneActive}
        setDroneActive={setDroneActive}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Curatorial Hero Section is shown on Encyclopedia or Gita view */}
        {(activeTab === 'encyclopedia' || activeTab === 'gita') && (
          <HeroSection
            onSelectTab={setActiveTab}
            onOpenDailyReflection={() => setIsDailyReflectionOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {/* Tab Components */}
        {activeTab === 'encyclopedia' && <EncyclopediaBrowser />}
        {activeTab === 'gita' && <GitaExplorer />}
        {activeTab === 'charioteer' && <AIChatbots />}
        {activeTab === 'dilemma' && <DilemmaNavigator />}
        {activeTab === 'japa' && (
          <JapaMeditation
            droneActive={droneActive}
            setDroneActive={setDroneActive}
          />
        )}
      </main>

      {/* Interactive Modals */}
      <VedicQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      <DailyReflectionModal
        isOpen={isDailyReflectionOpen}
        onClose={() => setIsDailyReflectionOpen(false)}
      />

      {/* Footer with Sudarsanan attribution */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
