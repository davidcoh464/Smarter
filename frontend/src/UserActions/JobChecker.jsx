import React, { useState } from 'react';
import "./ActionStyles/jobChecker.css";
import { getJobMatch } from '../Api/UtilsService';

export default function JobChecker() {
    const [jobInfo, setJobInfo] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const user_id = localStorage.getItem("user_id");
            const response = await getJobMatch(user_id, jobInfo);
            setJobInfo("");
            setResult(response);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="job-checker-container" style={{paddingTop: "20px"}}>
            {result ? (
                <div className="result-container">
                    <h1>Job Match Results</h1>
                    <p><strong>Match Level:</strong> {result.match_level}</p>
                    <p><strong>Missing Requirements:</strong> {result.missing_requirement}</p>
                    <p><strong>Suggestions:</strong> {result.suggestion}</p>
                    <button onClick={() => setResult(null)}>Check Another Job</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="job-form">
                    <div className="form-group">
                        <label htmlFor="jobInfo">Job Info:</label>
                        <textarea
                            id="jobInfo"
                            name="jobInfo"
                            value={jobInfo}
                            onChange={(e)=>setJobInfo(e.target.value)}
                            placeholder="Enter the job requirements"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button" style={{width: "fit-content", padding: "8px 20px"}}>Check Job Match</button>
                </form>
            )}
        </div>
    );
}
