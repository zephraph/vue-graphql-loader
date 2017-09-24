import { readQuery } from './__fixtures__/gql-helper';
import { isSingleDefinition } from './gql-handlers';

describe('isSingleDefinition()', () => {
  it('should return false if more than one definition present', async () => {
    const multiQueries = await readQuery('multiple-queries');
    expect(isSingleDefinition(multiQueries)).toBe(false);
  });
});
