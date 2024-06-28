const mongoose = require('mongoose');

// Schema for personal information
const personalInformationSchema = new mongoose.Schema({
    full_name: String,
    phone_number: String,
    address: String,
    linkedin: String,
    github: String,
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { _id: false });

// Schema for technical skills
const technicalSkillsSchema = new mongoose.Schema({
    languages: { type: [String], default: [] },
    frameworks_and_technologies: { type: [String], default: [] },
    languages_rank: [{ language: String, rank: Number }]
}, { _id: false });

// Schema for projects within recommendations
const projectSchema = new mongoose.Schema({
    project_idea: String,
    languages: { type: [String], default: [] }
}, { _id: false });

// Schema for recommendations
const recommendationsSchema = new mongoose.Schema({
    languages: { type: [String], default: [] },
    frameworks: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    projects: { type: [projectSchema], default: [] }
}, { _id: false });

// Schema for resume
const resumeSchema = new mongoose.Schema({
    full_resume: String,
    resume_summary: String
}, { _id: false });

// Main user schema
const userSchema = new mongoose.Schema({
    personal_information: personalInformationSchema,
    resume: resumeSchema,
    technical_skills: technicalSkillsSchema,
    recommendations: recommendationsSchema
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
