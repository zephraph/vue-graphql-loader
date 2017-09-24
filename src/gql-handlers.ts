import { DocumentNode } from 'graphql';


export const verifyDocument = (gql: DocumentNode) => isSingleDefinition(gql);

export const isSingleDefinition = (gql: DocumentNode) =>
  gql.definitions.length === 1
    ? Promise.resolve()
    : Promise.reject(
        'graphql blocks can only have one statement per each block'
      );
