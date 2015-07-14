<template>
  <div class="header">
    <div class="header-cover cover">
      <div class="header-intro cover-inner">
        <div class="container">
          <h2>{{ $site.name }}</h2>
          <p>{{ $site.description }}</p>
        </div>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav>
          <a href="/">Overview</a>
          <a href="/c/">Cafes</a>
        </nav>
      </div>
    </div>
  </div>

  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <div class="topic-list">
          <ul>
            <topic-item v-repeat="topic: topics" track-by="id"></topic-item>
          </ul>
          <logo-loading class="center" v-if="fetching"></logo-loading>
          <div class="load-more" v-if="cursor" v-on="click: fetchTopics(cursor)">
            Load More
          </div>
        </div>
      </div>
      <div class="sidebar-view">
        <div class="widget">
          <button class="green" v-on="click: showCafeCards=true" v-if="user.id">New Topic</button>
        </div>
        <div class="site-sidebar" v-html="sidebar" v-if="sidebar"></div>
      </div>
    </div>
  </div>

  <div class="overlay cafe-overlay" v-if="showCafeCards">
    <div class="overlay-mask" v-on="click: showCafeCards=false"></div>
    <div class="overlay-inner">
      <h3>Choose a cafe</h3>
      <cafe-card v-repeat="cafe: cafes" track-by="id" query="?new"></cafe-card>
    </div>
  </div>
</template>

<script>
  var api = require('./api');
  var zerqu = window.ZERQU || {};

  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        fetching: true,
        cursor: 0,
        sidebar: zerqu.sidebar,
        showCafeCards: false,
        topics: []
      }
    },
    computed: {
      user: function() {
        return this.$root.currentUser;
      },
      cafes: function() {
        var rv = [];
        var keys = {};
        this.topics.forEach(function(t) {
          if (!keys[t.cafe.slug]) {
            keys[t.cafe.slug] = 1;
            rv.push(t.cafe);
          }
        });
        return rv;
      }
    },
    methods: {
      fetchTopics: function(cursor) {
        this.fetching = true;
        cursor = cursor || this.params.cursor;
        api.timeline(cursor, function(resp) {
          this.cursor = resp.cursor;
          this.topics = this.topics.concat(resp.data);
          this.fetching = false;
        }.bind(this));
      }
    },
    compiled: function() {
      document.title = this.$site.name;
      this.fetchTopics();
    },
    components: {
      'topic-item': require('./components/topic-item.vue'),
      'cafe-card': require('./components/cafe-card.vue'),
      'logo-loading': require("./components/logo-loading.vue")
    }
  };
</script>

<style>
.cafe-overlay .card {
  width: 260px;
}
.cafe-overlay h3 {
  color: #999;
  font-weight: 400;
  font-size: 18px;
  margin: 40px 0 30px;
}
</style>
