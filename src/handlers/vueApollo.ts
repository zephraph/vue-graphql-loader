import {
  DocumentNode,
  print,
  OperationDefinitionNode,
  DefinitionNode
} from 'graphql';
import Vue, { ComponentOptions } from 'vue';
import { GraphQLBlockAttributes } from '../index';

const def = (doc: DocumentNode): DefinitionNode => doc.definitions[0];
const queryName = (
  docDef: OperationDefinitionNode,
  { alias }: GraphQLBlockAttributes = {}
) => (alias ? alias : docDef.name ? docDef.name.value : 'query');

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
  if (!component.options.apollo) {
    component.options.apollo = {};
  }
  component.options.apollo = {
    ...component.options.apollo,
    ...gqlDocuments
      .filter(
        doc =>
          def(doc).kind === 'OperationDefinition' &&
          (def(doc) as OperationDefinitionNode).operation === 'query'
      )
      .map(doc => ({
        [queryName(def(doc) as OperationDefinitionNode, attributes)]: {
          query: doc
        }
      }))
      .reduce((curr, acc) => ({ ...acc, ...curr }), {})
  };
};

export default vueApolloHandler;
