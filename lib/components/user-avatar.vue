<template>
  <a href="/u/{{user.username}}" v-el="el" class="avatar"></a>
</template>
<script>
  var escape = require('../utils').escape;
  var wordColor = require('word-color');
  module.exports = {
    replace: true,
    props: ['user'],
    compiled: function() {
      var user = this.$data.user;
      var span = '<span title="@#1" style="background-color:#2;">#3</span>';
      span = span
        .replace('#1', escape(user.username))
        .replace('#2', wordColor(user.username))
        .replace('#3', escape(user.username.charAt(0).toUpperCase()));
      var el = this.$$.el;
      el.innerHTML = span;
      if (!user.avatar_url) return;
      var key = 'avatar:' + user.avatar_url;
      // it is marked as 404
      if (sessionStorage[key]) return;

      var img = new Image();
      img.src = user.avatar_url;
      img.alt = user.username;
      img.title = '@' + user.username;
      img.onload = function() {
        el.innerHTML = '';
        el.appendChild(img);
      };
      img.onerror = function() {
        sessionStorage[key] = '1';
      };
    }
  };
</script>

<style>
  .avatar {
    display: inline-block;
    text-decoration: none;
    width: 48px;
    height: 48px;
    line-height: 48px;
  }
  .avatar.small {
    width: 36px;
    height: 36px;
    line-height: 36px;
  }
  .avatar:hover {
    opacity: 0.8;
  }
  .avatar span, .avatar img {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
    font-size: 24px;
    border-radius: 3px;
    vertical-align: top;
  }
  .avatar.small span {
    font-size: 18px;
  }
  .avatar.circle span, .avatar.circle img {
    border-radius: 50%;
  }
</style>
