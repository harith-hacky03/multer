const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("file ==>", req.file);
  res.json(req.file);
});

app.listen(5000, () => console.log("listening at http://localhost:5000"));