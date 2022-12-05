require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {
  establishDatabaseConnection,
  returnAllTasksInCollection,
  createTaskInDatabase,
  editTaskInDatabase,
  deleteTaskInDatabase,
} = require("./dbfuncs");

// CRUD API | create, read, update, delete

establishDatabaseConnection().then(() =>
  console.log("database connection established")
);

const PORT = process.env.PORT;
const app = express();

/// MIDDLEWARE

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// CRUD ROUTES

app.get("/api/tasks", async (req, res) => {
  const tasks = await returnAllTasksInCollection();
  +-res.send({ message: "tasks recieved", tasks });
});

app.post("/api/tasks", async (req, res) => {
  const newTask = req.body;

  const task = await createTaskInDatabase(newTask);
  res.send({ message: "task created", task });
});

app.put("/api/tasks/:id", async (req, res) => {
  const task = { _id: req.params.id, ...req.body };

  await editTaskInDatabase(task);
  res.send({ message: "task updated", task });
});

app.delete("/api/tasks/:_id", async (req, res) => {
  const _id = req.params._id;

  const task = await deleteTaskInDatabase(_id);
  res.send({ message: "task deleted", task });
});

// RUN SERVER

app.listen(PORT, () => {
  console.log(`api server now listening on port ${PORT}`);
});
