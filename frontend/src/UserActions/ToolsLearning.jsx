import React, { useState } from 'react';
import { getToolLearning } from '../Api/UtilsService';

const StudyToolsPage = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [tools, setTools] = useState({ languages: [], technologies: [] });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setTools({ languages: [], technologies: [] });
        setLoading(true);

        const userId = localStorage.getItem("user_id");
        if (!userId) {
            setError("User ID is missing. Please make sure you are logged in.");
            setLoading(false);
            return;
        }

        if (!jobTitle.trim()) {
            setError("Job title is required.");
            setLoading(false);
            return;
        }

        try {
            const responseTools = await getToolLearning(userId, jobTitle);
            setTools(responseTools);
        } catch (err) {
            setError(err.message || err.response?.data?.error || "An error occurred while fetching the tools.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Find Learning Tools for Your Job Title</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Job Title:</label>
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Enter your job title"
                        style={{ padding: '5px', marginLeft: '10px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Tools'}
                </button>
            </form>

            {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}

            {(tools.languages.length > 0 || tools.technologies.length > 0) && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Recommended Learning Tools:</h2>
                    <div>
                        {tools.languages.length > 0 && (
                            <>
                                <h3>Languages:</h3>
                                <ul>
                                    {tools.languages.map((language, index) => (
                                        <li key={index}>
                                            <strong>Language:</strong> {language.language}<br />
                                            <strong>Tools:</strong> {language.tools}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {tools.technologies.length > 0 && (
                            <>
                                <h3>Technologies:</h3>
                                <ul>
                                    {tools.technologies.map((technology, index) => (
                                        <li key={index}>
                                            <strong>Technology:</strong> {technology.technology}<br />
                                            <strong>Tools:</strong> {technology.tools}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyToolsPage;
