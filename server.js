const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

console.log("🔥 NEW VERSION DEPLOYED");

// 🔗 MySQL Connection (Railway Public)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT)
});

// ✅ Connect to DB
db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// 📩 Contact Route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Request received:", req.body);

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log("Insert Error:", err);
      res.status(500).send("Error saving data");
    } else {
      console.log("Saved to MySQL ✅");
      res.send("Saved");
    }
  });
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
