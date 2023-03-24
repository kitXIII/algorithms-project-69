import _ from 'lodash';

const getTermsFrequencies = (terms) => _.chain(terms)
  .countBy()
  .mapValues(((count) => count / terms.length))
  .value();

const cache = {};
const getCachedTermsFrequencies = ({ id, terms }) => {
  if (!cache[id]) {
    cache[id] = getTermsFrequencies(terms);
  }

  return cache[id];
};

export default getCachedTermsFrequencies;
