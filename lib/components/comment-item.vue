<template>
  <li id="c-{{ comment.id }}" class="comment-item clearfix">
    <user-avatar user="{{user}}"></user-avatar>
    <div class="comment-main">
      <div class="comment-info">
        <a href="/u/{{user.username}}">{{user.username}}</a>
        <time datetime="{{ comment.created_at }}">{{ comment.created_at | timeago }}</time>
        #{{$index + 1}}
      </div>
      <div class="comment-content" v-html="comment.content"></div>
    </div>
  </li>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['comment'],
    computed: {
      user: function() {
        return this.comment.user;
      }
    },
    components: {
      'user-avatar': require('./user-avatar.vue')
    }
  }
</script>

<style>
.comment-list ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.comment-item {
  margin-bottom: 20px;
  color: #565655;
}
.comment-item .comment-main {
  overflow: hidden;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.comment-item .comment-info {
  font-size: 13px;
  color: #999;
  margin-bottom: 14px;
  line-height: 1;
}
.comment-item .comment-content {
  line-height: 1.4;
  font-size: 16px;
  margin-bottom: 10px;
}
.comment-item .avatar {
  float: left;
  margin-right: 12px;
  margin-left: -48px;
  width: 40px;
  height: 40px;
  line-height: 40px;
}
</style>
