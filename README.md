# [ALPHA] vue-graphql-block

Custom support for GQL queries in Vue's single file components

## Installation

![Standby](https://media.giphy.com/media/3oz8xOvhnSpVOs9xza/giphy.gif)

## Usage

Configure this package as a custom loader for the `graphql` block in vue-loader

```javascript
module.exports = {
  // ...probably more stuff here
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            graphql: require.resolve('vue-graphql-block')
          }
          // other vue-loader options go here
        }
      }
    ]
  }
}
```
