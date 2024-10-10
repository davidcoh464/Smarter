const test_creator = require("../Api/create_test");
const user_service = require("./user_service");

async function create_customize_test(user_id, language) {
    const user = await user_service.getById(user_id);
    if (!user) {
        throw new Error(`User id ${user_id} does not exist`);
    }
    let rank = -1;
    user.technical_skills.languages_rank.forEach((l) => {
        if (l.language.toLowerCase() === language.toLowerCase()) {
            rank = l.rank;
        }
    });
    if (rank === -1) {
        throw new Error(`Language ${language} does not appear in user data`);
    }
    return await test_creator.get_test(user.resume.resume_summary, language, rank);
}

module.exports = { create_customize_test };
