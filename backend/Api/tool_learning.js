const { get_openai_result } = require("./open_ai_result");

const answer_format = `The result should follow this exact JSON format:
"""
{
    "languages": [
        {
            "language": "<e.g., Python, Java, C++>",
            "tools": "<The most effective and efficient methods to learn this language quickly>"
        },
        ...
    ],
    "technologies": [
        {
            "technology": "<e.g., WPF, Pandas, Numpy, OpenCV, TensorFlow, Git, Docker, AWS>",
            "tools": "<The most effective and efficient methods to learn this technology quickly>"
        },
        ...
    ]
}
"""
Please provide only the result in this JSON format without any additional explanations.
`;

async function get_tools(job_title, history) {
    const system_content = "You are a helpful assistant that provides targeted learning tools.";
    const user_content = `Based on the following user history: ${history}, analyze the skills and gaps, and for the specified job title: ${job_title}, recommend programming languages and technologies the user may need to learn to qualify for the role. Ensure to include the most efficient learning resources or strategies for each language and technology. ${answer_format}`;
    
    try {
        return await get_openai_result(system_content, user_content);
    } catch (error) {
        throw new Error("Error fetching learning tools from OpenAI API:", error);
    }
}

module.exports = {
    get_tools
};
