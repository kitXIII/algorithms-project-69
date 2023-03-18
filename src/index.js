import _ from 'lodash';

import stringToTerms from './stringToTerms.js';

const search = (docs, sample) => {
  const term = stringToTerms(sample)[0];

  if (_.isEmpty(term)) {
    return [];
  }

  return docs.reduce((acc, doc) => {
    const words = stringToTerms(doc.text);

    if (words.some((w) => w === term)) {
      return [...acc, doc.id];
    }

    return acc;
  }, []);
};

export default search;
