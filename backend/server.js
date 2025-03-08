const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express(); // ✅ Declare 'app' before using it
const PORT = 4000;

app.use(cors());
app.use(express.json()); // ✅ Fix for missing request body

// Test route to confirm the server is running
app.get("/", (req, res) => {
  res.send("Server is running on port " + PORT + " 🚀");
});

// API endpoint for finding user data
app.post("/find-my-data", (req, res) => {
  console.log("Received request:", req.body); // ✅ Log request to terminal

  const { name, email, linkedin } = req.body;
  if (!name || !email || !linkedin) {
    return res.status(400).json({ error: "All fields are required" });
  }

  res.json({ message: `Searching for ${name}...` });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
