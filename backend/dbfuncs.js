require("dotenv").config();
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

// INITIALIZATION

const establishDatabaseConnection = () => {
  const databaseURL = process.env.DATABASE_URL;
  return mongoose.connect(databaseURL);
};

// OPERATING FUNCTIONS

const returnAllTasksInCollection = async () => {
  const databaseQueryResult = await Task.find({});

  return databaseQueryResult;
};

const createTaskInDatabase = async (task) => {
  const newTask = new Task(task);

  const saveToDBResult = await newTask.save();
  return saveToDBResult;
};

const editTaskInDatabase = async (task) => {
  const newTask = await Task.findOneAndReplace({ _id: task._id }, task);

  return newTask;
};

const deleteTaskInDatabase = async (_id) => {
  const task = await Task.findOneAndDelete({ _id });

  return task;
};

// EXPORTS

exports.establishDatabaseConnection = establishDatabaseConnection;
exports.returnAllTasksInCollection = returnAllTasksInCollection;
exports.createTaskInDatabase = createTaskInDatabase;
exports.editTaskInDatabase = editTaskInDatabase;
exports.deleteTaskInDatabase = deleteTaskInDatabase;