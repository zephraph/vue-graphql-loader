import { noAnonymousOperations } from './gql-validators';
import { strToDocNodes } from './gql-ast-helpers';

const anonQuery = strToDocNodes('{ hello }');
const namedQuery = strToDocNodes('query Test { hi }');

describe('noAnonymousOperations()', () => {
  it(`should reject if there's an anonymous query`, async () => {
    return expect(noAnonymousOperations(anonQuery)).rejects.toBeDefined();
  });

  it('should resolve with a named query', async () => {
    return expect(noAnonymousOperations(namedQuery)).resolves;
  });
});
