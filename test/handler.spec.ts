import handler, { aggregateOperations } from '../src/handler';
import { strToDocNodes as gql } from './gql-test-utils';

describe('aggregteOperations()', () => {
  it('should combine multiple operations into a single object', () => {
    const queries = gql(`
      query Query1 {
        hello
      }
      query Query2 {
        world
      }
    `);
    expect(aggregateOperations(queries)).toEqual({
      Query1: queries[0],
      Query2: queries[1]
    });
  });
});

describe('aggregateOperations()', () => {
  it('should return undefined if given no operations', () => {
    expect(aggregateOperations()).toBeUndefined();
    expect(aggregateOperations([])).toBeUndefined();
  });
  it('should return aggregate option for multiple named operations', () => {
    const queries = gql(`
      query Query1 {
        hello
      }
      query Query2 {
        world
      }
    `);
    expect(aggregateOperations(queries)).toEqual({
      Query1: queries[0],
      Query2: queries[1]
    });
  });
});

describe('default', () => {
  it('should set named queries to $query.[name]', () => {
    const component = {
      options: {}
    };
    const query = gql(`
      query Greeting {
        hello
      }
    `);
    handler(component, query);
    expect(component).toEqual({
      options: {
        query: {
          Greeting: query[0]
        }
      }
    });
  });
});
