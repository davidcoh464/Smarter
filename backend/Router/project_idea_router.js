const express = require("express");
const router = express.Router();
const project_service = require("../Service/project_idea_service");

router.post('/:id', async (req, res) => {
    const userId = req.params.id;
    const { languages, number_of_ideas } = req.body;

    try {
        const projectIdeas = await project_service.get_project_idea(userId, languages, number_of_ideas);
        res.status(200).send(projectIdeas);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
