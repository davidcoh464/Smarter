const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { extract_resume_information } = require("../Api/extract_resume");

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

async function extract_resume_info(file_path) {
    const ext = path.extname(file_path).toLowerCase();

    let full_resume = "";

    if (ext === ".pdf") {
        full_resume = await extract_pdf(file_path);
    } else if (ext === ".docx") {
        full_resume = await extract_docx(file_path);
    } else {
        throw new Error(`The system doesn't support reading from .${ext} file`);
    }

    const extracted_info = await extract_resume_information(full_resume);
    extracted_info["resume"] = { ...extracted_info["resume"], full_resume };
    return extracted_info
}

module.exports = { extract_resume_info };
