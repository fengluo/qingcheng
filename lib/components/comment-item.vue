<template>
  <li id="c-{{ comment.id }}" class="comment-item clearfix">
    <user-avatar user="{{user}}"></user-avatar>
    <div class="comment-main">
      <div class="comment-info">
        <a href="/u/{{user.username}}">{{user.username}}</a>
        <time datetime="{{ comment.created_at }}">{{ comment.created_at | timeago }}</time>
        #{{ comment.id }}
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
.comment-item {
  color: #565655;
  padding-top: 20px;
  list-style-type: none;
}
.comment-item .comment-main {
  overflow: hidden;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.comment-item .comment-info {
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
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

.comment-content blockquote {
  margin: 0 0 1.64em 0;
  border-left: 3px solid #dadada;
  padding-left: 12px;
  color: #666664;
}
.comment-content pre {
  margin: 1.64em 0;
  padding: 7px;
  border: none;
  border-left: 3px solid #dadada;
  padding-left: 10px;
  overflow: auto;
  line-height: 1.5;
  font-size: 0.96em;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  color: #4c4c4c;
  background-color: #f9f9f7;
}
</style>
