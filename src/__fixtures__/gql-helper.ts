import { readFile } from 'fs';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { join } from 'path';

const rel = fileName => join(__dirname, 'gql', `${fileName}.gql`);

export const readQuery = (name: string): Promise<DocumentNode> =>
  new Promise((resolve, reject) => {
    readFile(rel(name), 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(gql(data) as DocumentNode);
    });
  });
