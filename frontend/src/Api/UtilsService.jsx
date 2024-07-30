import axios from 'axios';

const BASE_URL = "http://localhost:8000";
const USER_URL = `${BASE_URL}/user`;
const USER_LOGIN_URL = `${USER_URL}/login`;
const RESUME_URL = `${BASE_URL}/resume`;
const AUTOFILL_RESUME_URL = `${RESUME_URL}/autofill`;
const READ_RESUME_URL = `${RESUME_URL}/read`;
const TEST_URL = `${BASE_URL}/test`;
const JOB_MATCH_URL = `${BASE_URL}/job_match`;
const PROJECT_URL = `${BASE_URL}/project`;

const handleResponse = (response) => response.data;

const handleError = (error) => {
    const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
    throw new Error(errorMessage);
};

const createUser = async (userData) => {
    try {
        const response = await axios.post(USER_URL, userData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const userLogin = async (email, password) => {
    try {
        const response = await axios.post(USER_LOGIN_URL, { email, password });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getAllUsers = async () => {
    try {
        const response = await axios.get(USER_URL);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${USER_URL}/${id}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const updateUserById = async (id, userData) => {
    try {
        const response = await axios.put(`${USER_URL}/${id}`, userData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const deleteUserById = async (id) => {
    try {
        const response = await axios.delete(`${USER_URL}/${id}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const autofillResume = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(AUTOFILL_RESUME_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const readResume = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(READ_RESUME_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getJobMatch = async (user_id, job_info) => {
    try {
        const response = await axios.post(`${JOB_MATCH_URL}/${user_id}`, { job_info });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getTest = async (user_id, language) => {
    try {
        const response = await axios.post(`${TEST_URL}/${user_id}`, { language });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const getProjectIdeas = async (user_id, languages, number_of_ideas) => {
    try {
        const response = await axios.post(`${PROJECT_URL}/${user_id}`, { languages, number_of_ideas });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export {
    createUser,
    userLogin,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    autofillResume,
    readResume,
    getJobMatch,
    getTest,
    getProjectIdeas
};
