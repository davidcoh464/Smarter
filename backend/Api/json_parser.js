function parse_to_json_replace(text) {
    let cleanedJsonString = text.replace('```json', '').replace('```', '').trim();
    cleanedJsonString = cleanedJsonString.replace('"""json', '').replace('"""', '').trim();
    return JSON.parse(cleanedJsonString);
}

function parse_to_json_re(text) {
    const regex1 = /```\s*json\s*([\s\S]*?)\s*```/;
    const regex2 = /"""\s*json\s*([\s\S]*?)\s*"""/;
    const match1 = text.trim().match(regex1);
    if (match1 && match1[1]) {
        const cleanedJsonString = match1[1].trim();
        return JSON.parse(cleanedJsonString);
    } else {
        const match2 = text.trim().match(regex2);
        if (match2 && match2[1]) {
            const cleanedJsonString = match2[1].trim();
            return JSON.parse(cleanedJsonString);
        }
        console.log("No match");
        return "";
    }
}

function parse_to_json_find(text) {
    let split_text = text.trim().split("");
    const first_index = split_text.findIndex((c) => c === '[' || c === '{');
    if (first_index === -1) {
        throw new Error("No JSON object found");
    }
    
    const last_char = split_text[first_index] === "[" ? "]" : "}";
    const last_index = split_text.length - split_text.reverse().findIndex((c) => c === last_char) - 1;
    const cleaned_json_string = split_text.reverse().slice(first_index, last_index + 1).join("");
    return JSON.parse(cleaned_json_string);
}

module.exports = { parse_to_json_replace, parse_to_json_re, parse_to_json_find };
