const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const todoRoute = require("./routes/todo");
const authRoute = require("./routes/auth");

const app = express();
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

app.use(express.json()); // Body parser
app.use(morgan("common")); // Console log
app.use(helmet());
app.use(cors());

app.use("/api/todos", todoRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running on " + process.env.PORT);
});
