import {
  verifyDocuments,
  failOnMultipleAnonymous,
  failOnMixedNamedCase,
  ERROR_NO_ANONYMOUS_OPERATIONS,
  ERROR_ONLY_ONE_ANON_OPERATION_ALLOWED,
  ERROR_NO_MIXED_NAME_CASE
} from './gql-validators';
import { strToDocNodes as gql } from './gql-test-utils';

const anonQuery = gql('{ hello }');
const multiAnonQuery = gql(`{ test } { hello }`);
const multiNamedQuery = gql(`
  query Query1 { test }
  query Query2 { name }
`);
const mixedNamedQuery = gql(`
{ test }
query Name { name }
`);

describe('failOnMixedNamedCase()', () => {
  it('should fail when both named and anonymous operations are present', async () => {
    const promise = failOnMixedNamedCase(mixedNamedQuery);
    await expect(promise).rejects.toMatchObject({
      message: ERROR_NO_MIXED_NAME_CASE
    });
  });
  it('should pass when multiple named operations are tested', async () => {
    const promise = failOnMultipleAnonymous(multiNamedQuery);
    await expect(promise).resolves.toBeDefined();
  });
});

describe('failOnMultipleAnonymous()', () => {
  it('should fail when there are multiple anonymous operations', async () => {
    const promise = failOnMultipleAnonymous(multiAnonQuery);
    await expect(promise).rejects.toMatchObject({
      message: ERROR_ONLY_ONE_ANON_OPERATION_ALLOWED
    });
  });
  it('should pass when there are multiple named operations', async () => {
    const promise = failOnMultipleAnonymous(multiNamedQuery);
    await expect(promise).resolves.toBeDefined();
  });
});

describe('verifyDocuments()', () => {
  it(`should fail if there's an anonymous query`, async () => {
    const promise = verifyDocuments(anonQuery, {
      noAnonymousOperations: true
    });
    await expect(promise).rejects.toMatchObject({
      message: ERROR_NO_ANONYMOUS_OPERATIONS
    });
  });

  it(`should pass if there's no anonymous queries`, async () => {
    const promise = verifyDocuments(anonQuery, {
      noAnonymousOperations: false
    });
    await expect(promise).resolves.toBeDefined();
  });
});
