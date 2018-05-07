import compiler from './compiler';
import * as requireFromString from 'require-from-string';
import { resolve } from 'path';

export default async function componentLoader(componentName) {
  const { stats, vfs } = await compiler(componentName);
  const src = vfs
    .readFileSync(resolve(__dirname, `${componentName}.js`))
    .toString();
  const { component } = requireFromString(src);
  return component;
}
