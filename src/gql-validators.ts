import { DocumentNode, OperationDefinitionNode } from 'graphql';
import { GraphQLLoaderOptions } from './loader-options';

export interface DocumentError {
  message: string;
  affected: DocumentNode[];
}

export const verifyDocuments = (
  gqlNodes: DocumentNode[],
  loaderOptions: GraphQLLoaderOptions
) =>
  loaderOptions.noAnonymousOperations
    ? noAnonymousOperations(gqlNodes)
    : Promise.resolve();

export const noAnonymousOperations = (
  gqlNodes: DocumentNode[]
): Promise<void | DocumentError> =>
  new Promise((resolve, reject) => {
    const anonymousQueries = gqlNodes.filter(
      node =>
        node.definitions[0].kind === 'OperationDefinition' &&
        !(node.definitions[0] as OperationDefinitionNode).name
    );

    anonymousQueries.length === 0
      ? resolve()
      : reject({
          message: 'Anonymous queries are not allowed',
          affected: anonymousQueries
        });
  });
