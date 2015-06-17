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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        cafe: {},
        cursor: null,
        topics: [],
        topicsUrl: '/api/topics/timeline'
      }
    },
    methods: {
      clean: function() {
        this.topics = [];
        this.cursor = null;
      },
      fetchTopics: function(cursor) {
        cursor = cursor || this.params.cursor;
        var url = this.topicsUrl;
        if (cursor) {
          url += '?cursor=' + cursor;
        }
        this.$http.get(url, function(resp) {
          this.cursor = resp.cursor;
          this.topics = this.topics.concat(resp.data);
        });
      }
    },
    compiled: function() {
      this.fetchTopics();
    },
    components: {
      'topic-item': require('./components/topic-item.vue'),
      'logo-loading': require("./components/logo-loading.vue")
    }
  };
</script>
