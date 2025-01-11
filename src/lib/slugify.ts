// utils/slugify.js
export const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
  };
 
  
  export const unslugify = (slug: string) => {
    return slug
      .replace(/-/g, ' ') // Replace dashes with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
      .replace(/\bAnd\b/g, 'and'); // Replace "And" with "and"
  };