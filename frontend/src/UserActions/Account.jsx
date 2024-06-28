import React from 'react';
import { Link } from 'react-router-dom';


export function CVUpload() {
    return (
        <div className="card">
            <h1>Upload Your CV</h1>
            <input type="file" accept=".pdf,.doc,.docx" />
            <button>Upload</button>
        </div>
    );
}

export function Form() {
    return (
        <div className="card">
            <h1>Personal Information Form</h1>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default function Account() {
    return (
        <div className="main-content">
            <h1>My Account</h1>
            <div className="card">
                <Link to="/cv-upload">
                    <button>Upload CV</button>
                </Link>
                <Link to="/form">
                    <button>Fill Personal Information Form</button>
                </Link>
            </div>
        </div>
    );
}