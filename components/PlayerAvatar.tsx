import React from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Player, Position } from '../types';

interface PlayerAvatarProps {
  player: Player;
  onPositionUpdate: (playerId: number, position: Position) => void;
  constraintsRef: React.RefObject<HTMLDivElement>;
  isCoachMode: boolean;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ player, onPositionUpdate, constraintsRef, isCoachMode }) => {
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isCoachMode) {
      onPositionUpdate(player.id, { x: info.point.x, y: info.point.y });
    }
  };
  
  return (
    <motion.div
      drag={isCoachMode}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      whileHover={isCoachMode ? { scale: 1.1, zIndex: 10 } : {}}
      whileTap={isCoachMode ? { scale: 0.9, zIndex: 10 } : {}}
      className={`absolute flex flex-col items-center ${isCoachMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
      style={{
        left: '-28px', // Half of width to center
        top: '-32px', // Half of height to center
        x: player.position?.x,
        y: player.position?.y,
      }}
    >
      <div className="w-14 h-14 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white dark:border-gray-800 shadow-lg">
        {player.name.charAt(0)}
      </div>
      <span className="mt-1 text-xs font-semibold bg-black/50 text-white px-2 py-1 rounded">
        {player.name}
      </span>
    </motion.div>
  );
};

export default PlayerAvatar;
