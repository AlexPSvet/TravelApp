const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});