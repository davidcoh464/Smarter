const { get_openai_result } = require("./open_ai_result");

const answer_format = `The result should be in this format:
"""
{
    "match_level": "<how well the user matches the role>", 
    "missing_requirement": "<missing Languages and frameworks>", 
    "suggestion": "<suggestion about what and how to study, to fit the requirements>"
}
"""
Do not include any additional explanations, only provide the result in a JSON format.
`;

async function get_job_matcher(history, job_info) {
    const system_content = "You are a helpful job matcher.";
    const user_content = `Based on the following user history:\n${history}\nDoes the following job fit this user:\n${job_info}\n${answer_format}`;
    try {
        return get_openai_result(system_content, user_content);
    } catch (error) {
        throw new Error("Error get job match:", error);
    }
}

module.exports = {
    get_job_matcher
};
