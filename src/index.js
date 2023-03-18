import _ from 'lodash';

import stringToTerms from './stringToTerms.js';

const search = (docs, sample) => {
  const sampleTerm = stringToTerms(sample)[0];

  if (_.isEmpty(sampleTerm)) {
    return [];
  }

  let maxRelevance = 0;

  return docs.reduce((acc, doc) => {
    const terms = stringToTerms(doc.text);
    const relevance = _.sumBy(terms, (t) => t === sampleTerm);

    if (!relevance) {
      return acc;
    }

    if (relevance > maxRelevance) {
      maxRelevance = relevance;

      return [doc.id, ...acc];
    }

    return [...acc, doc.id];
  }, []);
};

export default search;
