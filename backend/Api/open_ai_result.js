const openai = require("./open_ai_instance");
const { parse_to_json_find } = require("./json_parser");

async function get_openai_result(system_content, user_content) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: system_content },
                { role: "user", content: user_content }
            ],
            model: "gpt-4o"
        });

        if (!completion?.choices[0]?.message?.content) {
            throw new Error(`Received unexpected result from OpenAI server\nResult: ${JSON.stringify(completion)}`);
        }

        try {
            return parse_to_json_find(completion.choices[0].message.content);
        } catch (err) {
            throw new Error(`An error occurred while trying to convert the OpenAI message to object.\nOpenAI message:\n${completion.choices[0].message.content}`);
        }
    } catch (err) {
        if (err.message.includes('network') || err.code === 'ENOTFOUND') {
            throw new Error('Network error: Please check your internet connection and try again.');
        } else if (err.response && err.response.status === 402) {
            throw new Error('Payment error: Insufficient funds in the OpenAI account.');
        } else {
            throw new Error(`An unexpected error occurred: ${err.message}`);
        }
    }
}

module.exports = {
    get_openai_result
};
