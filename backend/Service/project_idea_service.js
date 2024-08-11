const project_idea = require("../Api/project_idea");
const user_service = require("./user_service");

async function get_project_idea(user_id, languages, number_of_ideas) {
    const user = await user_service.getById(user_id);
    if (!user) {
        throw new Error(`User id ${user_id} does not exist`);
    }

    if (!languages || !Array.isArray(languages) || languages.length === 0) {
        throw new Error(`languages field is required and must be a non-empty array`);
    }

    number_of_ideas = number_of_ideas || 1;

    const history = JSON.stringify({
        resume_summary: user?.resume?.resume_summary,
        technical_skills: user?.technical_skills
    });

    try {
        const p_ideas = await project_idea.get_project_idea(history, languages, number_of_ideas);
        
        if (!Array.isArray(p_ideas)) {
            throw new Error(`Expected an array of project ideas, but received: ${typeof p_ideas}\nProject idea: ${p_ideas}`);
        }

        user.recommendations.projects.push(...p_ideas);
        await user.save();
        return p_ideas;
    } catch (err) {
        throw new Error(`An error occurred while fetching project ideas: ${err.message}`);
    }
}

module.exports = { get_project_idea };
