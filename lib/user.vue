<template>
  <user-header user="{{ user }}"></user-header>
  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <topic-list topics="{{ topics }}"></topic-list>
      </div>
    </div>
  </div>
</template>

<script>
  var api = require('./api');

  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        params: {},
        user: {}
      }
    },
    watch: {
      'params.username': function(username) {
        if (!username) return;
        this.fetchUser(username);
      }
    },
    methods: {
      fetchUser: function(username) {
        ga('send', 'pageview', {title: username});
        if (this.$root.currentUser.username === username) {
          return this.user = this.$root.currentUser;
        }
        api.user.profile(username, function(resp) {
          this.user = resp;
        }.bind(this));
      }
    },
    components: {
      'user-header': require('./components/user-header.vue')
    }
  };
</script>
