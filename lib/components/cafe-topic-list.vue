<template>
  <div class="body" v-if="topics.length">
    <div class="split-view container">
      <div class="main-view">
        <div class="topic-list box-container">
          <div class="topic-filters clearfix">
          </div>
          <ul>
            <topic-item v-repeat="topic: topics" track-by="id"></topic-item>
          </ul>
          <div v-if="pagination">
            <a v-if="pagination.next" href="/c/{{ cafe.slug }}?page={{ pagination.next }}">load more</a>
          </div>
        </div>
      </div>

      <div class="sidebar-view" v-if="cafe.id">
        <button class="new-topic" v-if="cafe.permission.write" v-on="click: showTopicForm=true">New topic in this cafe</button>

        <div class="widget box-container">
          <h3 class="widget-title">Widget title</h3>
          <div class="widget-content">
            Here is the content
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="overlay" v-if="showTopicForm" v-transition="bounce">
    <div class="overlay-mask" v-on="click: showTopicForm=false"></div>
    <div class="overlay-inner">
      <topic-form v-if="cafe.id" cafe="{{cafe}}"></topic-form>
    </div>
  </div>
  <logo-loading class="center" v-if="!topics.length"></logo-loading>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['cafe', 'page'],
    data: function() {
      return {
        cafe: {},
        pagination: {},
        showTopicForm: false,
        topics: []
      }
    },
    watch: {
      'cafe.slug': function(slug) {
        if (!slug) return;
        this.fetchTopics();
      },
      'page': function(page) {
        this.fetchTopics(page);
      }
    },
    methods: {
      fetchTopics: function(page) {
        this.topics = [];
        this.pagination = {};
        api.cafe.topics(this.cafe.slug, page, function(resp) {
          this.pagination = resp.pagination;
          this.topics = resp.data;
        }.bind(this));
      },
    },
    components: {
      'topic-item': require('./topic-item.vue'),
      'topic-form': require('./topic-form.vue'),
      'logo-loading': require("./logo-loading.vue")
    }
  }
</script>

<style>
  button.new-topic {
    display: block;
    margin-bottom: 24px;
    box-sizing: border-box;
    font-size: 18px;
    text-decoration: none;
    text-align: center;
    background-color: #42B983;
    box-shadow: 0 3px 0 #36996C;
    color: white;
    font: normal 500 14px/42px "Helvetica Neue", "Arial", sans-serif;
    border-radius: 5px;
  }
</style>
