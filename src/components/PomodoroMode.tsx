
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import KnightCharacter from './KnightCharacter';

const PomodoroMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [knightState, setKnightState] = useState<'resting' | 'battling'>('resting');

  const workDuration = 25 * 60; // 25 minutes
  const breakDuration = 5 * 60; // 5 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
      setKnightState('battling');
    } else if (timeLeft === 0) {
      // Session completed
      setIsActive(false);
      setKnightState('resting');
      
      if (sessionType === 'work') {
        setSessionType('break');
        setTimeLeft(breakDuration);
      } else {
        setSessionType('work');
        setTimeLeft(workDuration);
      }
    } else {
      setKnightState('resting');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, sessionType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setKnightState('resting');
    if (sessionType === 'work') {
      setTimeLeft(workDuration);
    } else {
      setTimeLeft(breakDuration);
    }
  };

  const switchSession = () => {
    setIsActive(false);
    setKnightState('resting');
    if (sessionType === 'work') {
      setSessionType('break');
      setTimeLeft(breakDuration);
    } else {
      setSessionType('work');
      setTimeLeft(workDuration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = sessionType === 'work' 
    ? ((workDuration - timeLeft) / workDuration) * 100
    : ((breakDuration - timeLeft) / breakDuration) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Session Info */}
      <div className="text-center">
        <h2 className="font-medieval text-3xl text-medieval-gold mb-2">
          {sessionType === 'work' ? 'Battle Session' : 'Rest Period'}
        </h2>
        <p className="text-lg text-medieval-wood/80">
          {sessionType === 'work' 
            ? 'Fight the demons of distraction!' 
            : 'Rest and recover your strength.'}
        </p>
      </div>

      {/* Knight Character - Center */}
      <div className="flex justify-center">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg border-2 border-medieval-gold p-8 shadow-xl">
          <KnightCharacter action={knightState} mode="pomodoro" />
        </div>
      </div>

      {/* Timer Display */}
      <div className="bg-card/80 backdrop-blur-sm rounded-lg border-2 border-medieval-gold p-8 shadow-xl">
        <div className="text-center space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-medieval-wood/30 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-medieval-gold to-medieval-demon h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time Display */}
          <div className="font-medieval text-6xl text-medieval-gold text-shadow-medieval">
            {formatTime(timeLeft)}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleTimer}
              className="flex items-center gap-2 px-6 py-3 bg-medieval-gold text-medieval-wood rounded-lg hover:bg-medieval-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-medieval-wood"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              <span className="font-semibold">
                {isActive ? 'Pause' : 'Start'}
              </span>
            </button>

            <button
              onClick={resetTimer}
              className="flex items-center gap-2 px-6 py-3 bg-medieval-wood text-medieval-gold rounded-lg hover:bg-medieval-wood/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-medieval-gold"
            >
              <RotateCcw size={20} />
              <span className="font-semibold">Reset</span>
            </button>

            <button
              onClick={switchSession}
              className="flex items-center gap-2 px-6 py-3 bg-medieval-demon text-white rounded-lg hover:bg-medieval-demon/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-medieval-wood"
            >
              <Square size={20} />
              <span className="font-semibold">
                Switch to {sessionType === 'work' ? 'Break' : 'Work'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroMode;
