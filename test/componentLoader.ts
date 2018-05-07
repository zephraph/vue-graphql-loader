import compiler from './compiler';
import * as requireFromString from 'require-from-string';
import { resolve } from 'path';
import {
  GraphQLLoaderOptions,
  defaultLoaderOptions
} from '../src/loader-options';

export default async function componentLoader(
  componentName,
  loaderOptions?: GraphQLLoaderOptions
) {
  const { stats, vfs } = await compiler(componentName, loaderOptions);
  const src = vfs
    .readFileSync(resolve(__dirname, `${componentName}.js`))
    .toString();
  const { component } = requireFromString(src);
  return component.default;
}
