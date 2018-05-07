/** The options that can be passed to the loader */
export interface GraphQLLoaderOptions {
  /** The name of a module that can replace the default implementation */
  handler?: string;
  noAnonymousOperations: boolean;
}

/** The default configuration of the loader */
export const defaultLoaderOptions: GraphQLLoaderOptions = {
  noAnonymousOperations: false
};
