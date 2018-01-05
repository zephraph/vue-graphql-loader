import {
  DocumentNode,
  print,
  OperationDefinitionNode,
  DefinitionNode
} from 'graphql';
import { ComponentOptions } from 'vue';

interface ApolloQueryConfig {
  query: DocumentNode;
  variables?: {
    [key: string]: string;
  };
  fetchPolicy?:
    | 'cache-first'
    | 'cache-and-network'
    | 'network-only'
    | 'cache-only'
    | 'standby';
}

interface ApolloConfig {
  [key: string]: DocumentNode | ApolloQueryConfig;
}

interface GraphqlComponentOptions extends ComponentOptions<any> {
  apollo?: ApolloConfig;
}

interface GQLComponent {
  options: GraphqlComponentOptions;
}

const def = (doc: DocumentNode): DefinitionNode => doc.definitions[0];

export type Handler = (
  component: GQLComponent,
  gqlDocuments: DocumentNode[],
  attributes: object
) => void;

const vueApolloHandler: Handler = function handler(
  component,
  gqlDocuments,
  attributes
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
      // @ts-ignore
      .map(doc => ({ [def(doc).name.value]: { query: doc } }))
      .reduce((curr, acc) => ({ ...acc, ...curr }), {})
  };
};

export default vueApolloHandler;
