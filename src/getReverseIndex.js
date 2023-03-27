import _ from 'lodash';

import roundByDecimal from './roundByDecimal.js';
import stringToTerms from './stringToTerms.js';

const getReverseIndex = (documents) => {
  const indexWithFrequencies = documents.reduce((acc, doc) => {
    const terms = stringToTerms(doc.text);

    const termsFrequencies = _.chain(terms)
      .countBy()
      .mapValues((count) => count / terms.length)
      .value();

    const partialAcc = Object.keys(termsFrequencies)
      .reduce((localAcc, term) => ({
        ...localAcc,
        [term]: [
          ...(acc[term] || []), { id: doc.id, frequency: termsFrequencies[term] },
        ],
      }), {});

    return {
      ...acc,
      ...partialAcc,
    };
  }, {});

  return _.mapValues(indexWithFrequencies, (docs) => {
    const idf = Math.log(documents.length / docs.length);

    return docs.map((doc) => ({ ...doc, criteria: roundByDecimal(idf * doc.frequency, 3) }));
  });
};

export default getReverseIndex;
