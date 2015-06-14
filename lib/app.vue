<template>
  <div class="top-nav">
    <div class="container">
      <div class="site-nav clearfix">
        <a class="site-logo" href="/">
          <div class="logo" v-if="!site.logo">
            <div><span class="left-yellow"></span><span class="right-green"></span></div>
            <div><span class="full-green"></span></div>
            <div><span class="left-green"></span><span class="right-red"></span></div>
          </div>
        </a>
        <nav>
          <a class="brand" href="/">Topics</a>
        </nav>
      </div>

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
      site: {},
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
