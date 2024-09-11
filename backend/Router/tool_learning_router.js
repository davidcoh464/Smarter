const express = require("express");
const router = express.Router();
const tool_learning = require("../Service/tool_learning_service");

router.post('/:id', async (req, res) => {
    try {
        const { job_title } = req.body;
        if (!job_title) {
            return res.status(400).send({ error: "Job title is required" });
        }

        const tools = await tool_learning.get_tools(req.params.id, job_title);
        res.status(200).send(tools);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
