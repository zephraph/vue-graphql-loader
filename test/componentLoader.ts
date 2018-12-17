import compiler from './compiler';
import requireFromString from 'require-from-string';
import { resolve } from 'path';
import { GraphQLLoaderOptions } from '../src/loader-options';

export default async function componentLoader(
  componentName: string,
  loaderOptions?: GraphQLLoaderOptions
) {
  const { vfs } = await compiler(componentName, loaderOptions);
  const src: string = vfs
    .readFileSync(resolve(__dirname, `${componentName}.js`))
    .toString();
  const { component } = requireFromString(src);
  return component.default;
}
