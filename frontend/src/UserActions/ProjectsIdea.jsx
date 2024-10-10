import React, { useState } from 'react';
import logo from "./ActionStyles/projIdea.png";
import { getProjectIdeas } from '../Api/UtilsService';
import './ActionStyles/Ideas.css';

export default function Ideas() {
    const [languages, setLanguages] = useState('');
    const [numberOfIdeas, setNumberOfIdeas] = useState(1);
    const [ideas, setIdeas] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const languages_list = languages.split(",").map((x) => x.trim());
        if (!languages_list || languages.length === 0) {
            console.error(`languages field is required and must be a non-empty array`);
            return
        }
        try {
            const user_id = localStorage.getItem("user_id");
            const numOfIdeas = Math.max(1, Math.min(numberOfIdeas, 5));
            console.log(user_id, numberOfIdeas, languages_list);
            const fetchedIdeas = await getProjectIdeas(user_id, languages_list, numOfIdeas);
            console.log(fetchedIdeas);
            setIdeas(fetchedIdeas);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="ideas-container">
            {ideas.length > 0 ? (
                <ShowIdeas ideas={ideas} />
            ) : (
                <div className="form-container">
                    <h1>Get Project Ideas</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="languages">Select Program Languages:</label>
                            <input
                                style={{width: "fit-content", padding: "8px 20px"}}
                                type="text"
                                id="languages"
                                value={languages}
                                onChange={(e) => setLanguages(e.target.value)}
                                placeholder="Enter languages separated by commas"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberOfIdeas">Number of Ideas:</label>
                            <input
                                style={{width: "fit-content"}}
                                type="number"
                                id="numberOfIdeas"
                                value={numberOfIdeas}
                                min="1"
                                max="5"
                                onChange={(e) => setNumberOfIdeas(e.target.value)}
                            />
                        </div>
                        <button style={{width: "fit-content", padding: "8px 30px"}} type="submit" className="submit-button">Get Ideas</button>
                    </form>
                </div>
            )}
        </div>
    );
}

function ShowIdeas({ ideas = [] }) {
    return (
        <section className="ideas-list">
            <h1>Project Ideas</h1>
            {ideas.map((idea, i) => (
                <div className="card" key={i}>
                    <img src={logo} alt={`icon ${i + 1}`} className="icon" />
                    <h2>Idea {i + 1}</h2>
                    <p className="languages">Languages and libraries: {idea?.languages}</p>
                    <p>{idea?.project_idea}</p>
                </div>
            ))}
        </section>
    );
}
