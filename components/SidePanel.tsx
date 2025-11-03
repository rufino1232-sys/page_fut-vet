import React, { useState, useRef, useEffect } from 'react';
import { Player, PlayerStatus } from '../types';
import { WHATSAPP_MESSAGE } from '../constants';
import { ConfirmedIcon, MaybeIcon, DeclinedIcon, UnconfirmedIcon } from './icons';

interface SidePanelProps {
  players: Player[];
  onConfirmPresence: () => void;
  clearField: () => void;
  resetMatch: () => void;
  addPlayer: (name: string) => void;
  removePlayer: (playerId: number) => void;
  updatePlayerName: (playerId: number, newName: string) => void;
  setPlayerAsCoach: (playerId: number) => void;
  isCoachMode: boolean;
  onExport: () => void;
}

const PlayerListItem: React.FC<{
  player: Player;
  removePlayer: (playerId: number) => void;
  updatePlayerName: (playerId: number, newName: string) => void;
  setPlayerAsCoach: (playerId: number) => void;
  isCoachMode: boolean;
}> = ({ player, removePlayer, updatePlayerName, setPlayerAsCoach, isCoachMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(player.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const getStatusIcon = () => {
    switch (player.status) {
      case PlayerStatus.CONFIRMED: return <ConfirmedIcon />;
      case PlayerStatus.MAYBE: return <MaybeIcon />;
      case PlayerStatus.DECLINED: return <DeclinedIcon />;
      default: return <UnconfirmedIcon />;
    }
  };

  const handleSave = () => {
    if (name.trim() && name.trim() !== player.name) {
      updatePlayerName(player.id, name.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') {
      setName(player.name);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center gap-2 flex-grow min-w-0">
        {getStatusIcon()}
        {isEditing && isCoachMode ? (
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-b border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-green-500 w-full"
          />
        ) : (
          <span className="text-gray-800 dark:text-gray-200 truncate" title={player.name}>
            {player.role === 'coach' && <span className="mr-2 text-yellow-500" title="Técnico">👑</span>}
            {player.name}
          </span>
        )}
      </div>
      {isCoachMode && (
         <div className="flex items-center space-x-2 transition-opacity flex-shrink-0">
            {player.role !== 'coach' && (
                <button onClick={() => setPlayerAsCoach(player.id)} className="text-yellow-500 hover:text-yellow-400" aria-label="Set as coach" title="Promover a Técnico">
                    <i className="fas fa-crown"></i>
                </button>
            )}
            {isEditing ? (
            <button onClick={handleSave} className="text-green-500 hover:text-green-400" aria-label="Save name">
                <i className="fas fa-check"></i>
            </button>
            ) : (
            <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-400" aria-label="Edit name">
                <i className="fas fa-pencil-alt"></i>
            </button>
            )}
            <button onClick={() => removePlayer(player.id)} className="text-red-500 hover:text-red-400" aria-label="Remove player">
            <i className="fas fa-trash-alt"></i>
            </button>
        </div>
      )}
    </li>
  );
};

const SidePanel: React.FC<SidePanelProps> = ({ players, onConfirmPresence, clearField, resetMatch, addPlayer, removePlayer, updatePlayerName, setPlayerAsCoach, isCoachMode, onExport }) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  
  const handleShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };
  
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  return (
    <div className="w-full lg:w-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex-shrink-0 flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">Jogadores</h2>
      <ul className="space-y-1 flex-grow overflow-y-auto mb-4 pr-2">
        {players.map(player => (
          <PlayerListItem 
            key={player.id} 
            player={player} 
            removePlayer={removePlayer}
            updatePlayerName={updatePlayerName}
            setPlayerAsCoach={setPlayerAsCoach}
            isCoachMode={isCoachMode}
          />
        ))}
      </ul>
      {isCoachMode && (
        <form onSubmit={handleAddPlayer} className="flex space-x-2 mb-4">
            <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder="Nome do novo jogador"
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-transform transform hover:scale-105">
                <i className="fas fa-plus"></i>
            </button>
        </form>
      )}
      <div className="space-y-3">
        <button
          onClick={onConfirmPresence}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          <i className="fas fa-check-circle mr-2"></i> Confirmar Presença
        </button>
        <button
          onClick={handleShare}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          <i className="fab fa-whatsapp mr-2"></i> Compartilhar Convite
        </button>
        {isCoachMode && (
            <>
                <div className="flex space-x-2">
                    <button
                    onClick={clearField}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                    title="Desfaz a última confirmação de presença."
                    >
                    <i className="fas fa-undo mr-2"></i> Desfazer Conf.
                    </button>
                    <button
                    onClick={resetMatch}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                    >
                    <i className="fas fa-sync-alt mr-2"></i> Nova Partida
                    </button>
                </div>
                <button
                    onClick={onExport}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                >
                    <i className="fas fa-camera mr-2"></i> Exportar Time
                </button>
            </>
        )}
      </div>
    </div>
  );
};

export default SidePanel;