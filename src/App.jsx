import React, { useState, useEffect } from 'react';
import HabitForm from './components/HabitForm';
import HabitGrid from './components/HabitGrid';
import ProgressChart from './components/ProgressChart';
import './App.css';

function App() {
  // --- State Initialization ---
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habit_tracker_habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('habit_tracker_history');
    return saved ? JSON.parse(saved) : {};
  });

  const [days, setDays] = useState(() => {
    const saved = localStorage.getItem('habit_tracker_days');
    return saved ? parseInt(saved) : 7;
  });

  // --- Side Effects ---
  useEffect(() => {
    localStorage.setItem('habit_tracker_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habit_tracker_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('habit_tracker_days', days.toString());
  }, [days]);

  // --- Handlers ---

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now().toString(),
      name: name
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id) => {
    if(window.confirm("Are you sure you want to delete this habit?")) {
      setHabits(habits.filter(h => h.id !== id));
      // Optional: Cleanup history for this ID
      const newHistory = { ...history };
      delete newHistory[id];
      setHistory(newHistory);
    }
  };

  const editHabit = (id, newName) => {
    setHabits(habits.map(h => h.id === id ? { ...h, name: newName } : h));
  };

  const toggleCompletion = (habitId, day) => {
    setHistory((prevHistory) => {
      const habitHistory = prevHistory[habitId] || {};
      return {
        ...prevHistory,
        [habitId]: {
          ...habitHistory,
          [day]: !habitHistory[day]
        }
      };
    });
  };

  const resetData = () => {
    if(window.confirm("This will delete ALL habits and progress. Are you sure?")) {
      setHabits([]);
      setHistory({});
      localStorage.clear();
      // We keep days preference, or you can reset it too: setDays(7);
    }
  };

  return (
    <div className="app-container">
      <HabitForm 
        days={days} 
        setDays={setDays} 
        onAddHabit={addHabit}
        onReset={resetData} 
      />

      <HabitGrid 
        habits={habits} 
        days={days} 
        history={history} 
        onToggle={toggleCompletion}
        onDelete={deleteHabit}
        onEdit={editHabit}
      />

      <ProgressChart 
        days={days} 
        habits={habits} 
        history={history} 
      />
    </div>
  );
}

export default App;