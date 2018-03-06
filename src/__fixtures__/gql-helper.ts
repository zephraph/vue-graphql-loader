import gql from 'graphql-tag';

import { splitDocument } from '../query-validators';

export const strToDocNodes = (query: string) => splitDocument(gql(query));
