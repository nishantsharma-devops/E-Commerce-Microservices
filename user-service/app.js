const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy users
const users = [];

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: "User registered" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(3003, () => {
  console.log("User service running on port 3004");
});