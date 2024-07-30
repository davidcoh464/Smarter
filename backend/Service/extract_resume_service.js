const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { extract_resume_information } = require("../Api/extract_resume");

/**
 * Extracts text from a PDF file.
 * @param {string} file_path - The path to the PDF file.
 * @returns {Promise<string>} - The extracted text.
 * @throws Will throw an error if extraction fails.
 */
async function extract_pdf(file_path) {
    try {
        const dataBuffer = fs.readFileSync(file_path);
        const data = await pdfParse(dataBuffer);
        return data.text;
    } catch (error) {
        console.error(`Error extracting PDF: ${error.message}`);
        throw new Error('Failed to extract text from PDF.');
    }
}

/**
 * Extracts text from a DOCX file.
 * @param {string} file_path - The path to the DOCX file.
 * @returns {Promise<string>} - The extracted text.
 * @throws Will throw an error if extraction fails.
 */
async function extract_docx(file_path) {
    try {
        const dataBuffer = fs.readFileSync(file_path);
        const result = await mammoth.extractRawText({ buffer: dataBuffer });
        return result.value;
    } catch (error) {
        console.error(`Error extracting DOCX: ${error.message}`);
        throw new Error('Failed to extract text from DOCX.');
    }
}

/**
 * Reads and extracts text from a resume file (PDF or DOCX).
 * @param {string} file_path - The path to the resume file.
 * @returns {Promise<string>} - The extracted text.
 * @throws Will throw an error if the file format is unsupported.
 */
async function read_resume(file_path) {
    if (!fs.existsSync(file_path)) {
        throw new Error(`File not found: ${file_path}`);
    }

    const ext = path.extname(file_path).toLowerCase();
    let full_resume = "";
    if (ext === ".pdf") {
        full_resume = await extract_pdf(file_path);
    } else if (ext === ".docx") {
        full_resume = await extract_docx(file_path);
    } else {
        throw new Error(`Unsupported file format: ${ext}`);
    }
    return full_resume;
}

/**
 * Extracts detailed information from a resume file.
 * @param {string} file_path - The path to the resume file.
 * @returns {Promise<Object>} - The extracted resume information.
 * @throws Will throw an error if reading or extraction fails.
 */
async function extract_resume_info(file_path) {
    const full_resume = await read_resume(file_path);
    const extracted_info = await extract_resume_information(full_resume);
    extracted_info["resume"] = { ...extracted_info["resume"], full_resume };
    return extracted_info;
}

module.exports = { extract_resume_info, read_resume };
