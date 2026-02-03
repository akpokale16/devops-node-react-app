
const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const app = express();
app.use(cors());
app.use(express.json());

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

let notes = [];

app.get("/api/notes", (req, res) => res.json(notes));

app.post("/api/notes", (req, res) => {
  notes.push(req.body.note);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend running on 5000"));
