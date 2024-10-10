import React, { useState } from 'react';
import './Signup.css';
import { createUser, autofillResume, readResume } from '../Api/UtilsService';

function isUrlValid(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

const Signup = ({ setIsSignup, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    full_name: '', phone_number: '', address: '', linkedin: '', github: '', email: '', password: '',
    languages: '', frameworks_and_technologies: '', languages_rank: '', full_resume: '', resume_summary: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    setSubmissionError("");
    if (resumeFile) {
      try {
        const resumeData = await autofillResume(resumeFile);
        setFormData({
          ...formData,
          ...resumeData.resume,
          ...resumeData.personal_information,
          languages: resumeData.technical_skills.languages.join(', '),
          frameworks_and_technologies: resumeData.technical_skills.frameworks_and_technologies.join(', '),
          languages_rank: resumeData.technical_skills.languages_rank.map(lr => `${lr.language}:${lr.rank}`).join(', ')
        });
      } catch (err) {
        console.error("Error uploading resume:", err);
        setSubmissionError('Failed to upload resume. Please try again.');
      }
    } else {
      setSubmissionError("File field is empty.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');

    if (resumeFile && !formData.full_resume) {
      const full_resume = await readResume(resumeFile);
      setFormData({ ...formData, full_resume });
    }

    if (validate()) {
      if (formData.linkedin && !isUrlValid(formData.linkedin)) {
        console.warn(`LinkedIn URL is not valid: ${formData.linkedin}`);
        formData.linkedin = "";
      }
      if (formData.github && !isUrlValid(formData.github)) {
        console.warn(`GitHub URL is not valid: ${formData.github}`);
        formData.github = "";
      }

      const user_data = {
        personal_information: {
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          address: formData.address,
          linkedin: formData.linkedin,
          github: formData.github,
          email: formData.email,
          password: formData.password,
        },
        technical_skills: {
          languages: formData.languages.split(',').map(lang => lang.trim()),
          frameworks_and_technologies: formData.frameworks_and_technologies.split(',').map(ft => ft.trim()),
          languages_rank: formData.languages_rank.split(',').map(lr => {
            let [language, rank] = lr.split(':');
            return { language: language.trim(), rank: parseInt(rank.trim(), 10) };
          })
        },
        resume: {
          full_resume: formData.full_resume,
          resume_summary: formData.resume_summary
        }
      };

      try {
        const user = await createUser(user_data);
        localStorage.setItem("user_id", user._id);
        setIsSignup(false);
        setIsLoggedIn && setIsLoggedIn(true);
      } catch (err) {
        console.error("Error creating user:", err);
        setSubmissionError('An error occurred while creating the user. Please try again.');
      }
    } else {
      setSubmissionError("Some fields are missing.");
    }
  };

  return (
    <div className="signup-container">
      <h1 style={{ textAlign: "center" }}>Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <h3>Upload Resume</h3>
        <div className="form-group">
          <input type="file" onChange={handleFileChange} />
          <button type="button" onClick={handleFileUpload}>Upload and Fill Details</button>
        </div>
        <h3>Personal Information</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>GitHub</label>
          <input type="text" name="github" value={formData.github} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            // pattern="^w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$"
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}"
            title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)"
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <br />
        <h3>Technical Skills</h3>
        <div className="form-group">
          <label>Languages</label>
          <input type="text" name="languages" value={formData.languages} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Frameworks and Technologies</label>
          <input type="text" name="frameworks_and_technologies" value={formData.frameworks_and_technologies} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Languages Rank (format: language:rank, e.g., JavaScript:7, Python:4)</label>
          <input type="text" name="languages_rank" value={formData.languages_rank} onChange={handleChange} />
        </div>
        <div className="center">
          <button type="submit">Submit</button>
          {submissionError && <div className="error">{submissionError}</div>}
        </div>
      </form>
    </div>
  );
};

export default Signup;
