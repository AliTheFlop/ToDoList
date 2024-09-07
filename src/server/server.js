import express from "express";
import cors from "cors";
import connectToDatabase from "./db.js";
import formatTask from "./formatTaskData.js";
import getNextDate from "./formatTaskData.js";

const app = express();
const port = 3000;
const db = await connectToDatabase();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true  
}))

app.get("/api/tasks", async (req, res) => {
  try {
    const items = await db.collection("tasks").find().toArray();
    items.map((item) => (item.endDate = getNextDate(item)));
    console.log(await formatTask(items[0]));
    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch items.", errorCode: e });
  }
});

app.post("/api/tasks", async (req,res) => {
  const items = req.body;
  try{
    await db.collection("tasks").insertOne(items);
    res.status(202).json({yes: "Got it! "})
  } catch (e) {
    console.log(e)
    res.status(500).json({error: "Failed to fetch items: " + e})
  }
})

app.listen(port, () => {
  console.log("API Server running on port " + port);
});
