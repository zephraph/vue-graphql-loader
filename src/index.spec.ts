import { defaultHandlerPath } from './index';

describe(`defaultHandlerPath`, () => {
  it(`should exist`, async () => {
    expect(() => {
      require.resolve(defaultHandlerPath);
    }).not.toThrow();
  });
});
