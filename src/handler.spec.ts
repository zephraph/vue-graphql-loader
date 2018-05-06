import handler, {
  failWithError,
  aggregateOperations,
  getOperations,
  ERROR_ONLY_ONE_ANON_OPERATION_ALLOWED
} from './handler';
import { strToDocNodes as gql } from './gql-test-utils';

describe('failWithError()', () => {
  it('should throw an error', () => {
    expect(() => failWithError('test')).toThrowError('test');
  });
});

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

describe('getOperations()', () => {
  it('should return undefined if given no operations', () => {
    expect(getOperations('query')).toBeUndefined();
    expect(getOperations('query', [])).toBeUndefined();
  });
  it('should return an anonymous operation if only one is present', () => {
    const query = gql(`
      {
        hello
      }
    `);
    expect(getOperations('query', query)).toEqual(query[0]);
  });
  it('should error if more than one anonymous operation is present', () => {
    const queries = gql(`
      {
        hello
      }
      {
        world
      }
    `);
    expect(() => getOperations('query', queries)).toThrowError(
      ERROR_ONLY_ONE_ANON_OPERATION_ALLOWED('query')
    );
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
    expect(getOperations('query', queries)).toEqual({
      Query1: queries[0],
      Query2: queries[1]
    });
  });
});

describe('default', () => {
  it('should set anonymous queries to $query', () => {
    const component = {
      options: {}
    };
    const query = gql(`
      {
        hello
      }
    `);
    handler(component, query);
    expect(component).toEqual({
      options: {
        $query: query[0]
      }
    });
  });
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
        $query: {
          Greeting: query[0]
        }
      }
    });
  });
});
