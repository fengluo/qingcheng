<template>
  <div class="entry-view" v-show="topic.id">
    <entry-page v-if="topic.id" topic="{{ topic }}"></entry-page>
  </div>
  <div class="entry-view comment-box" v-show="topic.id">
    <div class="container">
      <comment-form v-if="topic.id" topic="{{ topic }}"></comment-form>
      <div class="comment-list-header" v-if="comments.length">{{ topic.comment_count }} responses</div>
      <ul v-if="comments.length">
        <comment-item v-repeat="comment: comments" track-by="id"></comment-item>
        <li class="load-more" v-if="cursor" v-on="click: fetchComments(null, cursor)">Load More</li>
      </ul>
    </div>
  </div>
  <logo-loading class="center" v-if="!topic.id"></logo-loading>
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
      'logo-loading': require('./components/logo-loading.vue'),
      'comment-form': require('./components/comment-form.vue'),
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
  .comment-list-header {
    line-height: 1;
    color: #666;
    padding: 20px 0 6px;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
    font-size: 13px;
  }
</style>
