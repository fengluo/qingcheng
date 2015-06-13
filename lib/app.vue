<template>
  <component is="{{view}}"
    params="{{params}}"
    keep-alive
    v-transition
    transition-mode="out-in">
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
      'home': require('./views/home.vue'),
      'cafe': require('./views/cafe.vue'),
      'topic': require('./views/topic.vue'),
      'user': require('./views/user.vue'),
    }
  }
</script>
