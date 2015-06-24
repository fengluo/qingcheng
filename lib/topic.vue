<template>
  <div class="entry-view">
    <entry-page v-if="topic.id" topic="{{ topic }}"></entry-page>
  </div>
  <div class="entry-view comment-box">
    <div class="container">
      <form class="comment-form" disabled>
        <div class="comment-form-mask" v-on="click: showLogin" v-if="!currentUser.id"></div>
        <textarea placeholder="Comment here" v-model='commentInput' v-on="keydown: submit"></textarea>
        <button v-if="currentUser.id" v-on="click: submit">Reply</button>
      </form>
      <ul v-if="comments.length">
        <comment-item v-repeat="comment: comments" track-by="id"></comment-item>
        <li class="more-comments" v-if="cursor" v-on="click: fetchComments(null, cursor)">Load More</li>
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
        comments: [],
        cursor: 0,
        commentInput: '',
        params: {}
      };
    },
    computed: {
      currentUser: function() {
        return this.$root.currentUser;
      }
    },
    watch: {
      'params.topicId': function(id) {
        if (!id) return;
        this.fetchTopic(id);

        // load comments
        this.comments = [];
        this.cursor = 0;
        this.fetchComments(id);
      }
    },
    methods: {
      fetchTopic: function(id) {
        // clean
        this.topic = {};

        id = id || this.params.topicId;
        api.topic.view(id, function(resp) {
          document.title = this.$site.name + ' — ' + resp.title;
          this.topic = resp;
        }.bind(this));
      },
      fetchComments: function(id, cursor) {
        id = id || this.params.topicId;
        cursor = cursor || this.commentCursor;
        api.topic.comments(id, cursor, function(resp) {
          this.comments = this.comments.concat(resp.data);
          this.cursor = resp.cursor;

          var count = this.topic.comment_count;
          if (count && this.comments.length === count) {
            this.cursor = 0;
          }
        }.bind(this));
      },
      submit: function(e) {
        if (e.type === 'keydown') {
          if (e.keyCode !== 13) return;
          var mac = /mac/i.test(navigator.userAgent);
          if ((mac && !e.metaKey) || (!mac && !e.ctrlKey)) return;
        }
        e.preventDefault();

        var content = this.commentInput.trim();
        if (!content) return;

        this.commentInput = '';
        api.topic.reply(this.params.topicId, content, function(resp) {
          this.comments = [resp].concat(this.comments);
        }.bind(this));
      },
      showLogin: function() {
        this.$root.showLogin = true;
      }
    },
    components: {
      'entry-page': require('./components/entry-page.vue'),
      'comment-item': require('./components/comment-item.vue')
    }
  };
</script>

<style>
  .entry-view .container {
    max-width: 680px;
  }

  .comment-box {
    padding-bottom: 60px;
  }
  .comment-box .comment-form {
    position: relative;
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
  .comment-form textarea:focus {
    height: 12.6em;
  }

  .comment-box ul {
    margin: 0;
    padding: 0;
  }
  .comment-box .more-comments {
    padding: 8px 0;
    text-align: center;
    color: #999;
    margin-top: -1px;
    background-color: #f0f0f0;
    list-style-type: none;
    cursor: pointer;
  }
  .comment-box .more-comments:hover {
    background-color: #dadada;
  }
</style>
