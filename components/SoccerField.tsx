import React, { useLayoutEffect, useState } from 'react';
import { Player, PlayerStatus, Position } from '../types';
import PlayerAvatar from './PlayerAvatar';

interface SoccerFieldProps {
  players: Player[];
  updatePlayerPosition: (playerId: number, position: Position) => void;
  isCoachMode: boolean;
  fieldRef: React.RefObject<HTMLDivElement>;
}

const SoccerField: React.FC<SoccerFieldProps> = ({ players, updatePlayerPosition, isCoachMode, fieldRef }) => {
  const [fieldRect, setFieldRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    if (fieldRef.current) {
        setFieldRect(fieldRef.current.getBoundingClientRect());
    }
    const handleResize = () => {
        if (fieldRef.current) {
            setFieldRect(fieldRef.current.getBoundingClientRect());
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fieldRef]);


  const playersOnField = players.filter(p => p.status === PlayerStatus.CONFIRMED && p.position);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-square sm:aspect-[5/3] bg-fieldGreen dark:bg-fieldGreenDark rounded-lg shadow-2xl border-4 border-lineWhite overflow-hidden" ref={fieldRef}>
      {/* Field Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-lineWhite"></div> {/* Center Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border-4 border-lineWhite rounded-full"></div> {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-lineWhite rounded-full"></div> {/* Center Dot */}
      
      {/* Penalty Areas */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[18%] h-[60%] border-4 border-l-0 border-lineWhite rounded-r-lg"></div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[18%] h-[60%] border-4 border-r-0 border-lineWhite rounded-l-lg"></div>

      {/* Goal Areas */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[8%] h-[30%] border-4 border-l-0 border-lineWhite rounded-r-lg"></div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[8%] h-[30%] border-4 border-r-0 border-lineWhite rounded-l-lg"></div>
      
      {/* Players */}
      {fieldRect && playersOnField.map(player => (
        <PlayerAvatar
          key={player.id}
          player={player}
          onPositionUpdate={(id, pos) => {
             if (!fieldRect) return;
             const relativePos = {
                 x: pos.x - fieldRect.left,
                 y: pos.y - fieldRect.top
             };
             updatePlayerPosition(id, relativePos);
          }}
          constraintsRef={fieldRef}
          isCoachMode={isCoachMode}
        />
      ))}
    </div>
  );
};

export default SoccerField;