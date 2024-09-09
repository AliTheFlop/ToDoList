import express from "express";
import cors from "cors";
import connectToDatabase from "./db.js";
import formatDueDate from "./formatTaskData.js";

const app = express();
const port = 3000;
const db = await connectToDatabase();

/*

- Reworked formatTaskData section to format due date into readable data
- 

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

app.post("/api/tasks", async (req, res) => {
  const items = req.body;
  try {
    await db.collection("tasks").insertOne(items);
    res.status(202).json({ yes: "Got it! " });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch items: " + e });
  }
});

app.listen(port, () => {
  console.log("API Server running on port " + port);
});
