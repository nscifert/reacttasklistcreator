import React from 'react'
import Task from './Task'

export default function TaskList({task, toggleTask}) {
  return (
    //map over current array 
    //the return elements 
    //task id key allows react to only changing componets that change insead of all of them
    <div className="taskList">
      {task && task.length > 0 ? 
      task.map(task => {
      return < Task key={task.id} toggleTask={toggleTask} task= {task} />
    })
    : "Add your first task."}
    </div>
 )
}
