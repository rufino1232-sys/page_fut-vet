import { Player, PlayerStatus } from './types';

export const INITIAL_PLAYERS: Player[] = [
  { id: 1, name: 'Erivelton', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 2, name: 'Rodrigo', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 3, name: 'Oliveira', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 4, name: 'Márcio', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 5, name: 'Fábio Kareka', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 6, name: 'Fabinho', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 7, name: 'Maurão', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 8, name: 'Sr Romeu', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 9, name: 'Sr Luiz-Japonês', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 10, name: 'Marquinhos', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 11, name: 'Gilberto', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 12, name: 'Junior', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 13, name: 'Sr Rui', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 14, name: 'Alencar', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 15, name: 'Jurandir', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 16, name: 'Deno', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 17, name: 'Vava', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 18, name: 'Didi', status: PlayerStatus.UNCONFIRMED, position: null },
  { id: 19, name: 'Bahia', status: PlayerStatus.UNCONFIRMED, position: null },
];

export const WHATSAPP_MESSAGE = `⚽ Partida dos Boleiros — Domingo, 8h no Campo Verde

Confirme sua presença clicando aqui 👉 ${window.location.href}

Vamos montar o time! 💪`;