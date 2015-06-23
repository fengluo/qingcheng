<template>
  <div class="entry-view">
    <entry-page v-if="topic" topic="{{ topic }}"></entry-page>
  </div>
  <div class="entry-view comment-box">
    <div class="container">
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
        params: {}
      };
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
