import { DocumentNode, OperationDefinitionNode } from 'graphql';

/**
 * Maps over the definitions in a Graphql document object and returns
 * an array of documents with only a single definition
 * @param gqlDocument The parsed Graphql document to be split
 */
export const splitDocument = (gqlDocument: DocumentNode): DocumentNode[] =>
  gqlDocument.definitions.map(def => ({
    ...gqlDocument,
    definitions: [def]
  }));

interface DocumentError {
  message: string;
  affected: DocumentNode[];
}

export const verifyDocuments = (gqlNodes: DocumentNode[]) =>
  noAnonymousQueries(gqlNodes);

export const noAnonymousQueries = (
  gqlNodes: DocumentNode[]
): Promise<void | DocumentError> =>
  new Promise((resolve, reject) => {
    const anonymousQueries = gqlNodes.filter(
      node =>
        node.definitions[0].kind === 'OperationDefinition' &&
        (node.definitions[0] as OperationDefinitionNode).name === null
    );

    anonymousQueries.length === 0
      ? resolve()
      : reject({
          message: 'Anonymous queries are not allowed',
          affected: anonymousQueries
        });
  });
