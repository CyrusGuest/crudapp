import React, { useState } from "react";

const AddTask = ({ addTask, addTaskMenu, setAddTaskMenu }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const submitForm = async () => {
    const task = { title, description, completed };

    await addTask(task);

    setAddTaskMenu(false);
  };

  return (
    <div className="flex flex-col text-center align-center w-2/6 mx-auto gap-4 mt-6">
      <h1 className="text-3xl font-bold">
        add new task
        <span
          onClick={() => setAddTaskMenu(!addTaskMenu)}
          className="border border-black px-2 cursor-pointer"
        >
          X
        </span>
      </h1>

      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="title"
        type="title"
        className="border border-black"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="description"
        type="description"
        className="border border-black"
      />
      <div>
        {completed ? (
          <button
            onClick={() => setCompleted(true)}
            className="border border-black mx-2 p-2 font-bold"
          >
            completed
          </button>
        ) : (
          <button
            onClick={() => setCompleted(true)}
            className="border border-black mx-2 p-2"
          >
            completed
          </button>
        )}
        {completed ? (
          <button
            onClick={() => setCompleted(false)}
            className="border border-black p-2"
          >
            not completed
          </button>
        ) : (
          <button
            onClick={() => setCompleted(false)}
            className="border border-black p-2 font-bold"
          >
            not completed
          </button>
        )}
      </div>

      <button onClick={submitForm} className="border border-black">
        add task
      </button>
    </div>
  );
};

export default AddTask;
