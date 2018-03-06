import { DocumentNode, DefinitionNode, OperationDefinitionNode } from 'graphql';
import { GraphQLBlockAttributes } from './index';

export const ANONYMOUS_QUERY = '__anon_query__';

export const getDefinitionNode = (doc: DocumentNode): DefinitionNode =>
  doc.definitions[0];

export const isQuery = (definitionNode: DefinitionNode) =>
  definitionNode.kind === 'OperationDefinition' &&
  definitionNode.operation === 'query';

export const getQueryName = (
  docDef: OperationDefinitionNode,
  { alias }: GraphQLBlockAttributes = {}
) => {
  if (alias) return alias;
  if (docDef.name) return docDef.name.value;
  return ANONYMOUS_QUERY;
};
