import { defaultHandlerPath } from '../lib/index';

describe(`defaultHandlerPath`, () => {
  it(`should exist`, async () => {
    expect(() => {
      require.resolve(defaultHandlerPath);
    }).not.toThrow();
  });
});
