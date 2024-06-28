const express = require("express");
const router = express.Router();
const resume_service = require("../Service/extract_resume_service");
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(_, _, cd){
        const dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cd(null, dir)
    },
    filename: function (_, file, cb) {
        const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePreffix + "_" + file.originalname)
    }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        const file_path = req.file.path;
        const extracted_resume = await resume_service.extract_resume_info(file_path);
        res.status(201).send(extracted_resume);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
