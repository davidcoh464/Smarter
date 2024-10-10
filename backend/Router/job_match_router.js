const express = require("express");
const router = express.Router();
const job_match_service = require("../Service/job_match_service");

// Route to get job matcher
router.post('/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const { job_info } = req.body;

        const match_result = await job_match_service.get_job_matcher(user_id, job_info);
        res.status(200).send(match_result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
