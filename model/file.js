const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  content: Buffer,
});

module.exports = mongoose.model("files", fileSchema);
