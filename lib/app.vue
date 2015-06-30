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
        <button v-if="!currentUser.username" v-on="click: showLogin=true">Log in</button>
        <div class="site-login-user" v-if="currentUser.username" v-on="click: userPopup">
          <user-avatar user="{{currentUser}}"></user-avatar>
          <span class="dropdown-caret"></span>
        </div>
      </div>
    </div>
  </div>

  <component is="{{view}}"
    params="{{params}}"
    v-transition
    transition-mode="out-in">
  </component>

  <div class="footer">
    <div class="container">
      <div style="float: left">Copyright &copy; {{year}} {{$site.name}}</div>
      <div style="float: right">
        <a href="https://zerqu.com">ZERQU</a> •
        <a href="https://github.com/zerqu/qingcheng">青城</a>
      </div>
    </div>
  </div>

  <div id="message" v-if="messages.length" v-transition="fade">
    <div class="message message-{{type}}" v-repeat="messages" v-text="text" v-transition="fade"></div>
  </div>
  <login-dialog v-if="showLogin" v-transition="fade"></login-dialog>
</template>

<script>
  module.exports = {
    el: '#app',
    data: {
      view: '',
      currentUser: {},
      showLogin: false,
      year: new Date().getFullYear(),
      messages: [],
      params: {}
    },
    methods: {
      logout: function() {
        require('./api').user.logout();
      },
      userPopup: function(e) {
        e.preventDefault();
        console.log('hello')
      }
    },
    components: {
      'home': require('./home.vue'),
      'cafe': require('./cafe.vue'),
      'topic': require('./topic.vue'),
      'user': require('./user.vue'),
      'cafe-list': require('./cafe-list.vue'),
      'user-list': require('./user-list.vue'),
      'user-avatar': require('./components/user-avatar.vue'),
      'login-dialog': require('./components/login-dialog.vue')
    }
  }
</script>

<style>
.site-login-user {
  margin-top: 14px;
  display: inline-block;
  cursor: pointer;
}
.site-login-user .avatar {
  width: 28px;
  height: 28px;
  line-height: 28px;
}
.site-login-user .avatar span {
  font-size: 16px;
}
</style>
