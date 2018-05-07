# vue-graphql-loader

[![Build Status](https://travis-ci.org/zephraph/vue-graphql-loader.svg?branch=master)](https://travis-ci.org/zephraph/vue-graphql-loader)
[![Greenkeeper badge](https://badges.greenkeeper.io/zephraph/vue-graphql-loader.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/dt/vue-graphql-loader.svg)](https://www.npmjs.com/package/vue-graphql-loader)

Adds support for build time compilation of `<graphql>` blocks within Vue single file components.

## Installation

Configure this package as a custom loader for the `graphql` block in vue-loader

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
              noAnonymousQueries: true
            }
          }
        ]
      }
    ]
  }
};
```

## Usage

**Anonymous Operations**

Anonymous queries, mutations, and subscriptions are stored on this.$query, this.$mutation, and this.$subscription respectively.

```vue
<graphql>
{
  greetings
}
mutation {
  doSomething(test: true) {
    blah
  }
}
subscription {
  someFeed() {
    name
  }
}
</graphql>

<script>
export default {
  created() {
    console.log(
      this.$options.query,
      this.$options.mutation,
      this.$options.subscription
    );
  }
};
</script>
```

When an anonymous operation is present, it's the only operation of that type allowed for the component. That means if there's an anonymous query present, that's the only query that can be included in the component.

**Named Operations**

Named operations are stored as an object the type's Vue namespace.

```vue
<graphql>
query TestQuery {
  test
}
</graphql>

<script>
export default {
  created() {
    console.log(this.$options.query.TestQuery);
  }
};
</script>
```

It's highly recommended that you only use named operations.
