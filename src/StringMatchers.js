// @flow

/**
 * Check if search is a substring of test
 * @param test - string to match against
 * @param search - string to match with
 * @constructor
 */

export const WordBeginningSubstring = (test: string, search: string): bool => {
  const searchWords = search.split(' ');
  const testWords = test.split(' ');
  return searchWords.every(searchWord =>
    testWords.some(testWord => testWord.indexOf(searchWord) === 0)
  );
};

export const ObjectWordBeginningSubstring = (test: object, search: string): bool => {
  const valuesAsStrings = Object.values(test)
    .filter(t => ['number', 'string'].includes(typeof t))
    .map(t => t.toString())
    .map(t => t.toLowerCase());
  return valuesAsStrings.some(v => WordBeginningSubstring(v, search));
};
