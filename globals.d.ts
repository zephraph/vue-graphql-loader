declare module 'loader-utils' {
  export function getOptions<T>(loaderContext: T): T | null;
}
