const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "data.json";

// Read data
function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ forms: [], responses: [] }));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Save data
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Create form (admin)
app.post("/create-form", (req, res) => {
  const data = readData();
  data.forms.push(req.body);
  saveData(data);
  res.send({ message: "Form created successfully" });
});

// Get all forms (user)
app.get("/forms", (req, res) => {
  const data = readData();
  res.send(data.forms);
});

// Submit response (user)
app.post("/submit", (req, res) => {
  const data = readData();
  data.responses.push(req.body);
  saveData(data);
  res.send({ message: "Response submitted" });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
