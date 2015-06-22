<template>
  <div class="entry-view">
    <div class="hentry container">
      <h2 class="entry-title">{{ topic.title }}</h2>
      <div class="entry-meta">
        <a v-if="cafe" href="/c/{{ cafe.slug }}" title="Published in {{ cafe.name }}">
          <span class="cafe-logo" v-style="cafeStyle"></span>
          {{ cafe.name }}
        </a>
        <time datetime="{{ topic.created_at }}" title="Updated at {{ topic.updated_at }}">{{ topic.created_at| timeago }}</time>
        <a v-if="user" href="/u/{{ user.username }}" title="Published by @{{ user.username }}">@{{ user.username }}</a>
      </div>
      <div class="content yue" v-html="topic.content"></div>
      <div class="entry-footer clearfix">
        <div class="topic-cafe column" v-if="cafe.slug">
          <div class="column-title">Published In</div>
          <a href="/c/{{ cafe.slug }}" class="column-header">
            <span class="cafe-logo" v-style="cafeStyle"></span>
            <div class="column-header-content">
              <strong>{{ cafe.name }}</strong>
            </div>
          </a>
          <p v-html="cafe.content|urlize"></p>
        </div>
        <div class="topic-author column" v-if="user.username">
          <div class="column-title">Created By</div>
          <div class="column-header">
            <user-avatar user="{{ user }}"></user-avatar>
            <a class="column-header-content" href="/u/{{ user.username }}">
              <strong>{{ user.username }}</strong>
              <div>#{{ user.id }}</div>
            </a>
          </div>
          <p v-html="user.description|urlize"></p>
        </div>
      </div>
    </div>
  </div>
  <div class="entry-view comment-list">
    <div class="container">
      <ul v-if="comments.length">
        <comment-item v-repeat="comment: comments" track-by="id"></comment-item>
      </ul>
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
        topic: {},
        cafe: {},
        user: {},
        comments: [],
        cafeStyle: {},
        commentCursor: 0,
        params: {}
      };
    },
    watch: {
      'params.topicId': function(id) {
        if (!id) return;
        this.fetchTopic(id);

        // load comments
        this.comments = [];
        this.commentCursor = 0;
        this.fetchComments(id);
      }
    },
    methods: {
      fetchTopic: function(id) {
        id = id || this.params.topicID;
        api.topic.view(id, function(resp) {
          this.topic = resp;
          this.cafe = resp.cafe;
          this.user = resp.user;
          var style = resp.cafe.style;
          this.cafeStyle = {'background-color': style.color || '#222221'};
          if (style.logo) {
            this.cafeStyle['background-image'] = 'url(' + style.logo + ')';
          }
        }.bind(this));
      },
      fetchComments: function(id, cursor) {
        id = id || this.params.topicID;
        cursor = cursor || this.commentCursor;
        api.topic.comments(id, cursor, function(resp) {
          this.comments = this.comments.concat(resp.data);
          console.log(resp);
          this.commentCursor = resp.cursor;
        }.bind(this));
      }
    },
    components: {
      'user-avatar': require('./components/user-avatar.vue'),
      'comment-item': require('./components/comment-item.vue')
    }
  };
</script>

<style>
  .entry-view .container {
    max-width: 680px;
  }
  .cafe-logo {
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .hentry {
    padding: 60px 0;
  }
  .hentry .entry-title {
    margin: 0;
    padding-bottom: 10px;
    font-weight: 400;
    font-size: 42px;
    line-height: 1;
    color: #222223;
  }
  .entry-meta {
    font-size: 14px;
    line-height: 2em;
    color: #999;
    padding: 10px 0;
  }
  .entry-meta time {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  .entry-meta .cafe-logo {
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.2em;
  }
  .entry-footer {
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    margin-top: 20px;
  }
  .entry-footer .column {
    float: left;
    width: 46%;
    padding-bottom: 20px;
    line-height: 1.2;
  }
  .entry-footer .column-title {
    padding: 6px 0 14px;
    color: #999;
    font-size: 13px;
    text-transform: uppercase;
  }
  .entry-footer .column p {
    margin: 10px 0 0 0;
    line-height: 1.2;
    color: #666;
  }
  .entry-footer .topic-cafe {
    margin-right: 8%;
  }
  .entry-footer .column-header {
    display: block;
    overflow: hidden;
  }
  .entry-footer .column-header-content {
    overflow: hidden;
  }
  .column-header .cafe-logo, .column-header .avatar {
    float: left;
    width: 48px;
    height: 48px;
    line-height: 48px;
    margin-right: 10px;
  }
</style>
