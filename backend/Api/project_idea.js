const openai = require("./open_ai_instance");
const { parse_to_json_find } = require("./json_parser");

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

async function get_project_idea(history, languages, numbers_of_ideas) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful project ideas creator." },
            { role: "user", content: `Based on the following user history: ${history}\nCreate ${numbers_of_ideas} ideas for projects using the following languages: ${languages} (in all projects). ${answer_format}` }
        ],
        model: "gpt-4o"
    });
    console.log(completion.choices[0].message.content);
    return parse_to_json_find(completion.choices[0].message.content);
}

module.exports = {
    get_project_idea
};
