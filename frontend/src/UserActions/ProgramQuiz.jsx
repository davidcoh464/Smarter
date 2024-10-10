import React, { useState } from 'react';
import "./ActionStyles/questionnaire.css";
import { getTest } from '../Api/UtilsService';

export default function StartQuiz() {
    const [language, setLanguage] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user_id = localStorage.getItem("user_id");
            const fetchedQuestions = await getTest(user_id, language);
            setQuestions(fetchedQuestions);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="quiz-container" style={{paddingTop: "20px"}}>
            {questions.length === 0 ?
                <form onSubmit={handleSubmit} className="quiz-form">
                    <div className="form-group">
                        <label htmlFor="language">Select Programming Language:</label>
                        <input
                            style={{width: "200px", padding: "10px, 20px"}}
                            type="text"
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            placeholder="Enter the programming language"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button" style={{width: "fit-content", padding: "8px, 30px"}}>Start Questionnaire</button>
                </form>
                : <Questionnaire language={language} questions={questions} />}
        </div>
    );
}

function Questionnaire({ language, questions }) {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    const handleChange = (questionIndex, option) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: option
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newScore = 0;

        questions.forEach((question, index) => {
            const userAnswer = answers[index];
            if (question.correct_answer.includes(userAnswer)) {
                newScore += 1;
            }
        });

        setScore(newScore);
    };

    return (
        <div className="questionnaire-container">
            <h1>{language} Questionnaire</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={index} className="question">
                        <p>{question.question}</p>
                        {Object.entries(question.options).map(([key, option]) => (
                            <label key={key} className="option">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={key}
                                    onChange={() => handleChange(index, key)}
                                    checked={answers[index] === key}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {score !== null && <p className="score">Your score is: {score}/{questions.length}</p>}
        </div>
    );
};
