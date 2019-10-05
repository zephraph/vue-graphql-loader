# vue-graphql-loader

[![Build Status](https://travis-ci.org/zephraph/vue-graphql-loader.svg?branch=master)](https://travis-ci.org/zephraph/vue-graphql-loader)
[![Greenkeeper badge](https://badges.greenkeeper.io/zephraph/vue-graphql-loader.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/dt/vue-graphql-loader.svg)](https://img.shields.io/npm/v/vue-graphql-loader.svg)

Adds support for build time compilation of `<graphql>` blocks within Vue single file components.

## Installation

`npm i -S vue-graphql-loader`

## Setup

Configure this package as a custom loader for the `graphql` block in vue-loader

### Webpack

```javascript
module.exports = {
  // ...probably more stuff here
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        resourceQuery: /blockType=graphql/,
        use: [
          {
            loader: require.resolve('vue-graphql-loader'),
            options: {
              // Allow or disallow anonymous queries, mutations, etc. Defaults to true.
              noAnonymousOperations: true
            }
          }
        ]
      }
    ]
  }
};
```

### Vue-cli 3.x
```javascript
module.exports = {
   chainWebpack: config => {
    config.module
      .rule('graphql')
      .resourceQuery(/blockType=graphql/)
      .use('vue-graphql-loader')
      .loader('vue-graphql-loader')
  },
}
```

## Usage

**Anonymous Operations**

Starting from version 4.x, anonymous operations are not supported. Please use explicitly named operation as
this.$options.query, this.$options.mutation and this.$options.subscription respectively.

**Named Operations**

Named operations are stored as an object the type's Vue namespace.

```vue
<graphql>
query testQuery {
  test
}

mutation testMutation {
  test
}

subscription testSubscription {
  test
}
</graphql>

<script>
export default {
  created() {
    console.log(this.$options.query.testQuery);
    console.log(this.$options.mutation.testMutation);
    console.log(this.$options.subscription.testSubscription);
  }
};
</script>
```

