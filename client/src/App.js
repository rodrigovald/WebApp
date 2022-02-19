
import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {

  const[taskName, setTaskName] = useState('')
  const[taskDes, setTaskDes] = useState('')
  const[newTaskName, setNewTaskName] = useState('')

  const [taskList, setTaskList] = useState([])

  useEffect(()=> {
    Axios.get("http://localhost:3001/read").then((response) => {
      setTaskList(response.data)
    })

  })

  

  const addList = ()=>{
    Axios.post("http://localhost:3001/insert", {
      taskName: taskName, 
      taskDes: taskDes
    })

  }

  const updateTask= (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id, 
      newTaskName: newTaskName,
    })
  }
  const deleteTask = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }

  return (
    <div className="App">
      <h1>Drop your Chores Here</h1>

      <label className='label'>Task Name:</label>
      <input className='todo-input' type="text" onChange={((event) => {setTaskName(event.target.value)})}/>
      <button className='todo-button' onClick={addList}>Add to List </button>
      
      <h1>Tasks List</h1>

      {taskList.map((val,key)=>{
        return (
        <div className = 'container' key = {key}>  
          <div>
            <h1> <input type="checkbox"></input>{val.taskName}</h1> 
            <input className='update' tpye="text" placeholder='New task Name...' onChange={
            ((event) => {setNewTaskName(event.target.value)})}/>
          </div>
          
          <button className='todo-button' onClick={() => updateTask(val._id)}>Update</button>
          <button className='todo-button' onClick={() => deleteTask(val._id)}>Delete</button>
        </div>
        )
      })}
    
    </div>
  );
}

export default App;
