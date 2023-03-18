import _ from 'lodash';

const stringToTerms = (str) => (str.match(/\w+/g) || [])
  .map((t) => t.toLowerCase())
  .filter((t) => !_.isEmpty(t));

export default stringToTerms;
