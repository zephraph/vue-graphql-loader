import { noAnonymousQueries } from './query-validators';
import { strToDocNodes } from './__fixtures__/gql-helper';

const anonQuery = strToDocNodes('{ hello }');
const namedQuery = strToDocNodes('query Test { hi }');

describe('noAnonymousQueries()', () => {
  it(`should reject if there's an anonymous query`, async () => {
    return expect(noAnonymousQueries(anonQuery)).rejects.toBeDefined();
  });

  it('should resolve with a named query', async () => {
    return expect(noAnonymousQueries(namedQuery)).resolves;
  });
});
