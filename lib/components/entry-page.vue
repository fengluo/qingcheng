<template>
  <style class="cafe-theme" v-if="cafe.style.color">
    .entry-content a {
      color: {{ cafe.style.color }};
    }
    .entry-content blockquote {
      border-color: {{ cafe.style.color }};
    }
  </style>

  <div class="hentry" v-el="el">
    <div class="entry-cover cover" v-if="topicStyle" v-style="topicStyle">
      <div class="cover-inner">
        <div class="container">
          <h2 class="entry-title">{{ topic.title }}</h2>
        </div>
      </div>
    </div>

    <div class="container" v-if="topic">
      <h2 class="entry-title" v-if="!topicStyle">{{ topic.title }}</h2>
      <div class="entry-meta">
        <a href="/c/{{ cafe.slug }}" aria-label="Published in {{ cafe.name }}">
          <span class="cafe-logo" v-style="cafeStyle"></span>
        </a>
        <time datetime="{{ topic.created_at }}" title="Updated at {{ topic.updated_at }}">{{ topic.created_at| timeago }}</time>
        <a v-if="user" href="/u/{{ user.username }}" aria-label="Published by @{{ user.username }}">@{{ user.username }}</a>
      </div>

      <div class="entry-content yue" v-html="topic.content"></div>

      <div class="entry-actions clearfix">
        <span id="like-button-status" v-if="!topic.liked_by_me">Like this topic</span>
        <span id="like-button-status" v-if="topic.liked_by_me">Toggle off like of this topic</span>
        <button class="white like-button" v-class="liked: topic.liked_by_me" v-on="click: toggleLike" aria-labelledby="like-button-status" aria-pressed="{{topic.liked_by_me|json}}">
          <i class="qc-icon-heart"></i>
          <span>Like it</span>
        </button>
        <div class="more-actions">
          <button class="circle" v-on="click: editTopic" v-if="canEdit">Edit</button>
        </div>
      </div>

      <div class="entry-footer clearfix">
        <div class="topic-cafe column" v-if="cafe.slug">
          <div class="column-title">Published In</div>
          <a href="/c/{{ cafe.slug }}" class="column-header">
            <span class="cafe-logo" v-style="cafeStyle"></span>
            <div class="column-main">
              <strong>{{ cafe.name }}</strong>
            </div>
          </a>
          <p v-html="cafe.description|urlize"></p>
        </div>

        <div class="topic-author column" v-if="user.username">
          <div class="column-title">Created By</div>
          <div class="column-header">
            <user-avatar user="{{ user }}"></user-avatar>
            <a class="column-main" href="/u/{{ user.username }}">
              <strong>{{ user.username }}</strong>
              <div>#{{ user.id }}</div>
            </a>
          </div>
          <p v-html="user.description|urlize"></p>
        </div>
      </div>
    </div>
  </div>

  <div class="overlay" v-if="showTopicForm" v-transition="bounce">
    <div class="overlay-mask" v-on="click: showTopicForm=false"></div>
    <div class="overlay-inner">
      <topic-form v-if="cafe.id" cafe="{{cafe}}" type="update" topic="{{rawTopic}}"></topic-form>
    </div>
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['topic'],
    data: function() {
      return {
        topic: {},
        rawTopic: {},
        showTopicForm: false
      }
    },
    computed: {
      cafe: function() {
        return this.topic.cafe;
      },
      user: function() {
        return this.topic.user;
      },
      canEdit: function() {
        return this.topic.permission.write;
      },
      topicStyle: function() {
        var cover = this.topic.info.cover;
        if (!cover) return null;
        return {'background-image': 'url(' + cover + ')'};
      },
      cafeStyle: function() {
        var style = this.cafe.style;
        var rv = {'background-color': style.color || '#222221'};
        if (style.logo) {
          rv['background-image'] = 'url(' + style.logo + ')';
        }
        return rv;
      },
      shouldBind: function() {
        if (!this.$root.currentUser.id) return false;
        return this.topic.read_by_me !== '100%';
      }
    },
    methods: {
      toggleLike: function() {
        if (!this.$root.currentUser.id) {
          return this.$root.showLogin = true;
        }
        if (this.topic.liked_by_me) {
          api.topic.unlike(this.topic.id, function() {
            this.topic.liked_by_me = false;
          }.bind(this));
        } else {
          api.topic.like(this.topic.id, function() {
            this.topic.liked_by_me = true;
          }.bind(this));
        }
      },
      editTopic: function() {
        if (!this.canEdit) return;
        api.topic.viewRaw(this.topic.id, function(resp) {
          this.rawTopic = resp;
          this.showTopicForm = true;
        }.bind(this));
      },
      progress: function() {
        var viewport = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
        var height = this.$$.el.clientHeight;
        var percent = (window.scrollY + viewport * 0.8) / height * 100;
        return Math.min(Math.round(percent), 100);
      },
      bind: function() {
        var me = this;
        if (!me.shouldBind) return;

        var clock;
        var record = function(e) {
          clearTimeout(clock);
          if (!me.shouldBind) {
            return me.unbind();
          }

          clock = setTimeout(function() {
            var percent = me.progress();
            api.topic.read(me.topic.id, percent, function(resp) {
              me.topic.read_by_me = resp.percent;
            });
          }, 1000);
        };

        me._bindFunc = record;
        window.addEventListener('scroll', record)
      },
      unbind: function() {
        if (this._bindFunc) {
          window.removeEventListener('scroll', this._bindFunc);
          this._bindFunc = null;
        }
      }
    },
    attached: function() {
      this.bind();
    },
    detached: function() {
      this.unbind();
    },
    components: {
      'topic-form': require('./topic-form.vue'),
      'user-avatar': require('./user-avatar.vue')
    }
  }
</script>

<style>
  .hentry .cafe-logo {
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .hentry .entry-title {
    margin: 0;
    padding-top: 60px;
    padding-bottom: 10px;
    font-weight: 400;
    font-size: 42px;
    line-height: 1;
    color: #222223;
  }
  .entry-cover {
    height: 340px;
    margin-bottom: 20px;
  }
  .entry-cover .entry-title {
    color: white;
    padding-bottom: 1em;
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
  .entry-actions {
    margin-top: 2em;
  }
  .entry-actions .like-button {
    outline: none;
    font-size: 16px;
  }
  .entry-actions .like-button .qc-icon-heart {
    margin-right: 4px;
  }
  .entry-actions .liked .qc-icon-heart {
    color: red;
  }
  .entry-actions .more-actions {
    float: right;
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
  .entry-footer .column-main {
    overflow: hidden;
  }
  .column-header .cafe-logo, .column-header .avatar {
    float: left;
    width: 48px;
    height: 48px;
    line-height: 48px;
    margin-right: 10px;
  }
  #like-button-status {
    display: none;
  }
</style>
