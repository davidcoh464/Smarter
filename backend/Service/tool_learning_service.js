const tool_learning = require("../Api/tool_learning");
const user_service = require("./user_service");

async function get_tools(user_id, job_title) {
    const user = await user_service.getById(user_id);
    if (!user) {
        throw new Error(`User with id ${user_id} does not exist.`);
    }

    const history = JSON.stringify({
        resume_summary: user?.resume?.resume_summary || "",
        technical_skills: user?.technical_skills || {}
    });

    try {
        return await tool_learning.get_tools(job_title, history);
    } catch (err) {
        throw new Error(`An error occurred while fetching learning tools: ${err.message}`);
    }
}

module.exports = { get_tools };
