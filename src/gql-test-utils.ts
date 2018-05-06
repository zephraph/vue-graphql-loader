import { splitDocument } from './gql-ast-helpers';
import gql from 'graphql-tag';

/**
 * A utility function mainly for testing, this function converts a gql operation
 * string into many gql documents, each with a single operation node
 * @param query A graphql operation string (query, mutation, subscription)
 */
export const strToDocNodes = (query: string) => splitDocument(gql(query));
