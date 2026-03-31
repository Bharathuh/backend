const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL connection (Railway)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("✅ Database connected!");
  }
});

// ✅ Route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving message");
    }
    res.send("Message saved!");
  });
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
