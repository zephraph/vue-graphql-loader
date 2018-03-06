import { strToDocNodes } from '../__fixtures__/gql-helper';
import { buildApolloOptions } from './vueApollo';
import { ANONYMOUS_QUERY } from '../gql-ast-helpers';

const basicNamedQuery = strToDocNodes(`query Hello { world }`);
const basicAnonQuery = strToDocNodes(`{ hello }`);

describe('Vue Apollo Handler', () => {
  describe('buildApolloOptions', () => {
    it('should match a simple named query snapshot', () => {
      const query = buildApolloOptions(basicNamedQuery, {});
      expect(query).toMatchSnapshot();
      expect(query).toMatchObject({ Hello: { query: {} } });
    });

    it('should match a simple anonymous query snapshot', () => {
      const query = buildApolloOptions(basicAnonQuery, {});
      expect(query).toMatchSnapshot();
      expect(query).toMatchObject({ [ANONYMOUS_QUERY]: { query: {} } });
    });
  });
});
