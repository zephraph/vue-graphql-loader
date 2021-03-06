import { DocumentNode, DefinitionNode, OperationDefinitionNode } from 'graphql';

/**
 * Gets the first graphql definition node from the given document
 * @param doc A graphql document node
 */
export const getDefinitionNode = (doc: DocumentNode): DefinitionNode =>
  doc.definitions[0];

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

export type OperationType = OperationDefinitionNode['operation'];
export type OperationFilter = (definitionNode: DefinitionNode) => boolean;
export const operations: OperationType[] = [
  'query',
  'mutation',
  'subscription'
];

export const isOperationType = (type: OperationType): OperationFilter => (
  definitionNode: DefinitionNode
) =>
  definitionNode.kind === 'OperationDefinition' &&
  definitionNode.operation === type;

export const isQuery = isOperationType('query');
export const isMutation = isOperationType('mutation');
export const isSubscription = isOperationType('subscription');

export const getOperationsOfType = (type: OperationType) => (
  gqlDocuments: DocumentNode[]
) => gqlDocuments.filter(doc => isOperationType(type)(getDefinitionNode(doc)));

export const getQueries = getOperationsOfType('query');
export const getMutations = getOperationsOfType('mutation');
export const getSubscriptions = getOperationsOfType('subscription');

export const getOperationName = (operation: DocumentNode): string => {
  const nameNode = (getDefinitionNode(operation) as OperationDefinitionNode)
    .name;
  return nameNode ? nameNode.value : '';
};

export const isOperation = (node: DocumentNode) =>
  getDefinitionNode(node).kind === 'OperationDefinition';

export const isAnonymousOperation = (node: DocumentNode) =>
  isOperation(node) &&
  !(getDefinitionNode(node) as OperationDefinitionNode).name;

export const isNamedOperation = (node: DocumentNode) =>
  isOperation(node) &&
  !!(getDefinitionNode(node) as OperationDefinitionNode).name;

export const hasAnonymousOperation = (nodes: DocumentNode[]) =>
  nodes.some(isAnonymousOperation);

export const hasNamedOperation = (nodes: DocumentNode[]) =>
  nodes.some(isNamedOperation);
