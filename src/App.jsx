import axios from "axios";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [addTaskMenu, toggleAddTaskMenu] = useState(false);
  const endpoint = "http://localhost:3001";

  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get(`${endpoint}/api/tasks`);

      setTasks(response.data.tasks);
    };

    getTasks();
  }, []);

  const deleteTask = async (deletedTask) => {
    const response = await axios.delete(`${endpoint}/api/tasks/${deletedTask._id}`);

    setTasks(tasks.filter((task) => task._id !== deletedTask._id));

    return response;
  };

  const addTask = async (newTask) => {
    const response = await axios.post(`${endpoint}/api/tasks`, newTask)

    const addedTask = response.data.task

    let existingTasks = tasks;
    existingTasks.push(addedTask)
    
    setTasks(existingTasks)

    return response;
  }

  if (addTaskMenu) {
    return <AddTask addTask={addTask} addTaskMenu={addTaskMenu} setAddTaskMenu={toggleAddTaskMenu} />
  }

  return (
    <div className="App">
      <h1 className="text-5xl font-bold text-center my-10">tasks<span onClick={() => toggleAddTaskMenu(!addTaskMenu)} className="px-3 pb-2 border border-black m-4 cursor-pointer">+</span></h1>
      <div className="flex justify-center gap-6">
        {tasks.map((task) => (
          <Task task={task} deleteTask={deleteTask} key={task._id} />
        ))}
      </div>
    </div>
  );
}

export default App;
