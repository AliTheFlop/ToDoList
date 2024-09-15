import express from "express";
import cors from "cors";
import connectToDatabase from "./db.js";
import formatDueDate from "./formatTaskData.js";
import { ObjectId } from "mongodb";

const app = express();
const port = 3000;
const db = await connectToDatabase();

/*

14/9/24

- Reworked formatTaskData section to format due date into readable data

*/

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/api/tasks", async (req, res) => {
  try {
    const items = await db
      .collection("tasks")
      .find()
      .sort({ dueDate: 1 }, function (err, cursor) {
        console.log(err);
        console.log(cursor);
      })
      .toArray();
    items.map((item) => (item.dueDate = formatDueDate(item)));
    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch items.", errorCode: e });
  }
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/api/tasks", async (req, res) => {
  const [taskName, taskDueDate, taskDueTime] = req.body;

  const items = {
    name: taskName,
    time: taskDueTime,
    dueDate: new Date(`${taskDueDate}T${taskDueTime}:00Z`),
  };

  try {
    await db.collection("tasks").insertOne(items);
    res.status(200).json({ message: "Task added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch items: " + e });
  }
});

app.delete("/api/tasks", async (req, res) => {
  let id = new ObjectId(req.body.source._id);
  try {
    await db.collection("tasks").deleteOne({
      _id: id,
    });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error deleting task: " + e });
  }
});

app.listen(port, () => {
  console.log("API Server running on port " + port);
});
