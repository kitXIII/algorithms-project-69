import _ from 'lodash';
import stringToTerms from './stringToTerms.js';
import getReverseIndex from './getReverseIndex.js';

const search = (documents, sample) => {
  const sampleTerms = _.uniq(stringToTerms(sample));

  if (!sampleTerms.length) {
    return [];
  }

  const index = getReverseIndex(documents);

  const results = sampleTerms
    .map((term) => {
      const docs = index[term];

      if (_.isEmpty(docs)) {
        return null;
      }

      const idf = Math.log(documents.length / docs.length);

      return docs.map((d) => ({ ...d, tfIdf: d.frequency * idf }));
    })
    .filter((v) => v)
    .flat()
    .reduce((acc, item) => {
      const tfIdf = (acc[item] || 0) + item.tfIdf;
      return {
        ...acc,
        [item.id]: tfIdf,
      };
    }, {});

  return Object.entries(results)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
};

export default search;
