<template>
  <div class="overlay">
    <div class="login-mask overlay-mask" v-on="click: show=false"></div>
    <div class="login-form" v-if="show">
      <form action="/session" method="post" v-on="submit: login">
        <div class="form-field">
          <input type="text" placeholder="Username" name="username" v-model="username" required>
        </div>
        <div class="form-field">
          <input type="password" placeholder="Password" name="password" v-model="password" required>
        </div>
        <label class="form-check">
          <input type="checkbox" name="permanent" v-model="permanent">Remember Me
        </label>
        <div class="form-submit">
          <button>Log in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['show'],
    data: function() {
      return {
        show: true,
        username: '',
        password: '',
        permanent: true
      };
    },
    methods: {
      login: function(e) {
        e.preventDefault();
        var data = {
          username: this.username,
          password: this.password,
          permanent: this.permanent
        };
        api.user.login(data, function(resp) {
          this.show = false;
        }.bind(this));
      }
    },
    detached: function() {
      document.body.classList.remove('no-scroll');
    },
    attached: function() {
      document.body.classList.add('no-scroll');
    }
  };
</script>

<style>
  .login-mask {
    background-color: rgba(0, 0, 0, 0.6);
  }
  .login-form {
    position: absolute;
    width: 380px;
    top: 160px;
    left: 50%;
    margin-left: -230px;
    z-index: 20;
    background-color: white;
    padding: 50px 40px;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  }
</style>
