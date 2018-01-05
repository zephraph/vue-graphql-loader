import { readQuery } from './__fixtures__/gql-helper';
import { noAnonymousQueries } from './query-validators';

describe('noAnonymousQueries()', () => {
  it(`should reject if there's an anonymous query`, async () => {
    const anonQuery = await readQuery('anon-query');
    return expect(noAnonymousQueries(anonQuery)).rejects.toBeDefined();
  });

  it('should resolve with a normal query', async () => {
    const query = await readQuery('query');
    return expect(noAnonymousQueries(query)).resolves;
  });
});
