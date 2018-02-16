import {
  DocumentNode,
  print,
  OperationDefinitionNode,
  DefinitionNode
} from 'graphql';
import Vue, { ComponentOptions } from 'vue';
import { GraphQLBlockAttributes } from '../index';

const getDefinitionNode = (doc: DocumentNode): DefinitionNode =>
  doc.definitions[0];

const getQueryName = (
  docDef: OperationDefinitionNode,
  { alias }: GraphQLBlockAttributes = {}
) => {
  if (alias) return alias;
  if (docDef.name) return docDef.name.value;
  return '__anon_query__';
};

const isQuery = (definitionNode: DefinitionNode) =>
  definitionNode.kind === 'OperationDefinition' &&
  definitionNode.operation === 'query';

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
  console.log({ component, gqlDocuments, attributes });
  component.options.apollo = {
    ...component.options.apollo,
    ...gqlDocuments
      .filter(doc => isQuery(getDefinitionNode(doc)))
      .map(doc => ({
        [getQueryName(
          getDefinitionNode(doc) as OperationDefinitionNode,
          attributes
        )]: {
          query: doc
        }
      }))
      .reduce((curr, acc) => ({ ...acc, ...curr }), {})
  };
};

export default vueApolloHandler;
