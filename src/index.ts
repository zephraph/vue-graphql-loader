import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { parseQuery } from 'loader-utils';
import { join } from 'path';
import { loader } from 'webpack';
import { splitDocument } from './gql-ast-helpers';

export const defaultHandlerPath = join(__dirname, 'handler');

export default function graphqlLoader(
  this: loader.LoaderContext,
  source: string
) {
  const attrs = parseQuery(this.resourceQuery);
  const gqlDocument = gql(source) as DocumentNode;
  const documents = splitDocument(gqlDocument);

  const handler = defaultHandlerPath;
  const returnLoaderResults = this.async() as loader.loaderCallback;
  returnLoaderResults(
    null,
    `
        let gqlDocs = ${JSON.stringify(documents)};
        let attrs = ${JSON.stringify({ ...attrs })} || {};
        let handler = require(${JSON.stringify(handler)});

        if (handler.default) {
          handler = handler.default;
        }
        module.exports = function vueGraphqlLoader(component) {
          handler(component, gqlDocs, attrs);
        }`
  );
}
