import { strToDocNodes } from '../__fixtures__/gql-helper';
import { buildApolloOptions, ANONYMOUS_QUERY } from './vueApollo';

const basicNamedQuery = `query Hello { world }`;
const basicAnonQuery = `{ hello }`;

describe('Vue Apollo Handler', () => {
  describe('buildApolloOptions', () => {
    it('should match a simple named query snapshot', () => {
      const query = buildApolloOptions(strToDocNodes(basicNamedQuery), {});
      expect(query).toMatchSnapshot();
      expect(query).toMatchObject({ Hello: { query: {} } });
    });

    it('should match a simple anonymous query snapshot', () => {
      const query = buildApolloOptions(strToDocNodes(basicAnonQuery), {});
      expect(query).toMatchSnapshot();
      expect(query).toMatchObject({ [ANONYMOUS_QUERY]: { query: {} } });
    });
  });
});
