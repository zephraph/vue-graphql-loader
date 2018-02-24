import { DocumentNode, OperationDefinitionNode, DefinitionNode } from 'graphql';
import Vue, { ComponentOptions } from 'vue';
import { GraphQLBlockAttributes } from '../index';

export const ANONYMOUS_QUERY = '__anon_query__';

const getDefinitionNode = (doc: DocumentNode): DefinitionNode =>
  doc.definitions[0];

const getQueryName = (
  docDef: OperationDefinitionNode,
  { alias }: GraphQLBlockAttributes = {}
) => {
  if (alias) return alias;
  if (docDef.name) return docDef.name.value;
  return ANONYMOUS_QUERY;
};

const isQuery = (definitionNode: DefinitionNode) =>
  definitionNode.kind === 'OperationDefinition' &&
  definitionNode.operation === 'query';

export const buildApolloOptions = (
  gqlDocuments: DocumentNode[],
  attributes: GraphQLBlockAttributes
) =>
  gqlDocuments
    .filter(doc => isQuery(getDefinitionNode(doc)))
    .map(doc => ({
      [getQueryName(
        getDefinitionNode(doc) as OperationDefinitionNode,
        attributes
      )]: {
        query: doc
      }
    }))
    .reduce((curr, acc) => ({ ...acc, ...curr }), {});

export type Handler = (
  component: {
    options: ComponentOptions<Vue>;
  },
  gqlDocuments: DocumentNode[],
  attributes: GraphQLBlockAttributes
) => void;

const vueApolloHandler: Handler = function handler(
  component,
  gqlDocuments,
  attributes = {}
) {
  component.options.apollo = {
    ...component.options.apollo,
    ...buildApolloOptions(gqlDocuments, attributes)
  };
};

export default vueApolloHandler;
