
import React, { useState } from 'react';
import { Sword, Shield, Timer, CheckSquare } from 'lucide-react';
import TodoMode from './TodoMode';
import PomodoroMode from './PomodoroMode';

const MedievalLayout = () => {
  const [currentMode, setCurrentMode] = useState<'todo' | 'pomodoro'>('todo');

  return (
    <div className="min-h-screen bg-gradient-to-br from-medieval-sand to-medieval-wood">
      {/* Medieval Header */}
      <header className="bg-medieval-wood/80 backdrop-blur-sm border-b-4 border-medieval-gold shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-medieval text-3xl text-medieval-gold text-shadow-medieval">
              Quest Manager
            </h1>
            
            {/* Mode Switcher */}
            <div className="flex bg-medieval-wood/50 rounded-lg p-1 border-2 border-medieval-gold">
              <button
                onClick={() => setCurrentMode('todo')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  currentMode === 'todo'
                    ? 'bg-medieval-gold text-medieval-wood shadow-md'
                    : 'text-medieval-gold hover:bg-medieval-gold/20'
                }`}
              >
                <Sword size={20} />
                <span className="font-semibold">Quests</span>
              </button>
              <button
                onClick={() => setCurrentMode('pomodoro')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  currentMode === 'pomodoro'
                    ? 'bg-medieval-gold text-medieval-wood shadow-md'
                    : 'text-medieval-gold hover:bg-medieval-gold/20'
                }`}
              >
                <Timer size={20} />
                <span className="font-semibold">Battle</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {currentMode === 'todo' ? <TodoMode /> : <PomodoroMode />}
      </main>
    </div>
  );
};

export default MedievalLayout;
