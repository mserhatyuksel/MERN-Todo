const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      min: 3,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todos", TodosSchema);
