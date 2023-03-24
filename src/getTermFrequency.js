const getTermFrequency = (terms, term) => {
  const count = terms.reduce((acc, t) => (t === term ? acc + 1 : acc), 0);
  return terms.length ? count / terms.length : 0;
};

export default getTermFrequency;
