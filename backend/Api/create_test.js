const openai = require("./open_ai_instance")
const { parse_to_json_find } = require("./json_parser")

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
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful questionnaires creator." },
      { role: "user", content: `Based on the following user history: ${history}\nProvide 10 multiple-choice questions about ${language}, for level ${level} out of 5. ${answer_format}` }
    ],
    model: "gpt-4o"
  });
  console.log(completion.choices[0].message.content)
  return parse_to_json_find(completion.choices[0].message.content);
}


module.exports = {
  get_test
};
