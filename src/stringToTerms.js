const stringToTerms = (str) => (str.match(/\w+/g) || []).map((t) => t.toLowerCase());

export default stringToTerms;
