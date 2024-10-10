const job_match = require("../Api/job_match");
const user_service = require("./user_service");

async function get_job_matcher(user_id, job_info) {
    const user = await user_service.getById(user_id);
    if (!user) {
        throw new Error(`User id ${user_id} does not exist`);
    }

    const history = JSON.stringify({
        resume_summary: user.resume.resume_summary,
        technical_skills: user.technical_skills
    });

    return await job_match.get_job_matcher(history, job_info);
}

module.exports = { get_job_matcher };
