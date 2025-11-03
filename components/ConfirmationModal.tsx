
import React, { useState } from 'react';
import { Player, PlayerStatus } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onConfirm: (playerId: number, status: PlayerStatus) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, players, onConfirm }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleConfirm = (status: PlayerStatus) => {
    if (selectedPlayerId) {
      onConfirm(selectedPlayerId, status);
      onClose();
    } else {
      alert('Por favor, selecione seu nome na lista.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Confirme sua Presença</h2>
            <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">&times;</button>
        </div>
        
        <div className="mb-4">
          <label htmlFor="player-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selecione seu nome:
          </label>
          <select
            id="player-select"
            value={selectedPlayerId ?? ''}
            onChange={(e) => setSelectedPlayerId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>-- Quem é você? --</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleConfirm(PlayerStatus.CONFIRMED)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedPlayerId}
          >
            ✅ Vou
          </button>
          <button
            onClick={() => handleConfirm(PlayerStatus.MAYBE)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedPlayerId}
          >
            ❓ Talvez
          </button>
          <button
            onClick={() => handleConfirm(PlayerStatus.DECLINED)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedPlayerId}
          >
            ❌ Não vou
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
