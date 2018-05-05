/** The attributes that can be used in the graphql block */
export interface GraphQLLoaderOptions {
  /** The name of a module that can replace the default implementation */
  handler?: string;
  noAnonymousOperations: boolean;
}

export const defaultLoaderOptions: GraphQLLoaderOptions = {
  noAnonymousOperations: false
};
