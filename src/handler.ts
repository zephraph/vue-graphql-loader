import Vue, { ComponentOptions } from 'vue';
import {
  OperationType,
  hasAnonymousOperation,
  getOperationName,
  getQueries,
  getMutations,
  getSubscriptions
} from './gql-ast-helpers';
import { DocumentNode } from 'graphql';

interface GraphQLComponentOptions extends ComponentOptions<Vue> {
  query?: DocumentNode | { [key: string]: DocumentNode };
  mutation?: DocumentNode | { [key: string]: DocumentNode };
  subscription?: DocumentNode | { [key: string]: DocumentNode };
}

type Handler = (
  component: {
    options: GraphQLComponentOptions;
  },
  /** An array of Graphql DocumentNodes, each with a single DefinitionNode */
  gqlDocuments: DocumentNode[],
  attributes?: object
) => void;

export const ERROR_ONLY_ONE_ANON_OPERATION_ALLOWED = (type: OperationType) =>
  `Only one anonymous ${type} allowed per component`;

export const failWithError = (err: string) => {
  throw new Error(err);
};

export const aggregateOperations = (operations: DocumentNode[]) =>
  operations
    .map(operation => ({
      [getOperationName(operation)]: operation
    }))
    .reduce((acc, curr) => ({
      ...acc,
      ...curr
    }));

export const getOperations = (
  type: OperationType,
  operations: DocumentNode[] = []
) =>
  operations.length === 0
    ? undefined
    : hasAnonymousOperation(operations)
      ? operations.length === 1
        ? operations[0]
        : failWithError(ERROR_ONLY_ONE_ANON_OPERATION_ALLOWED(type))
      : aggregateOperations(operations);

const defaultHandler: Handler = function handler(
  component,
  gqlDocuments,
  attributes = {}
) {
  component.options.query = getOperations('query', getQueries(gqlDocuments));
  component.options.mutation = getOperations(
    'mutation',
    getMutations(gqlDocuments)
  );
  component.options.subscription = getOperations(
    'subscription',
    getSubscriptions(gqlDocuments)
  );

  // @ts-ignore
  delete component.options._Ctor;
};

export default defaultHandler;
