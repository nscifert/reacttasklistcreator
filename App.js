import React, { useState, useRef, useEffect } from 'react'
import TaskList from './TaskList'
import {v4 as uuidv4} from 'uuid'
import './App.css'


const LOCAL_STORAGE_KEY = 'taskApp.task'

function App() {
  const [task, setTask] = useState([]) //Object destructuring
  const taskNameRef = useRef();

  //called only once due to empty array of dependencies 
  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTask) setTask(storedTask)
  }, [])


  //useEffect allows the componet to do something after it has been rendered
  //the task is save on to the local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(task));
  }, [task])
  
  function toggleTask(id) {
    const newTask = [...task];
    const tasks = newTask.find(task => task.id === id);
    tasks.complete = !tasks.complete;
    setTask(newTask)
  }

  function handleAddTask (e) {
    const name = taskNameRef.current.value
  
    //If input is empty string
    //do not add an empty task to list
    if (name === '') return 
    
    //prev value as function call
    //task with an id, a name, and a complete flag
    //uuidv4 is a function from the uuid lib
    //to create random id values
    setTask(prevTask => {
      return [...prevTask, {id:uuidv4(), name: name, complete: false}]
    })
   
    //clears out input
    taskNameRef.current.value =null


  }
  
  function handleCompleteTask() {
    const newTask = task.filter(task => !task.complete)
    setTask(newTask)
  }

  return (
    //Because we are doing two things we must
    //create a fragment <> </>
    <>
    <header>
      <div>
      <h1>Task List Creator</h1>
      </div>
      </header>
   
    <TaskList  task={task} toggleTask={toggleTask}/>
    <input ref={taskNameRef} type="text" onKeyPress={event => {
      if (event.key ==='Enter') {
        handleAddTask()
      }
    }} />
    <button onClick={handleAddTask}>Add Task</button>
    <button onClick={handleCompleteTask}>Complete Task</button>
    <div className="taskcompletetext">{task.filter(task => !task.complete).length} Task to complete!</div>
  
    </>
  )
}

export default App;
