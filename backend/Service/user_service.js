const User = require("../Model/users_model");

async function getAll() {
    return User.find({});
}

async function getById(id) {
    const user = await User.findById(id);
    return user;
}

async function getByEmail(email) {
    const user = await User.findOne({ "personal_information.email": email });
    return user;
}

async function update(id, updates) {
    const user = await User.findById(id);
    if (!user) {
        return null;
    }

    // Check if email is updated and if the email is unique
    if (updates.personal_information && updates.personal_information.email) {
        const existingUser = await getByEmail(updates.personal_information.email);
        if (existingUser && existingUser._id.toString() !== id) {
            throw new Error("Email already in use by another user.");
        }
    }

    Object.keys(updates).forEach((update) => {
        if (user[update]) {
            if (typeof updates[update] === 'object' && updates[update] !== null && !Array.isArray(updates[update])) {
                Object.keys(updates[update]).forEach((key) => {
                    const value = updates[update][key];
                    if (value === "" || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
                        delete updates[update][key];
                    }
                });
                user[update] = { ...user[update].toObject(), ...updates[update] };
            } else {
                const value = updates[update];
                if (!(value === "" || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0))) {
                    user[update] = updates[update];
                }
            }
        } else {
            if(["resume", "technical_skills", "recommendations"].includes(update))
                user[update] = updates[update];
            else{

            }
        }
    });
    await user.save();
    return user;
}


async function create(new_user) {
    if(!new_user || !new_user.personal_information || !new_user.personal_information.email){
        throw new Error("Email field is required.");
    }
    if(!new_user.personal_information.password){
        throw new Error("Password field is required.");
    }
    
    const existingUser = await getByEmail(new_user.personal_information.email);
    if (existingUser) {
        throw new Error("Email already in use.");
    }

    const user = new User(new_user);
    await user.save();
    return user;
}

async function delete_object(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
}

module.exports = { create, delete_object, getAll, getById, getByEmail, update };
