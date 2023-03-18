import _ from 'lodash';

const stringToTerms = (str) => _.uniq((str.match(/\w+/g) || []).map((t) => t.toLowerCase()));

export default stringToTerms;
