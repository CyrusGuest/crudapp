const Task = ({ task, deleteTask }) => {
  return (
    <div className="border border-black p-4">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Completed: {task.completed ? "true" : "false"}</p>
      <button
        onClick={() => deleteTask(task)}
        className="border border-black p-2 cursor-pointer"
      >
        delete
      </button>
      <button className="border border-black p-2 cursor-pointer">edit</button>
      <button className="border border-black p-2 cursor-pointer">
        toggle completion
      </button>
    </div>
  );
};

export default Task;
