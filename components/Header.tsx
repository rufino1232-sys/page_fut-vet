import React from 'react';
import { Player } from '../types';
import { PlayerStatus } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
  players: Player[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isCoachMode: boolean;
  toggleCoachMode: () => void;
  onOpenTour: () => void;
}

const Header: React.FC<HeaderProps> = ({ players, isDarkMode, toggleDarkMode, isCoachMode, toggleCoachMode, onOpenTour }) => {
  const confirmedCount = players.filter(p => p.status === PlayerStatus.CONFIRMED).length;
  const totalPlayers = players.length;

  return (
    <header className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg mb-6 text-center w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex-1 text-left" style={{ minWidth: '96px' }}>
             <button
                onClick={toggleCoachMode}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors ${isCoachMode ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                aria-label="Toggle coach mode"
            >
                <i className={`fas ${isCoachMode ? 'fa-user-shield' : 'fa-user'}`}></i>
                <span>{isCoachMode ? 'Técnico' : 'Jogador'}</span>
            </button>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Escalação dos Boleiros ⚽
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Confirme sua presença!</p>
        </div>
        <div className="flex-1 flex justify-end items-center gap-2" style={{ minWidth: '96px' }}>
            <button
                onClick={onOpenTour}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Abrir guia rápido"
                title="Guia Rápido"
            >
                <i className="fas fa-question-circle text-xl"></i>
            </button>
            <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
        </div>
      </div>
      <div className="mt-4 text-lg font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 py-2 px-4 rounded-full inline-block">
        Confirmados: {confirmedCount} de {totalPlayers} jogadores
      </div>
    </header>
  );
};

export default Header;