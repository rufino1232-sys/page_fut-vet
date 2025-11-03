import { useState, useEffect, useCallback } from 'react';
import { Player, PlayerStatus, Position } from '../types';
import { INITIAL_PLAYERS } from '../constants';

const LOCAL_STORAGE_KEY = 'amigos_da_bola_lineup_v2';

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    let initialValue = INITIAL_PLAYERS;
    try {
      const storedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Ensure the parsed data is an array before using it.
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            initialValue = parsedData;
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      // If parsing fails, we'll fall back to the default initial players
    }
    setPlayers(initialValue);
  }, []);

  useEffect(() => {
    // Avoid saving an empty array on the initial render before hydration
    if (players.length > 0) {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players));
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }
  }, [players]);

  const updatePlayerStatus = useCallback((playerId: number, status: PlayerStatus) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(p => {
        if (p.id === playerId) {
          const newPosition = status === PlayerStatus.CONFIRMED ? (p.position || { x: 50, y: 50 }) : null;
          return { ...p, status, position: newPosition };
        }
        return p;
      })
    );
  }, []);

  const updatePlayerPosition = useCallback((playerId: number, position: Position) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === playerId ? { ...p, position } : p
      )
    );
  }, []);
  
  const addPlayer = useCallback((name: string) => {
    setPlayers(prevPlayers => {
        const newPlayer: Player = {
            id: Date.now(),
            name,
            status: PlayerStatus.UNCONFIRMED,
            position: null,
        };
        return [...prevPlayers, newPlayer];
    });
  }, []);

  const removePlayer = useCallback((playerId: number) => {
    if (window.confirm("Tem certeza que deseja remover este jogador da lista?")) {
        setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== playerId));
    }
  }, []);

  const updatePlayerName = useCallback((playerId: number, newName: string) => {
    setPlayers(prevPlayers => prevPlayers.map(p =>
        p.id === playerId ? { ...p, name: newName } : p
    ));
  }, []);

  const setPlayerAsCoach = useCallback((playerId: number) => {
    setPlayers(prevPlayers => prevPlayers.map(p => {
        if (p.id === playerId) {
            return { ...p, role: 'coach' };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { role, ...playerWithoutRole } = p;
        return playerWithoutRole;
    }));
  }, []);


  const clearField = useCallback(() => {
    setPlayers(prevPlayers => {
      const allPlayers = [...prevPlayers];
      // Find the index of the last confirmed player.
      const lastConfirmedIndex = allPlayers.map(p => p.status).lastIndexOf(PlayerStatus.CONFIRMED);
      
      // If no one is confirmed, do nothing.
      if (lastConfirmedIndex === -1) {
        return prevPlayers;
      }
      
      // Get the player to update and change their status and position.
      const playerToUpdate = allPlayers[lastConfirmedIndex];
      allPlayers[lastConfirmedIndex] = {
        ...playerToUpdate,
        status: PlayerStatus.UNCONFIRMED,
        position: null,
      };
      
      return allPlayers;
    });
  }, []);

  const resetMatch = useCallback(() => {
    if (window.confirm("Isso irá limpar todas as confirmações e posições do campo. A lista de jogadores será mantida. Deseja continuar?")) {
      setPlayers(prevPlayers =>
        prevPlayers.map(p => ({
          ...p, // Keep id, name, and role
          status: PlayerStatus.UNCONFIRMED,
          position: null,
        }))
      );
    }
  }, []);

  return { players, updatePlayerStatus, updatePlayerPosition, clearField, resetMatch, addPlayer, removePlayer, updatePlayerName, setPlayerAsCoach };
};