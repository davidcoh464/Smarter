const { get_openai_result } = require("./open_ai_result");

const answer_format = `Each question should have four options and should be in this format:
"""
[
  {
    question: "<my question>",
    options: { "a": "<option a>", "b": "<option b>", "c": "<option c>", "d": "<option d>" },
    correct_answer: "a-d"
  },
  ...
]
"""
Do not include any additional explanations, only provide the questionnaire in a JSON format.
`;


async function get_test(history, language, level) {
  system_content = "You are a helpful questionnaires creator."
  user_content = `Based on the following user history: ${history}\nProvide 10 multiple-choice questions about ${language}, for level ${level} out of 10. ${answer_format}`;

  try {
    return get_openai_result(system_content, user_content)
  } catch (error) {
    throw new Error("Error get test:", error);
  }
}


module.exports = {
  get_test
};
