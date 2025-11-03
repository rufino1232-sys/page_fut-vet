import React, { useState, useEffect, useRef } from 'react';
import { usePlayers } from './hooks/usePlayers';
import Header from './components/Header';
import SoccerField from './components/SoccerField';
import SidePanel from './components/SidePanel';
import ConfirmationModal from './components/ConfirmationModal';
import TourModal from './components/TourModal';
import { PlayerStatus } from './types';

// Declare html2canvas to TypeScript since it's loaded from a script tag
declare const html2canvas: any;

function App() {
  const { 
      players, 
      updatePlayerStatus, 
      updatePlayerPosition, 
      clearField, 
      resetMatch,
      addPlayer,
      removePlayer,
      updatePlayerName,
      setPlayerAsCoach,
  } = usePlayers();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isCoachMode, setIsCoachMode] = useState(true);
  const fieldRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleCoachMode = () => setIsCoachMode(!isCoachMode);
  
  const handleConfirmPresence = (playerId: number, status: PlayerStatus) => {
    updatePlayerStatus(playerId, status);
  };

  const handleExport = () => {
    if (fieldRef.current) {
      html2canvas(fieldRef.current, {
          useCORS: true,
          // Set background color explicitly because the component's background might not be captured
          backgroundColor: isDarkMode ? '#2c5a3d' : '#4c956c',
          // Improve image quality
          scale: 2,
      }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = 'escalacao-boleiros.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 transition-colors duration-300">
      <Header 
        players={players} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        isCoachMode={isCoachMode}
        toggleCoachMode={toggleCoachMode}
        onOpenTour={() => setIsTourOpen(true)}
      />
      <main className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div className="flex-grow">
          <SoccerField 
            fieldRef={fieldRef}
            players={players} 
            updatePlayerPosition={updatePlayerPosition}
            isCoachMode={isCoachMode}
          />
        </div>
        <SidePanel 
            players={players} 
            onConfirmPresence={() => setIsModalOpen(true)}
            clearField={clearField}
            resetMatch={resetMatch}
            addPlayer={addPlayer}
            removePlayer={removePlayer}
            updatePlayerName={updatePlayerName}
            setPlayerAsCoach={setPlayerAsCoach}
            isCoachMode={isCoachMode}
            onExport={handleExport}
        />
      </main>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        players={players}
        onConfirm={handleConfirmPresence}
      />
      <TourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />
      <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
        <p>Criado para organizar a pelada dos Boleiros. Divirta-se!</p>
        <p className="mt-2">Desenvolvido por: Rodrigo Rufino | +55 12 98299-7424</p>
        <p>&copy; {new Date().getFullYear()} Rodrigo Rufino. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;