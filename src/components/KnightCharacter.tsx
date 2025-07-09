
import React from 'react';
import { Shield, Sword, Crown } from 'lucide-react';

interface KnightCharacterProps {
  action: 'idle' | 'attacking' | 'resting' | 'battling';
  mode: 'todo' | 'pomodoro';
}

const KnightCharacter: React.FC<KnightCharacterProps> = ({ action, mode }) => {
  const getKnightClass = () => {
    switch (action) {
      case 'idle':
        return 'knight-idle';
      case 'attacking':
        return 'knight-attack';
      case 'resting':
        return 'knight-rest';
      case 'battling':
        return 'knight-battle';
      default:
        return 'knight-idle';
    }
  };

  const getKnightPose = () => {
    if (mode === 'pomodoro') {
      return action === 'resting' ? 'sitting' : 'fighting';
    }
    return action === 'attacking' ? 'striking' : 'ready';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Knight Visual */}
      <div className={`relative ${getKnightClass()} transition-all duration-300`}>
        <div className="w-32 h-40 bg-gradient-to-b from-medieval-gold to-medieval-wood rounded-lg shadow-lg border-4 border-medieval-wood flex flex-col items-center justify-center relative overflow-hidden">
          {/* Knight Helmet */}
          <div className="absolute top-2">
            <Crown size={24} className="text-medieval-gold" />
          </div>
          
          {/* Knight Body */}
          <div className="flex items-center justify-center mt-4">
            {mode === 'todo' || action === 'battling' ? (
              <>
                <Shield size={20} className="text-medieval-wood mr-1" />
                <Sword size={24} className="text-medieval-demon" />
              </>
            ) : (
              <div className="w-8 h-8 bg-medieval-wood rounded-full" />
            )}
          </div>
          
          {/* Knight Legs/Base */}
          <div className="absolute bottom-2 w-6 h-8 bg-medieval-wood rounded-sm" />
          
          {/* Action Effects */}
          {action === 'attacking' && (
            <div className="absolute inset-0 bg-medieval-gold/20 rounded-lg animate-pulse" />
          )}
          
          {action === 'battling' && (
            <div className="absolute -right-2 -top-2 w-4 h-4 bg-medieval-demon rounded-full animate-bounce" />
          )}
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center">
        <p className="text-sm font-semibold text-medieval-wood/80">
          {mode === 'todo' 
            ? (action === 'attacking' ? 'Slaying Demon!' : 'Ready to Fight')
            : (action === 'battling' ? 'In Battle!' : 'Resting')}
        </p>
      </div>
    </div>
  );
};

export default KnightCharacter;
