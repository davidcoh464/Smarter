const { get_openai_result } = require("./open_ai_result");

const answer_format = `The ideas should be in this format:
"""
[
    {
        "languages": "<Software languages, libraries, and hardware needed for the project>",
        "project_idea": "<Content of idea 1>"
    },
    {
        "languages": "<Software languages, libraries, and hardware needed for the project>",
        "project_idea": "<Content of idea 2>"
    },
    ...
]
"""
Do not include any additional explanations, only provide the ideas in a JSON format.
`;

async function get_project_idea(history, languages, number_of_ideas) {
    const system_content = "You are a helpful project ideas creator.";
    const user_content = `Based on the following user history: ${history}\nCreate ${number_of_ideas} ideas for projects using the following languages: ${languages} (in all projects). ${answer_format}`;
    try{
        return get_openai_result(system_content, user_content);
    }catch (error) {
        throw new Error("Error get project idea:", error);
    }
}

module.exports = {
    get_project_idea
};
