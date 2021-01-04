import React from 'react'
import './App.css'

export default function Task({task, toggleTask}) {
  function handleTaskClick() {
    toggleTask(task.id)
  }

  return (
    <div className="task">
      <label className="container">
        <input type="checkbox" checked={task.complete} onChange={handleTaskClick} />
        <span className="checkmark"></span>{task.name} 
      </label>
    </div>
  )
}