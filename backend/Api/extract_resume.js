const openai = require("./open_ai_instance");
const { parse_to_json_find } = require("./json_parser");

const answer_format = `The extracted text should be in the following JSON format:
"""
{
    "personal_information": {
        "name": "",
        "phone_number": "",
        "linkedin": "",
        "github": "",
        "email": "",
        "address": ""
    },
    "technical_skills": {
        "languages": "<e.g., Python, Java, JavaScript, C++>",
        "frameworks_and_technologies": "<e.g., WPF, Pandas, Numpy, Spring Boot, TensorFlow, Git, Docker, AWS>"
        "languages_rank": [{ language: <The programming language>, rank: <The estimated level of knowledge that the user seems to know, rated between 1-10> }]
    },
    "resume": {
        "resume_summary": "<Summary of the entire resume>"
    }
}
"""
Do not include any additional explanations, only provide the extracted text in JSON format.
`;

async function extract_resume_information(resume_text) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful tool for extracting information from resumes." },
            { role: "user", content: `Extract the following information from the resume:\n${resume_text}\n${answer_format}` }
        ],
        model: "gpt-4o"
    });
    // console.log(completion.choices[0].message.content);
    return parse_to_json_find(completion.choices[0].message.content);
}

module.exports = {
    extract_resume_information
};
