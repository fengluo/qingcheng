<template>
  <form class="comment-form" v-on="submit: formSubmit" v-el="form">
    <div class="comment-form-mask" v-on="click: showLogin" v-if="!user.id"></div>
    <user-avatar user="{{ user }}" v-if="user.id" class="small circle"></user-avatar>
    <textarea placeholder="Write your response" v-model='comment' v-on="keydown: keybordSubmit" v-class="active: comment.length" aria-label="Write your response"></textarea>
    <button v-if="user.id">Reply</button>
    <span class="comment-form-count" v-if="count" v-html="count"></span>
  </form>
</template>

<script>
  var api = require('../api');
  var shake = require('../utils').shake;
  module.exports = {
    replace: true,
    props: ['topic'],
    data: function() {
      return {
        comment: ''
      };
    },
    computed: {
      user: function() {
        return this.$root.currentUser;
      },
      count: function() {
        var num = 480 - this.comment.length;
        if (num < 20) return '<span class="red">' + num + '</span>';
        if (num < 30) return '<span class="yellow">' + num + '</span>';
        if (num < 60) return num;
        return 0;
      }
    },
    methods: {
      keybordSubmit: function(e) {
        if (e.keyCode !== 13) return;
        var mac = /mac/i.test(navigator.userAgent);
        if ((mac && !e.metaKey) || (!mac && !e.ctrlKey)) return;
        this.postComment();
      },
      formSubmit: function(e) {
        e && e.preventDefault();
        this.postComment();
      },
      postComment: function() {
        var content = this.comment.trim();
        if (!content || 480 - content.length < 0) {
          return shake(this.$$.form);
        }

        this.comment = '';
        var payload = {content: content};
        api.comment.create(this.topic.id, payload, function(resp) {
          this.$parent.comments = [resp].concat(this.$parent.comments);
          this.$parent.topic.comment_count += 1;
        }.bind(this));
      },
      showLogin: function() {
        this.$root.showLogin = true;
      }
    },
    components: {
      'user-avatar': require('./user-avatar.vue'),
    }
  }
</script>

<style>
  .comment-form {
    position: relative;
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .comment-form .comment-form-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: pointer;
    z-index: 9;
  }
  .comment-form .avatar {
    position: absolute;
    top: 6px;
    left: -48px;
    border-radius: 50%;
  }
  .comment-form textarea {
    width: 100%;
    height: 4.2em;
    padding: 10px 0;
    border: none;
    outline: none;
    color: #565656;
    line-height: 1.4;
    resize: none;
    transition: all 0.15s ease;
  }
  .comment-form textarea:focus, .comment-form textarea.active {
    height: 12.6em;
  }
  .comment-form .comment-form-count {
    margin-left: 14px;
    color: #999;
  }
  .comment-form .comment-form-count .yellow {
    color: #FFDC00;
  }
  .comment-form .comment-form-count .red {
    color: #FF4444;
  }
</style>
