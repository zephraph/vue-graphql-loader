# [ALPHA] vue-graphql-loader

[![Greenkeeper badge](https://badges.greenkeeper.io/zephraph/vue-graphql-loader.svg)](https://greenkeeper.io/)

Custom support for GQL queries in Vue's single file components

## Installation

![Standby](https://media.giphy.com/media/3oz8xOvhnSpVOs9xza/giphy.gif)

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
            graphql: require.resolve('vue-graphql-loader')
          }
          // other vue-loader options go here
        }
      }
    ]
  }
};
```

## Usage

```vue
<template>
  <h1>{{ greetings }}</h1>
</template>

<graphql>
{
  greetings
}
</graphql>

<script>
export default {
  data() {
    return {
      greeting: 'waiting for greeting'
    };
  }
};
</script>
```
