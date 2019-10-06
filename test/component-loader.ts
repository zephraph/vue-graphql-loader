import compiler from './compiler';
import requireFromString from 'require-from-string';
import { resolve } from 'path';

export default async function componentLoader(componentName: string) {
  const { vfs } = await compiler(componentName);
  const src: string = vfs
    .readFileSync(resolve(__dirname, `${componentName}.js`))
    .toString();
  const { component } = requireFromString(src);
  return component.default;
}
