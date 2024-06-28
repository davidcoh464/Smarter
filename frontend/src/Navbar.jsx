import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import Ideas from "./UserActions/ProjectsIdea";
import Account, { CVUpload, Form } from "./UserActions/Account";
import JobChecker from "./UserActions/JobChecker";
import CVImprovement from "./UserActions/CVImprovement";
import ToolsLearning from "./UserActions/ToolsLearning";
import "./navbar.css"

export default function Navbar() {
    return (
        <div className="navbar-head">
            <header>
                <nav>
                    <Link to="/ideas">Ideas</Link>
                    <Link to="/jobChecker">Jobs</Link>
                    <Link to="/toolsLearning">study</Link>
                    <Link to="/account">Me</Link>
                </nav>
            </header>
            <div className="main-content">
                <Routes>
                    <Route path="/ideas" element={<Ideas />} />
                    <Route path="/jobChecker" element={<JobChecker />} />
                    <Route path="/CVImprovement" element={<CVImprovement />} />
                    <Route path="/toolsLearning" element={<ToolsLearning />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/cv-upload" element={<CVUpload />} />
                    <Route path="/form" element={<Form />} />
                </Routes>
            </div>
        </div>
    );
}