const search = (docs, sample) => docs.reduce((acc, doc) => {
  const words = doc.text.split(' ');

  if (words.some((w) => w === sample)) {
    return [...acc, doc.id];
  }

  return acc;
}, []);

export default search;
