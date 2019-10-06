import 'vue';
import {
  getOperationName,
  getQueries,
  getMutations,
  getSubscriptions
} from './gql-ast-helpers';
import { DocumentNode } from 'graphql';

interface GraphQLComponentOptions {
  query?: { [key: string]: DocumentNode };
  mutation?: { [key: string]: DocumentNode };
  subscription?: { [key: string]: DocumentNode };
}

declare module 'vue/types/vue' {
  interface Vue extends GraphQLComponentOptions {}
}

type Handler = (
  component: {
    options: GraphQLComponentOptions;
  },
  /** An array of Graphql DocumentNodes, each with a single DefinitionNode */
  gqlDocuments: DocumentNode[],
  attributes?: object
) => void;

export const aggregateOperations = (ops?: DocumentNode[]) => {
  if (!ops || ops.length < 1) {
    return;
  }

  return ops.reduce(
    (acc, curr) => ({ ...acc, [getOperationName(curr)]: curr }),
    {}
  );
};

export const defaultHandler: Handler = function(component, gqlDocuments) {
  component.options.query = aggregateOperations(getQueries(gqlDocuments));
  component.options.mutation = aggregateOperations(getMutations(gqlDocuments));
  component.options.subscription = aggregateOperations(
    getSubscriptions(gqlDocuments)
  );

  // @ts-ignore
  delete component.options._Ctor;
};

export default defaultHandler;
