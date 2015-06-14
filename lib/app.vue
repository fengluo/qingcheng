<template>
  <div class="top-nav">
    <div class="container">
      <nav class="site-nav">
        <a class="brand" href="/">ZERQU</a>
      </nav>
      <div class="site-account">
        <a href="/login" class="button">Log in</a>
      </div>
    </div>
  </div>

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
      'home': require('./home.vue'),
      'cafe': require('./cafe.vue'),
      'topic': require('./topic.vue'),
      'user': require('./user.vue'),
    }
  }
</script>

<style src="css/base.css"></style>
<style src="css/ui.css"></style>
