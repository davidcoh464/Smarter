const openai = require("./open_ai_instance");
const { parse_to_json_find } = require("./json_parser");

const answer_format = `The extracted text should be in the following JSON format:
"""
{
    "personal_information": {
        "full_name": "",
        "phone_number": "",
        "address": "",
        "email": "",
        "linkedin": "",
        "github": ""
    },
    "technical_skills": {
        "languages": [e.g., Python, Java, C++],
        "frameworks_and_technologies": [e.g., WPF, Pandas, Numpy, Opencv, TensorFlow, Git, Docker, AWS],
        "languages_rank": [{ "language": "<The programming language>", "rank": "<The estimated level of knowledge that the user seems to know, rated between 1-10>" }]
    },
    "resume": {
        "resume_summary": "<Summary of the entire resume that is relevant to a software development position>"
    }
}
"""
Do not include any additional explanations, only provide the extracted text in JSON format.
`;

function is_url_valid(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

async function extract_resume_information(resume_text) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful tool for extracting information from resumes." },
                { role: "user", content: `Extract the following information from the resume:\n${resume_text}\n${answer_format}` }
            ],
            model: "gpt-4o"
        });

        let resume_info = parse_to_json_find(completion.choices[0].message.content);

        if (resume_info?.personal_information?.linkedin && !is_url_valid(resume_info.personal_information.linkedin)) {
            resume_info.personal_information.linkedin = "";
        }
        if (resume_info?.personal_information?.github && !is_url_valid(resume_info.personal_information.github)) {
            resume_info.personal_information.github = "";
        }

        Object.keys(resume_info.personal_information).forEach((key) => {
            if (!resume_info.personal_information[key]) {
                delete resume_info.personal_information[key];
            }
        });

        Object.keys(resume_info.technical_skills).forEach((key) => {
            if (!resume_info.technical_skills[key]) {
                delete resume_info.technical_skills[key];
            }
        });

        return resume_info;

    } catch (error) {
        console.error("Error extracting resume information:", error);
        return {
            "personal_information": {},
            "technical_skills": {},
            "resume": {}
        };
    }
}

module.exports = {
    extract_resume_information
};
