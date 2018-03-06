import { DocumentNode, print } from 'graphql';
import { DocumentError } from './query-validators';
import { loader } from 'webpack';

const validationError = (
  context: loader.LoaderContext,
  loaderCallback: loader.loaderCallback
) => (err: DocumentError | string) => {
  if (err && typeof err !== 'string' && err.message && err.affected) {
    const { message, affected } = err;
    const errMsg =
      '\t\n\n' +
      `\t${message} (${context.resourcePath})` +
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
    loaderCallback(new Error(errMsg));
  } else {
    loaderCallback(new Error(err as string));
  }
};

export default validationError;
