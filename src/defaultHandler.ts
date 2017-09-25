import { DocumentNode } from 'graphql';
import { ComponentOptions } from 'vue';

interface GraphqlComponentOptions extends ComponentOptions<any> {
  apollo?: object;
}

interface GQLComponent {
  options: GraphqlComponentOptions;
}

export default function handler(
  component: GQLComponent,
  gqlDocuments: DocumentNode[],
  attributes: object
) {
  console.log(component, gqlDocuments, attributes);
  if (!component.options.apollo) {
    component.options.apollo = {};
  }
}
