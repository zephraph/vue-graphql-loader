import { noAnonymousOperations } from './gql-validators';
import { strToDocNodes as gql } from './gql-test-utils';

const anonQuery = gql('{ hello }');
const namedQuery = gql('query Test { hi }');

describe('noAnonymousOperations()', () => {
  it(`should reject if there's an anonymous query`, async () => {
    return expect(noAnonymousOperations(anonQuery)).rejects.toBeDefined();
  });

  it('should resolve with a named query', async () => {
    return expect(noAnonymousOperations(namedQuery)).resolves;
  });
});
