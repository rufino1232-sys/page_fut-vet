export enum PlayerStatus {
  UNCONFIRMED = 'UNCONFIRMED',
  CONFIRMED = 'CONFIRMED',
  MAYBE = 'MAYBE',
  DECLINED = 'DECLINED',
}

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  position: Position | null;
  role?: 'coach';
}
