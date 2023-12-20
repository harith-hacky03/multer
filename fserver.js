const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require('crypto');
const mime = require('mime');
const path = require('path');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set your upload folder path
    },

    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.png');
        });
    }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
    console.log("file ==>", req.file);
    res.json(req.file);
});

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

app.get("/get-image/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    res.sendFile(filePath);
});

app.listen(5000, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:5000`);
});
