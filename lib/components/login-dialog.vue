<template>
  <div class="overlay">
    <div class="login-mask overlay-mask" v-on="click: close"></div>
    <div class="overlay-inner">
      <div class="login-form" v-class="shake: error">
        <div class="login-tab clearfix">
          <a href="javascript:;" v-class="active: loginTab" v-on="click: loginTab=true">Log In</a>
          <a href="javascript:;" v-class="active: !loginTab" v-on="click: loginTab=false">Sign Up</a>
        </div>

        <form action="/session" method="post" v-on="submit: login" v-show="loginTab">
          <div class="form-field">
            <input type="text" placeholder="Username/Email" aria-label="Username or Email" name="username" v-model="username" required v-el="username">
          </div>
          <div class="form-field">
            <input type="password" placeholder="Password" aria-label="Password" name="password" v-model="password" required>
          </div>
          <label class="form-check">
            <input type="checkbox" name="permanent" v-model="permanent">Remember Me
          </label>
          <div class="form-submit">
            <button>Log In</button>
          </div>
        </form>

        <form action="/session/new" method="post" v-on="submit: signup" v-show="!loginTab">
          <div class="form-field">
            <input type="email" placeholder="Email" aria-label="Email" name="email" v-model="email" required>
          </div>
          <div class="form-submit">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
      <div class="login-social" v-if="$site.logins && loginTab">
        <h3>Login With</h3>
        <div class="login-buttons">
          <a class="button login-{{name}}" href="/account/s/{{name}}" v-repeat="name: $site.logins">
            <i class="qc-icon-{{name}}"></i>{{name}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    data: function() {
      return {
        username: '',
        password: '',
        email: '',
        loginTab: true,
        error: false,
        permanent: true
      };
    },
    methods: {
      close: function() {
        this.$root.showLogin = false;
      },
      shakeError: function() {
        this.error = true;
        setTimeout(function() {
          this.error = false;
        }.bind(this), 1000);
      },
      login: function(e) {
        e.preventDefault();
        var data = {
          username: this.username,
          password: this.password,
          permanent: this.permanent
        };
        api.user.login(data, function(resp) {
          this.close();
        }.bind(this)).error(this.shakeError.bind(this));
      },
      signup: function(e) {
        e.preventDefault();
        api.user.signup(this.email, function(resp) {
          this.$root.message.show('info', resp.message);
        }.bind(this)).error(function(resp) {
          this.$root.message.show('error', resp.error_form.email[0]);
          this.shakeError();
        }.bind(this));
      }
    },
    detached: function() {
      document.body.classList.remove('no-scroll');
    },
    ready: function() {
      var el = this.$$.username;
      setTimeout(function() {
        el.focus();
      }, 20);
    },
    attached: function() {
      document.body.classList.add('no-scroll');
    }
  };
</script>

<style>
  .login-mask {
    background-color: rgba(255, 255, 255, 0.98);
  }
  .login-tab {
    margin-bottom: 35px;
  }
  .login-tab a {
    display: inline-block;
    float: left;
    width: 30%;
    background-color: #ddd;
    text-align: center;
    color: white;
    text-transform: uppercase;
    padding: 5px 0;
  }
  .login-tab a.active {
    background-color: #42B983;
  }
  .login-form {
    width: 460px;
    margin: 120px auto 100px;
    transition: all .15s ease;
  }
  .login-social {
    text-align: center;
    text-transform: uppercase;
    transition: all .2s ease;
  }
  .login-social h3 {
    color: #999;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .login-social .button {
    margin: 10px;
  }
  .login-social i {
    margin-right: 8px;
  }
  .login-social .login-github {
    background-color: black;
  }
  .login-social .login-google {
    background-color: #4d90fe;
  }
  .login-social .login-twitter {
    background-color: #23acee;
  }
  .login-social .login-facebook {
    background-color: #3c5696;
  }
  .login-social .login-weibo {
    background-color: #e32428;
  }
  .fade-enter .login-form {
    margin-top: 300px;
  }
  .fade-leave .login-social {
    opacity: 0;
  }
</style>
