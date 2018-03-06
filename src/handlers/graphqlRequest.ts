import { Handler } from './handler';
import { getDefinitionNode, isQuery } from '../gql-ast-helpers';

const graphqlRequestHandler: Handler = function handler(
  component,
  gqlDocuments,
  attributes = {}
) {
  gqlDocuments.map(getDefinitionNode).filter(isQuery);
  // WIP
};

export default graphqlRequestHandler;
