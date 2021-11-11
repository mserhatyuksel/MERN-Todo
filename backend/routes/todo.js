const router = require("express").Router();

const Todos = require("../models/Todo");

// Create new todo
router.post("/add", async (req, res) => {
  try {
    const newTodo = await Todos.create({
      text: req.body.text,
      username: req.body.username,
    });
    const todo = await newTodo.save();

    res.status(200).send(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read all todos
router.get("/:uname", async (req, res) => {
  try {
    const allTodos = await Todos.find({ username: req.params.uname });
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(todo);
    console.log(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndDelete(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete completed todos
router.delete("/completed/:uname", async (req, res) => {
  try {
    await Todos.deleteMany({
      username: req.params.uname,
      isCompleted: true,
    });
    const allTodos = await Todos.find({ username: req.params.uname });
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
