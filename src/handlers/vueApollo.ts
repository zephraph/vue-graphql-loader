import { DocumentNode, OperationDefinitionNode } from 'graphql';
import { GraphQLBlockAttributes } from '../index';
import { Handler } from './handler';
import { isQuery, getDefinitionNode, getQueryName } from '../gql-ast-helpers';

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

const vueApolloHandler: Handler = function handler(
  component,
  gqlDocuments,
  attributes = {}
) {
  component.options.apollo = {
    ...component.options.apollo,
    ...buildApolloOptions(gqlDocuments, attributes)
  };
  return component;
};

export default vueApolloHandler;
