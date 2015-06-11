<template>
  <h1>App</h1>
  <component is="{{view}}">
  </component>
</template>

<script>
  module.exports = {
    el: '#app',
    data: {
      view: 'home',
      params: {}
    },
    components: {
      'home': require('./views/home.vue')
    }
  }
</script>
