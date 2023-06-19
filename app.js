const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
