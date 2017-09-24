import gql from 'graphql-tag';

export interface LoaderOptions {
  name?: string;
}

export default function graphqlLoader(this: LoaderOptions, source: string) {
  const gqlDocument = gql(source);

  return `
    module.exports = function(component) {
      console.log(${JSON.stringify(gqlDocument)});
    }
  `;
}
