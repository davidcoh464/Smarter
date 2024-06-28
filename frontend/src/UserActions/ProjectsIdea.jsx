import React from 'react';

export default function Ideas() {
    return (
        <div>
            <section>
                <h1>Project Ideas</h1>
                <p>Here you can find various project ideas and inspirations.</p>
                <div className="card">
                    <img src="src/UserActions/projIdea.png" alt="Icon 1" className="icon"/>
                    <h2>Idea 1</h2>
                    <p>Description of the idea.</p>
                </div>
                <div className="card">
                    <img src="src/UserActions/projIdea.png" alt="Icon 2" className="icon"/>
                    <h2>Idea 2</h2>
                    <p>Description of the idea.</p>
                </div>
                <div className="card">
                    <img src="src/UserActions/projIdea.png" alt="Icon 3" className="icon"/>
                    <h2>Idea 3</h2>
                    <p>Description of the idea.</p>
                </div>
            </section>
        </div>
    );
}