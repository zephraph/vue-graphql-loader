import { DocumentNode, DefinitionNode, OperationDefinitionNode } from 'graphql';
import gql from 'graphql-tag';

/**
 * A utility function mainly for testing, this function converts a gql operation
 * string into many gql documents, each with a single operation node
 * @param query A graphql operation string (query, mutation, subscription)
 */
export const strToDocNodes = (query: string) => splitDocument(gql(query));

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

export const isAnonymousOperation = (node: DocumentNode) =>
  node.definitions[0].kind === 'OperationDefinition' &&
  !(node.definitions[0] as OperationDefinitionNode).name;

export const hasAnonymousOperation = (nodes: DocumentNode[]) =>
  nodes.some(isAnonymousOperation);
