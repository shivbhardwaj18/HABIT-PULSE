import React, { useState } from 'react';

const HabitGrid = ({ habits, days, history, onToggle, onDelete, onEdit }) => {
  const dayColumns = Array.from({ length: days }, (_, i) => i + 1);
  
  // State to track which habit is currently being edited
  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState("");

  const startEdit = (habit) => {
    setEditingId(habit.id);
    setTempName(habit.name);
  };

  const saveEdit = (id) => {
    if (tempName.trim()) {
      onEdit(id, tempName);
    }
    setEditingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') setEditingId(null);
  };

  return (
    <div className="card">
      {habits.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          <h3>No habits yet 🍃</h3>
          <p>Add a habit above to start your streak!</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: '220px' }}>Habit Task</th>
                {dayColumns.map((day) => (
                  <th key={day}>Day {day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit.id}>
                  {/* Sticky First Column */}
                  <td>
                    {editingId === habit.id ? (
                      <input 
                        type="text" 
                        value={tempName}
                        autoFocus
                        className="edit-input"
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={() => saveEdit(habit.id)}
                        onKeyDown={(e) => handleKeyDown(e, habit.id)}
                      />
                    ) : (
                      <div className="habit-cell">
                        <span className="habit-name-text" title={habit.name}>
                          {habit.name}
                        </span>
                        <div className="action-btn-group">
                          <button 
                            className="icon-btn edit" 
                            onClick={() => startEdit(habit)}
                            title="Edit Name"
                          >
                            ✏️
                          </button>
                          <button 
                            className="icon-btn delete" 
                            onClick={() => onDelete(habit.id)}
                            title="Delete Habit"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                  
                  {/* Scrollable Days */}
                  {dayColumns.map((day) => {
                    const isCompleted = history[habit.id]?.[day] || false;
                    return (
                      <td key={`${habit.id}-${day}`}>
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => onToggle(habit.id, day)}
                          />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HabitGrid;