const openai = require("./open_ai_instance");
const { parse_to_json_find } = require("./json_parser");

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
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful job matcher." },
            { role: "user", content: `Based on the following user history:\n${history}\nDoes the following job fit this user:\n${job_info}\n${answer_format}` }
        ],
        model: "gpt-4o"
    });
    console.log(completion.choices[0].message.content);
    return parse_to_json_find(completion.choices[0].message.content);
}

module.exports = {
    get_job_matcher
};
