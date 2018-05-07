import { DocumentNode } from 'graphql';
import { GraphQLLoaderOptions } from './loader-options';
import {
  operations,
  hasAnonymousOperation,
  hasNamedOperation,
  isAnonymousOperation,
  getOperationsOfType
} from './gql-ast-helpers';

export const ERROR_NO_ANONYMOUS_OPERATIONS =
  'Anonymous operations are not allowed';
export const ERROR_ONLY_ONE_ANON_OPERATION_ALLOWED =
  'Only one anonymous operation allowed per component';
export const ERROR_NO_MIXED_NAME_CASE =
  'Cannot have both a named and anonymous operation in a component';

export interface DocumentError {
  message: string;
  affected: DocumentNode[];
}

export const failWithError = (err: string) => {
  throw new Error(err);
};

export const noAnonymousOperations = (
  gqlNodes: DocumentNode[],
  loaderOptions: GraphQLLoaderOptions
) =>
  loaderOptions.noAnonymousOperations && hasAnonymousOperation(gqlNodes)
    ? Promise.reject<DocumentError>({
        message: ERROR_NO_ANONYMOUS_OPERATIONS,
        affected: gqlNodes.filter(isAnonymousOperation)
      })
    : Promise.resolve({});

export const failOnMixedNamedCase = (gqlNodes: DocumentNode[]) => {
  const mixedNamedOperations = operations
    .map(type => getOperationsOfType(type)(gqlNodes))
    .filter(opArray => opArray.length > 1)
    .filter(
      opArray => hasNamedOperation(opArray) && hasAnonymousOperation(opArray)
    );

  return mixedNamedOperations.length > 0
    ? Promise.reject({
        message: ERROR_NO_MIXED_NAME_CASE,
        affected: mixedNamedOperations
      })
    : Promise.resolve({});
};

export const failOnMultipleAnonymous = (gqlNodes: DocumentNode[]) =>
  new Promise((resolve, reject) => {
    const multiAnonymousOperations = operations
      .map(type => getOperationsOfType(type)(gqlNodes))
      .map(opArray => opArray.filter(isAnonymousOperation))
      .filter(opArray => opArray.length >= 2)
      .reduce((curr, acc) => acc.concat(curr), []);

    multiAnonymousOperations.length === 0
      ? resolve({})
      : reject({
          message: ERROR_ONLY_ONE_ANON_OPERATION_ALLOWED,
          affected: multiAnonymousOperations
        });
  });

export const verifyDocuments = (
  gqlNodes: DocumentNode[],
  loaderOptions: GraphQLLoaderOptions
) =>
  Promise.all([
    noAnonymousOperations(gqlNodes, loaderOptions),
    failOnMultipleAnonymous(gqlNodes),
    failOnMixedNamedCase(gqlNodes)
  ]);
