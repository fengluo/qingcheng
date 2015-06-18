<template>
  <div class="overlay">
    <div class="login-mask overlay-mask" v-on="click: show=false"></div>
    <div class="login-form">
      <form action="/session" method="post">
        <input type="text" name="username">
        <input type="password" name="password">
      </form>
    </div>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['show'],
    data: function() {
      return {
        show: true
      };
    },
    compiled: function() {
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
    width: 460px;
    height: 300px;
    top: 120px;
    left: 50%;
    margin-left: -230px;
    z-index: 20;
    background-color: white;
    padding: 18px;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  }
</style>
