<template>
  <li id="c-{{ comment.id }}" class="comment-item item-container" v-show="comment.id" v-transition="fade" v-class="comment-hide: isHide">
    <user-avatar user="{{user}}"></user-avatar>
    <div class="comment-main item-content">
      <div class="comment-info">
        <a href="/u/{{user.username}}">{{user.username}}</a>
        <time datetime="{{ comment.created_at }}">{{ comment.created_at | timeago }}</time>
        #{{ comment.id }}
        <div class="comment-actions">
          <a role="button" href="javascript:;" v-if="!isOwner" v-on="click: flagComment" aria-label="report spam"><i class="qc-icon-flag"></i></a>
          <a role="button" href="javascript:;" v-if="isOwner" v-on="click: deleteComment" aria-label="delete comment"><i class="qc-icon-bin"></i></a>
        </div>
      </div>
      <div class="comment-content" v-html="content"></div>
    </div>
  </li>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['comment'],
    computed: {
      user: function() {
        return this.comment.user;
      },
      isOwner: function() {
        return this.$root.currentUser.id === this.user.id;
      },
      isHide: function() {
        return this.comment.flag_count > 5;
      },
      content: function() {
        var content = this.comment.content;
        content = content.replace(/(>|\s)@(\w+)/, '$1<a href="/u/$2">@$2<\/a>');
        return content;
      }
    },
    methods: {
      deleteComment: function() {
        if (confirm('Are you sure to delete this comment?')) {
          api.comment.delete(this.comment, function() {
            this.comment.id = null;
            this.$parent.topic.comment_count -= 1;
          }.bind(this));
        }
      },
      flagComment: function() {
        if (confirm('Are you sure to report this comment?')) {
          api.comment.flag(this.comment)
        }
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
    padding-top: 14px;
    padding-bottom: 10px;
    list-style-type: none;
  }
  .comment-item .comment-info {
    position: relative;
    font-size: 13px;
    color: #999;
    margin-bottom: 10px;
    line-height: 1;
  }
  .comment-item .comment-actions {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 13px;
    transition: all .2s ease;
    opacity: 0.2;
  }
  .comment-item:hover .comment-actions {
    opacity: 1;
  }
  .comment-item .comment-actions [role=button] {
    color: #999;
    cursor: pointer;
  }
  .comment-item .comment-content {
    line-height: 1.4;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .comment-content p {
    margin: 10px 0;
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
  .comment-hide {
    opacity: 0.2;
  }
  .comment-hide .comment-content {
    font-size: 14px;
  }
</style>
