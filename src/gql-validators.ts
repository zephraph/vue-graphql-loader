import { DocumentNode, DefinitionNode, OperationDefinitionNode } from 'graphql';

export interface DocumentError {
  message: string;
  affected: DocumentNode[];
}

export const failWithError = (err: string) => {
  throw new Error(err);
};

export const ERROR_NO_ANONYMOUS_OPERATIONS =
  'Anonymous operations are not allowed';

export const hasAnonymousOperation = (nodes: DocumentNode[]) =>
  nodes.some(isAnonymousOperation);

export const getDefinitionNode = (doc: DocumentNode): DefinitionNode =>
  doc.definitions[0];

export const isOperation = (node: DocumentNode) =>
  getDefinitionNode(node).kind === 'OperationDefinition';

export const isAnonymousOperation = (node: DocumentNode) =>
  isOperation(node) &&
  !(getDefinitionNode(node) as OperationDefinitionNode).name;

export const noAnonymousOperations = (gqlNodes: DocumentNode[]) =>
  hasAnonymousOperation(gqlNodes)
    ? Promise.reject<DocumentError>({
        message: ERROR_NO_ANONYMOUS_OPERATIONS,
        affected: gqlNodes.filter(isAnonymousOperation)
      })
    : Promise.resolve({});

export const verifyDocuments = (gqlNodes: DocumentNode[]) =>
  noAnonymousOperations(gqlNodes);
