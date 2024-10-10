const express = require("express");
const router = express.Router();
const exam_service = require("../Service/level_exam_service");

router.post('/:id', async (req, res) => {
    try {
        const { language } = req.body;
        if (!language) {
            return res.status(400).send({ error: "Language is required" });
        }
        const test = await exam_service.create_customize_test(req.params.id, language);
        res.status(201).send(test);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
