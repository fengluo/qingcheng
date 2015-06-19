<template>
  <div class="header">
    <div class="header-intro">
      <div class="container">
        <h2>ZERQU</h2>
        <p>ZERQU is not a forum, it is an API based application.</p>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav>
          <a href="/">Overview</a>
          <a href="/c/site">Topics</a>
          <a href="/c/about">Cafes</a>
        </nav>
      </div>
    </div>
  </div>

  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <div class="topic-list box-container">
          <div class="topic-filters clearfix">
            <div class="topic-order-by">
              <select>
                <option>Newest</option>
              </select>
            </div>
          </div>
          <logo-loading v-if="!topics.length"></logo-loading>
          <ul v-if="topics.length">
            <topic-item v-repeat="topic: topics" track-by="id"></topic-item>
          </ul>
          <div class="load-more" v-if="cursor">
            <div role="button" v-on="click: fetchTopics(cursor)">Load More</div>
          </div>
        </div>
      </div>
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
        cafe: {},
        cursor: 0,
        topics: [],
        topicsUrl: '/api/topics/timeline'
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
