import { DocumentNode } from 'graphql';

export interface DocumentError {
  message: string;
  affected: DocumentNode[];
}

export const failWithError = (err: string) => {
  throw new Error(err);
};
