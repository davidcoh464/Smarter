const { get_openai_result } = require("./open_ai_result");

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


async function extract_resume_information(resume_text) {
    try {
        const system_content = "You are a helpful tool for extracting information from resumes.";
        const user_content = `Extract the following information from the resume:\n${resume_text}\n${answer_format}`;

        let resume_info = await get_openai_result(system_content, user_content);

        const is_url_valid = (string) => {
            try {
                new URL(string);
                return true;
            } catch {
                return false;
            }
        }

        if (resume_info?.personal_information?.linkedin && !is_url_valid(resume_info.personal_information.linkedin)) {
            resume_info.personal_information.linkedin = "";
        }
        if (resume_info?.personal_information?.github && !is_url_valid(resume_info.personal_information.github)) {
            resume_info.personal_information.github = "";
        }

        // Clean up empty keys in personal_information
        for (const key in resume_info.personal_information) {
            if (!resume_info.personal_information[key]) {
                delete resume_info.personal_information[key];
            }
        }

        // Clean up empty keys in technical_skills
        for (const key in resume_info.technical_skills) {
            if (!resume_info.technical_skills[key]) {
                delete resume_info.technical_skills[key];
            }
        }

        return resume_info;

    } catch (error) {
        throw new Error("Error extracting resume information:", error);
    }
}

module.exports = {
    extract_resume_information
};
