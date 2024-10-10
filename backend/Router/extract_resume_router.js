const express = require("express");
const router = express.Router();
const resume_service = require("../Service/extract_resume_service");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (_, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + "_" + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/autofill', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        const file_path = req.file.path;
        const extracted_resume = await resume_service.extract_resume_info(file_path);
        
        // Optionally, delete the uploaded file after processing
        fs.unlink(file_path, (err) => {
            if (err) console.error(`Error deleting file: ${err.message}`);
        });

        res.status(200).send(extracted_resume);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/read', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        const file_path = req.file.path;
        const extracted_resume = await resume_service.read_resume(file_path);
        
        // Optionally, delete the uploaded file after processing
        fs.unlink(file_path, (err) => {
            if (err) console.error(`Error deleting file: ${err.message}`);
        });

        res.status(200).send(extracted_resume);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
