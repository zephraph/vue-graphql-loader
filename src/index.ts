import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { getOptions } from 'loader-utils';
import { join } from 'path';
import { loader } from 'webpack';

import { verifyDocuments } from './gql-handlers';

interface CustomBlockAttributes {
  handler?: string;
}

export default function graphqlLoader(
  this: loader.LoaderContext,
  source: string
) {
  const attrs = getOptions(this) as CustomBlockAttributes;
  const gqlDocument = gql(source) as DocumentNode;
  const handler = (attrs && attrs.handler) || join(__dirname, 'defaultHandler');
  const documents = gqlDocument.definitions.map(def => ({
    ...gqlDocument,
    definitions: [def]
  }));
  const callback = this.async() as loader.loaderCallback;

  verifyDocuments(documents)
    .then(() => {
      callback(
        null,
        `
        let gqlDocs = ${JSON.stringify(documents)};
        let attrs = ${JSON.stringify(attrs)};
        let handler = require(${JSON.stringify(handler)});

        if (handler.default) {
          handler = handler.default;
        }
        module.exports = function(component) {
          handler(component, gqlDocs, attrs);
        }`
      );
    })
    .catch(err => {
      const errMsg = `${err}. Encountered in ${this.resourcePath}`;
      callback(new Error(errMsg));
    });
  return;
}
