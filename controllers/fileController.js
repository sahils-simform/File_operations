/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const File = require("../models/file");

const uploadFile = (req, res) => {
  const files = new File({
    filename: "read.txt",
    content: fs.readFileSync(
      path.join(__dirname, "..", "uploads", req.file.filename)
    ),
  });
  files.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error writing to the file." });
    }
    res.json({ message: "File uploaded successfully." });
  });
};

const readFile = (req, res) => {
  File.findOne({ filename: "read.txt" }, (err, file) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading the file." });
    }

    res.json({ content: JSON.parse(file.content.toString()) });
  });
};

const writeFile = (req, res) => {
  const { content } = req.body;

  const file = new File({ filename: "read.txt", content });
  file.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error writing to the file." });
    }

    res.json({ message: "Content written to the file successfully." });
  });
};

const appendFile = async (req, res) => {
  const { content } = req.body;
  File.findOne({ filename: "read.txt", content }, (err, file) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error appending to the file." });
    }
    file.content += content;
    file.save(() => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error appending to the file." });
      }

      return res.json({
        message: "Content appended to the file successfully.",
      });
    });
  });
};

//   try {
//     const { content } = req.body;
//     const id = "648aa7494b082f6bda1db0c3";
//     const fileData = await File.findOne({ _id: id });
//     console.log(fileData);
//     // console.log(JSON.parse(fileData));
//     fileData.contant += content;
//     console.log(content);
//     console.log(JSON.parse(fileData, toString()));

//     await fileData.save();
//     res.status(200).json({ message: "success" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: "Error appending to the file." });
//   }

const streamToFile = (req, res) => {
  const writeStream = fs.createWriteStream("read.txt");

  req.on("data", (chunk) => {
    writeStream.write(chunk);
  });

  req.on("end", () => {
    writeStream.end();
    res.json({ message: "File streamed successfully." });
  });
};

module.exports = { uploadFile, readFile, writeFile, appendFile, streamToFile };
