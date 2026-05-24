import React, { useState } from 'react';

const HabitForm = ({ days, setDays, onAddHabit, onReset }) => {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;
    onAddHabit(habitName);
    setHabitName('');
  };

  return (
    <div className="card">
      <h1 className="title">✨ Habit Pulse</h1>
      
      <form onSubmit={handleSubmit} className="controls-container">
        {/* Days Selector */}
        <div className="input-group">
          <label htmlFor="days-select">Duration</label>
          <select 
            id="days-select"
            value={days} 
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value="3">3 Days</option>
            <option value="5">5 Days</option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
          </select>
        </div>

        {/* New Habit Input */}
        <div className="input-group" style={{ flexGrow: 1 }}>
          <label htmlFor="habit-input">Add New Habit</label>
          <input 
            id="habit-input"
            type="text" 
            placeholder="e.g., Morning Jog, Read Books..." 
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <button type="submit" className="add-btn">
          + Add Habit
        </button>
        
        <button type="button" onClick={onReset} className="reset-btn" title="Clear all data">
          Reset
        </button>
      </form>
    </div>
  );
};

export default HabitForm;