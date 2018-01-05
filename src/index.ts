import { DocumentNode, print } from 'graphql';
import gql from 'graphql-tag';
import { getOptions } from 'loader-utils';
import { join } from 'path';
import { loader } from 'webpack';

import {
  splitDocument,
  verifyDocuments,
  DocumentError
} from './query-validators';

/**
 * The attributes that can be used in the graphql block
 */
interface GraphqlBlockAttributes {
  /**
   * The name of a module that can replace the default implementation
   */
  handler?: string;
}

export const defaultHandlerPath = join(__dirname, 'handlers', 'default');

export default function graphqlLoader(
  this: loader.LoaderContext,
  source: string
) {
  const attrs = getOptions(this) as GraphqlBlockAttributes;
  const gqlDocument = gql(source) as DocumentNode;
  const documents = splitDocument(gqlDocument);

  const handler = (attrs && attrs.handler) || defaultHandlerPath;

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
    .catch((err: DocumentError | string) => {
      if (err && typeof err !== 'string' && err.message && err.affected) {
        const { message, affected } = err;
        const errMsg =
          '\t\n\n' +
          `\t${message} (${this.resourcePath})` +
          '\t\n\n' +
          '\tResolve these affected items:' +
          '\t\n\n' +
          affected
            .map((a: DocumentNode) => print(a))
            .map((s: string) =>
              s
                .split('\n')
                .map(s2 => '\t' + s2)
                .join('\n')
            )
            .join('\n');
        callback(new Error(errMsg));
      } else {
        callback(new Error(err as string));
      }
    });
  return;
}
