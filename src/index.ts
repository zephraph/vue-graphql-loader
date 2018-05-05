import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { getOptions } from 'loader-utils';
import { join } from 'path';
import { loader } from 'webpack';

import validationError from './validation-error';
import { GraphQLLoaderOptions, defaultLoaderOptions } from './loader-options';
import { verifyDocuments } from './gql-validators';
import { splitDocument } from './gql-ast-helpers';

export const defaultHandlerPath = join(__dirname, 'handler');

export const withOptions = (
  options: GraphQLLoaderOptions = defaultLoaderOptions
) =>
  function graphqlLoader(this: loader.LoaderContext, source: string) {
    const attrs = getOptions(this) as object;
    const gqlDocument = gql(source) as DocumentNode;
    const documents = splitDocument(gqlDocument);

    const handler = (options && options.handler) || defaultHandlerPath;

    const returnLoaderResults = this.async() as loader.loaderCallback;

    console.log('attrs:', attrs);
    verifyDocuments(documents, options)
      .then(() => {
        returnLoaderResults(
          null,
          `
        let gqlDocs = ${JSON.stringify(documents)};
        let attrs = ${JSON.stringify({ ...options, ...attrs })} || {};
        let handler = require(${JSON.stringify(handler)});

        if (handler.default) {
          handler = handler.default;
        }
        module.exports = function vueGraphqlLoader(component) {
          handler(component, gqlDocs, attrs);
        }`
        );
      })
      .catch(validationError(this, returnLoaderResults));
  };

export default withOptions();
