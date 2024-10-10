import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import Ideas from "./UserActions/ProjectsIdea";
import StartQuiz from "./UserActions/ProgramQuiz"
import Account from "./UserActions/Account";
import JobChecker from "./UserActions/JobChecker";
import CVImprovement from "./UserActions/CVImprovement";
import ToolsLearning from "./UserActions/ToolsLearning";
import "./navbar.css";

export default function Navbar() {
    return (
        <div className="navbar-head">
            <header>
                <nav>
                    <Link to="/ideas">Ideas</Link>
                    <Link to="/test">Test</Link>
                    <Link to="/jobChecker">Jobs</Link>
                    <Link to="/toolsLearning">Study</Link>
                    <Link to="/account">Me</Link>
                </nav>
            </header>
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ideas" element={<Ideas />} />
                    <Route path="/test" element={<StartQuiz />} />
                    <Route path="/jobChecker" element={<JobChecker />} />
                    <Route path="/toolsLearning" element={<ToolsLearning />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/CVImprovement" element={<CVImprovement />} />
                </Routes>
            </div>
        </div>
    );
}

function Home() {
    return (<></>);
}
