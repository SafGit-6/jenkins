const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data
let users = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" }
];

// Health
app.get("/", (req, res) => {
  res.json({ message: "Express CRUD app running 🚀" });
});

//
// CREATE
//
app.post("/users", (req, res) => {
  const user = {
    id: Date.now(),
    name: req.body.name
  };

  users.push(user);
  res.status(201).json(user);
});

//
// READ
//
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

//
// UPDATE
//
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name;
  res.json(user);
});

//
// DELETE
//
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

