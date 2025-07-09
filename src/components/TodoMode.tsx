
import React, { useState } from 'react';
import { Plus, Skull } from 'lucide-react';
import KnightCharacter from './KnightCharacter';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TodoMode = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [knightAction, setKnightAction] = useState<'idle' | 'attacking'>('idle');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const slayDemon = (taskId: string) => {
    // Trigger knight attack animation
    setKnightAction('attacking');
    
    // Mark task as completed after animation delay
    setTimeout(() => {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      ));
      
      // Remove completed task after demon death animation
      setTimeout(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setKnightAction('idle');
      }, 800);
    }, 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[70vh]">
      {/* Tasks Panel */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg border-2 border-medieval-gold p-6 shadow-xl">
          <h2 className="font-medieval text-2xl text-medieval-gold mb-6 text-center">
            Demons to Slay
          </h2>
          
          {/* Add New Task */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Name your demon..."
              className="flex-1 px-4 py-3 bg-medieval-sand/50 border-2 border-medieval-wood rounded-lg focus:outline-none focus:border-medieval-gold transition-colors text-medieval-wood placeholder-medieval-wood/60"
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-medieval-gold text-medieval-wood rounded-lg hover:bg-medieval-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-medieval-wood"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-medieval-wood/60">
                <Skull size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">No demons to face... yet.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 p-4 bg-medieval-sand/30 rounded-lg border-2 border-medieval-wood/50 transition-all duration-300 ${
                    task.completed ? 'demon-death' : 'hover:bg-medieval-sand/50'
                  }`}
                >
                  <button
                    onClick={() => slayDemon(task.id)}
                    className="p-2 bg-medieval-demon text-white rounded-full hover:bg-medieval-demon/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                    disabled={task.completed}
                  >
                    <Skull size={24} />
                  </button>
                  <span className={`flex-1 text-lg ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Knight Panel */}
      <div className="flex items-center justify-center">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg border-2 border-medieval-gold p-8 shadow-xl">
          <h3 className="font-medieval text-xl text-medieval-gold mb-6 text-center">
            Your Champion
          </h3>
          <KnightCharacter action={knightAction} mode="todo" />
        </div>
      </div>
    </div>
  );
};

export default TodoMode;
