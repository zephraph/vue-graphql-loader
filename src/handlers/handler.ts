import Vue, { ComponentOptions } from 'vue';
import { DocumentNode } from 'graphql';
import { GraphQLBlockAttributes } from '../index';

export type Handler = (
  component: {
    options: ComponentOptions<Vue>;
  },
  gqlDocuments: DocumentNode[],
  attributes: GraphQLBlockAttributes
) => void;
