import _ from 'lodash';

import stringToTerms from './stringToTerms.js';

const getReverseIndex = (docs) => docs.reduce((acc, doc) => {
  const terms = stringToTerms(doc.text);
  const termsRelevance = _.countBy(terms);

  const uniqTerms = Object.keys(termsRelevance);

  const partialAcc = uniqTerms
    .reduce((oneDocAcc, term) => ({
      ...oneDocAcc,
      [term]: [
        ...(acc[term] || []), { id: doc.id, frequency: termsRelevance[term] / terms.length },
      ],
    }), {});

  return {
    ...acc,
    ...partialAcc,
  };
}, {});

export default getReverseIndex;
