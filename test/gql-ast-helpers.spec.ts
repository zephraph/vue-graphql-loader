import {
  isOperationType,
  getDefinitionNode,
  getOperationsOfType,
  getOperationName
} from '../src/gql-ast-helpers';
import { strToDocNodes as gql } from './gql-test-utils';

describe('isOperationType()', () => {
  it('should return true if the given document contains the matching operation definition', () => {
    const query = gql(`{ test }`);
    expect(isOperationType('query')(getDefinitionNode(query[0]))).toBeTruthy();
    expect(
      isOperationType('mutation')(getDefinitionNode(query[0]))
    ).toBeFalsy();
  });
});

describe('getOperationsOfType()', () => {
  it('should return all the operations of a given type', () => {
    const doc = gql(`
    { name }
    mutation {
      doSomething(test: true)
    }`);
    expect(getOperationsOfType('query')(doc)).toEqual([doc[0]]);
    expect(getOperationsOfType('mutation')(doc)).toEqual([doc[1]]);
  });
});

describe('getOperationName()', () => {
  const query = gql(`
    query Query1 {
      test
    }
  `);
  expect(getOperationName(query[0])).toBe('Query1');
});
