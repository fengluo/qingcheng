<template>
  <div class="header">
    <div class="header-cover cover">
      <div class="header-intro cover-inner">
        <div class="container">
          <h2>ZERQU</h2>
          <p>ZERQU is not a forum, it is an API based application.</p>
        </div>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav>
          <a href="/">Overview</a>
          <a href="/c/">Cafes</a>
          <a href="/u/">Users</a>
        </nav>
      </div>
    </div>
  </div>

  <div class="body" v-show="topics.length">
    <div class="split-view container">
      <div class="main-view">
        <div class="topic-list box-container">
          <div class="topic-filters clearfix">
            <nav class="filter-nav">
              <a href="#">My Feed</a>
              <a href="#">Explore</a>
            </nav>
          </div>
          <ul v-if="topics.length">
            <topic-item v-repeat="topic: topics" track-by="id"></topic-item>
          </ul>
          <div class="load-more" v-if="cursor" v-on="click: fetchTopics(cursor)">
            Load More
          </div>
        </div>
      </div>
    </div>
  </div>

  <logo-loading class="center" v-if="!topics.length"></logo-loading>
</template>

<script>
  var api = require('./api');

  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        cursor: 0,
        topics: []
      }
    },
    methods: {
      fetchTopics: function(cursor) {
        cursor = cursor || this.params.cursor;
        api.timeline(cursor, function(resp) {
          this.cursor = resp.cursor;
          this.topics = this.topics.concat(resp.data);
        }.bind(this));
      }
    },
    compiled: function() {
      document.title = this.$site.name;
      this.fetchTopics();
    },
    components: {
      'topic-item': require('./components/topic-item.vue'),
      'logo-loading': require("./components/logo-loading.vue")
    }
  };
</script>

<style>
.load-more {
  padding: 10px 0;
  text-align: center;
  border-top: 1px solid #eee;
  border-radius: 0 0 3px 3px;
}
.load-more:hover {
  cursor: pointer;
  background-color: #f7f7f8;
}
</style>
