import _ from 'lodash';

import stringToTerms from './stringToTerms.js';

const getReverseIndex = (docs) => docs.reduce((acc, doc) => {
  const terms = stringToTerms(doc.text);

  const partialAcc = _.uniq(terms)
    .reduce((localAcc, term) => ({
      ...localAcc,
      [term]: [
        ...(acc[term] || []), { id: doc.id, terms },
      ],
    }), {});

  return {
    ...acc,
    ...partialAcc,
  };
}, {});

export default getReverseIndex;
