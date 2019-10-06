import load from './component-loader';
import {
  noAnonymousOperations,
  ERROR_NO_ANONYMOUS_OPERATIONS
} from '../src/gql-validators';
import { strToDocNodes as gql } from './gql-test-utils';

const anonQuery = gql('{ hello }');
const multiAnonQuery = gql(`{ test } { hello }`);
const mixedNamedQuery = gql(`{ test } query Name { name }`);

describe('failOnAnonymous()', () => {
  it('should fail when single anonymous operation used', async () => {
    const promise = noAnonymousOperations(anonQuery);
    await expect(promise).rejects.toMatchObject({
      message: ERROR_NO_ANONYMOUS_OPERATIONS
    });
  });

  it('should fail when multiple anonymous operation used', async () => {
    const promise = noAnonymousOperations(multiAnonQuery);
    await expect(promise).rejects.toMatchObject({
      message: ERROR_NO_ANONYMOUS_OPERATIONS
    });
  });

  it('should fail when anonymous operation used with named operation', async () => {
    const promise = noAnonymousOperations(mixedNamedQuery);
    await expect(promise).rejects.toMatchObject({
      message: ERROR_NO_ANONYMOUS_OPERATIONS
    });
  });

  it('should fail when anonymous operation loaded from component', async () => {
    const promise = load('anonymous');
    expect(promise).rejects.toContain(ERROR_NO_ANONYMOUS_OPERATIONS);
  });
});
