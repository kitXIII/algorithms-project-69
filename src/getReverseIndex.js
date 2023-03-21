import _ from 'lodash';

import stringToTerms from './stringToTerms.js';

const getReverseIndex = (docs) => docs.reduce((acc, doc) => {
  const termsRelevance = _.countBy(stringToTerms(doc.text));

  const partialAcc = Object.keys(termsRelevance)
    .reduce((oneDocAcc, term) => ({
      ...oneDocAcc,
      [term]: [...(acc[term] || []), { id: doc.id, relevance: termsRelevance[term] }],
    }), {});

  return {
    ...acc,
    ...partialAcc,
  };
}, {});

export default getReverseIndex;
