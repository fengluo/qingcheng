<template>
  <div class="top-nav">
    <div class="container">
      <div class="site-nav clearfix">
        <a class="site-logo" href="/">
          <div class="logo" v-if="!$site.logo">
            <div><span class="left-yellow"></span><span class="right-green"></span></div>
            <div><span class="full-green"></span></div>
            <div><span class="left-green"></span><span class="right-red"></span></div>
          </div>
        </a>
        <nav>
          <a class="brand" href="/c/site">Site</a>
          <a class="brand" href="/c/about">About</a>
        </nav>
      </div>

      <div class="site-account">
        <button v-on="click: showLogin=true">Log in</button>
      </div>
    </div>
  </div>

  <component is="{{view}}"
    params="{{params}}"
    v-transition
    transition-mode="out-in">
  </component>

  <div id="message" v-if="messages.length" v-transition="fade">
    <div class="message message-{{type}}" v-repeat="messages" v-text="text" v-transition="fade"></div>
  </div>
  <login-dialog v-if="showLogin" show="{{showLogin}}" v-transition="fade"></login-dialog>
</template>

<script>
  module.exports = {
    el: '#app',
    data: {
      view: '',
      showLogin: false,
      messages: [],
      params: {}
    },
    methods: {
      clearMessage: function(index) {
        this.messages.splice(index, 1);
      },
      flashMessage: function(type, text) {
        var msg = {type: type, text: text};
        var me = this;
        me.messages.push(msg);
        var index = me.messages.length - 1;
        setTimeout(function() {
          me.clearMessage(index);
        }, 2000);
      }
    },
    components: {
      'home': require('./home.vue'),
      'cafe': require('./cafe.vue'),
      'topic': require('./topic.vue'),
      'user': require('./user.vue'),
      'login-dialog': require('./components/login-dialog.vue')
    }
  }
</script>

<style src="css/base.css"></style>
<style src="css/ui.css"></style>
