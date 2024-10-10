import React, { useEffect, useState } from 'react';
import { getUserById, updateUserById } from "../Api/UtilsService"
import './ActionStyles/account.css';

export default function Account() {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        getUserById(localStorage.getItem("user_id")).then(res => {
            setFormData({
                ...res, "technical_skills.languages": res.technical_skills.languages.join(", "),
                "technical_skills.frameworks_and_technologies": res.technical_skills.frameworks_and_technologies.join(", ")
            });
        }).catch((error) => {
            console.error('Error fetching user data:', error);
        })
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');
        if (nameParts.length > 1) {
            const [parent, child] = nameParts;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [parent]: {
                    ...prevFormData[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = {
                ...formData,
                "technical_skills.languages": formData["technical_skills.languages"].split(",").map((s) => s.trim()),
                "technical_skills.frameworks_and_technologies": formData["technical_skills.frameworks_and_technologies"].split(",").map((s) => s.trim()),
            };
            await updateUserById(localStorage.getItem("user_id"), user);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <form onSubmit={handleSubmit} className="job-form">
                <div className="form-group">
                    <div className='personal-information-account'>
                        <h1>Personal Information</h1>
                        <label htmlFor='full_name'>Full Name:</label>
                        <input type="text" id='full_name' style={{ width: "fit-content", padding: "10px 20px" }} name="personal_information.full_name"
                            defaultValue={formData?.personal_information?.full_name} onChange={handleChange} />

                        <label htmlFor='phone_number'>Phone Number:</label>
                        <input type="text" id='phone_number' style={{ width: "fit-content", padding: "10px 20px" }} name="personal_information.phone_number"
                            defaultValue={formData?.personal_information?.phone_number} onChange={handleChange} />

                        <label htmlFor='address'>Address:</label>
                        <input type="text" id='address' style={{ width: "fit-content", padding: "10px 20px" }} name="personal_information.address"
                            defaultValue={formData?.personal_information?.address} onChange={handleChange} />

                        <label htmlFor='linkedin'>LinkedIn:</label>
                        <input type="text" id='linkedin' style={{ width: "fit-content", padding: "10px 20px" }} name="personal_information.linkedin"
                            defaultValue={formData?.personal_information?.linkedin} onChange={handleChange} />

                        <label htmlFor='github'>GitHub:</label>
                        <input type="text" id='github' style={{ width: "fit-content", padding: "10px 20px" }} name="personal_information.github"
                            defaultValue={formData?.personal_information?.github} onChange={handleChange} />

                        <label htmlFor='email'>Email:</label>
                        <input type="email" id='email' style={{ width: "fit-content", padding: "10px 20px" }} name="personal_information.email"
                            defaultValue={formData?.personal_information?.email} onChange={handleChange} />
                    </div>

                    <div className='technical-skill-account'>
                        <h1>Technical Skills</h1>
                        <label htmlFor='languages'>Languages:</label>
                        <input type="text" id='languages' name="technical_skills.languages"
                            defaultValue={formData?.technical_skills?.languages} onChange={handleChange} />

                        <label htmlFor='frameworks_and_technologies'>Frameworks And Technologies:</label>
                        <input type="text" id='frameworks_and_technologies' name="technical_skills.frameworks_and_technologies"
                            defaultValue={formData?.technical_skills?.frameworks_and_technologies} onChange={handleChange} />

                        <h2>Languages Rank</h2>
                        <ul>
                            {formData?.technical_skills?.languages_rank.map((item, index) => (
                                <li key={index} style={{ textAlign: "left" }}>
                                    {item.language}:
                                    <input type="number" style={{ width: "fit-content", margin: `10px ${20 - parseInt(1.5 * item.language.length)}px` }}
                                        defaultValue={item.rank} min={1} max={10} onChange={(e) => {
                                            let value = e.target.value || item.rank;
                                            value = Math.min(Math.max(1, value), 10);
                                            formData.technical_skills.languages_rank[index] = { language: item.language, rank: value};
                                        }} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {(formData.resume && formData.resume.length !== 0) ?
                        <div className='resume-account'>
                            <h1>Resume</h1>
                            <p><strong>Full Resume:</strong> {formData?.resume?.full_resume}</p>
                            <p><strong>Resume Summary:</strong> {formData?.resume?.resume_summary}</p>
                        </div> : null}

                    {(formData.recommendations && formData.recommendations.length !== 0) ?
                        <div className='recommendation-account'>
                            <h1>Recommendations</h1>
                            <p><strong>Languages:</strong> {formData.recommendations?.languages.join(', ')}</p>
                            <p><strong>Frameworks:</strong> {formData.recommendations?.frameworks.join(', ')}</p>
                            <p><strong>Technologies:</strong> {formData.recommendations?.technologies.join(', ')}</p>
                            <h2>Projects</h2>
                            <ul>
                                {formData.recommendations?.projects.map((project, index) => (
                                    <li key={index}>
                                        <p><strong>Project Idea:</strong> {project.project_idea}</p>
                                        <p><strong>Languages:</strong> {project.languages.join(', ')}</p>
                                    </li>
                                ))}
                            </ul>
                        </div> : null}
                </div>
                <button type="submit" className="submit-button" style={{ width: "fit-content", padding: "8px 40px" }}>Update User</button>
            </form>
        </div>
    );
}