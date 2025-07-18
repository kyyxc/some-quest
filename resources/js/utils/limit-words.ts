export const limitChars = (text: string, maxChars = 50) => {
    if (!text) return '';
    return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
};
