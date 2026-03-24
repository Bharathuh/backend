const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("New Message Received:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  res.status(200).json({ message: "Message received successfully" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});