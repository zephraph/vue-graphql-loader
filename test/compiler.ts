import { resolve } from 'path';
import * as webpack from 'webpack';
import * as memoryfs from 'memory-fs';
import { VueLoaderPlugin } from 'vue-loader';

export default (fixture, options = {}) => {
  const compiler = webpack({
    // @ts-ignore
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: resolve(__dirname),
      filename: 'result.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          resourceQuery: /blockType=graphql/,
          loader: resolve(__dirname, '../src/index.js'),
          options
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  });
  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  }).then(stats => (stats as webpack.Stats).toJson().modules[0].source);
};
