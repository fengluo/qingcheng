<template>
  <li id="t-{{ topic.id }}" class="topic-item clearfix" v-show="topic.id" v-transition="fade">
    <span v-if="cafe" class="cafe-color" v-style="color"></span>
    <span class="user-avatar">
      <user-avatar user="{{user}}"></user-avatar>
    </span>
    <div class="topic-info">
      <a class="topic-title" href="/t/{{topic.id}}">{{topic.title}}</a>
      <div class="explain">
        <time datetime="{{ topic.created_at }}">{{ topic.created_at | timeago }}</time>
        by <a href="/u/{{user.username}}">{{user.username}}</a>
        <span v-if="cafe"> at <a href="/c/{{cafe.slug}}">{{ cafe.name }}</a></span>
      </div>
    </div>
    <div class="topic-counts">
      <div class="count-wrap" v-if="topic.like_count">
        {{ topic.like_count }}<span class="explain">likes</span>
      </div>
      <div class="count-wrap" v-if="!topic.like_count">
        {{ topic.read_count }}<span class="explain">reads</span>
      </div>
      <div class="count-wrap">
        {{ topic.comment_count }}<span class="explain">replies</span>
      </div>
    </div>
  </li>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['topic'],
    computed: {
      cafe: function() {
        return this.topic.cafe;
      },
      user: function() {
        return this.topic.user;
      },
      color: function() {
        var style = this.cafe.style;
        var rv = {};
        if (style.color) {
          rv['background-color'] = style.color;
        }
        return rv;
      }
    },
    components: {
      'user-avatar': require('./user-avatar.vue')
    }
  }
</script>

<style>
  .topic-item {
    list-style-type: none;
    padding: 10px 0;
    position: relative;
  }
  .topic-item .cafe-color {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  .topic-item:hover .cafe-color {
    opacity: 1;
  }
  .topic-item .user-avatar {
    display: inline-block;
    width: 48px;
    height: 48px;
    padding: 0 10px 0 12px;
    vertical-align: top;
  }
  .topic-item .avatar {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }
  .topic-item .topic-info {
    display: inline-block;
    width: 540px;
  }
  .topic-item .topic-title {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    color: #565655;
    line-height: 1.4;
    font-size: 18px;
  }
  .topic-item .topic-title:hover {
    color: #010100;
  }
  .topic-item .topic-counts {
    float: right;
    padding: 0 10px;
    color: #454544;
  }
  .topic-counts .count-wrap {
    display: inline-block;
    text-align: center;
    width: 48px;
  }
  .topic-item .explain {
    display: block;
    color: #999;
    line-height: 1;
    font-size: 13px;
  }
  .topic-item .explain a {
    color: #999;
    text-decoration: none;
    font-weight: 600;
    font-size: 13px;
  }
  .topic-item .explain a:hover {
    color: #666;
  }
</style>
