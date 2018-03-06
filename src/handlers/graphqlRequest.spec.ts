import graphqlRequestHandler from './graphqlRequest';
import { mount } from '@vue/test-utils';
import { strToDocNodes } from '../__fixtures__/gql-helper';

const anonQuery = strToDocNodes('{ greeting }');

describe('graphqlRequest', () => {
  let basicComponent;

  beforeEach(() => {
    basicComponent = {
      template: '<h1>{{ greetings }}</h1>'
    };
  });

  it('should return a result with an anonymous query', async () => {
    expect(graphqlRequestHandler({ options: basicComponent }, anonQuery, {}));
  });
});
