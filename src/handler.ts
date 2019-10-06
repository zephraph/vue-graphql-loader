import Vue from 'vue';
import {
  getOperationName,
  getQueries,
  getMutations,
  getSubscriptions
} from './gql-ast-helpers';
import { DocumentNode } from 'graphql';

// FIXME: find out how to merge interface defs here
interface GraphQLComponentOptions {
  query?: { [key: string]: DocumentNode };
  mutation?: { [key: string]: DocumentNode };
  subscription?: { [key: string]: DocumentNode };
}

declare module 'vue/types/options' {
  interface GraphQLComponentOptions<V extends Vue> {
    query?: { [key: string]: DocumentNode };
    mutation?: { [key: string]: DocumentNode };
    subscription?: { [key: string]: DocumentNode };
  }
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

export const defaultHandler: Handler = (component, gqlDocuments) => {
  component.options.query = aggregateOperations(getQueries(gqlDocuments));
  component.options.mutation = aggregateOperations(getMutations(gqlDocuments));
  component.options.subscription = aggregateOperations(
    getSubscriptions(gqlDocuments)
  );

  // @ts-ignore
  delete component.options._Ctor;
};

export default defaultHandler;
