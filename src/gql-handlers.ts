import { DocumentNode, OperationDefinitionNode } from 'graphql';

export const verifyDocuments = (gqlNodes: DocumentNode[]) =>
  noAnonymousQueries(gqlNodes);

export const noAnonymousQueries = (gqlNodes: DocumentNode[]) =>
  gqlNodes.every(
    node =>
      node.definitions[0].kind === 'OperationDefinition' &&
      (node.definitions[0] as OperationDefinitionNode).name !== null
  )
    ? Promise.resolve()
    : Promise.reject('Anonymous queries are not allowed');
