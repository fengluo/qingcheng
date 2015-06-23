<template>
  <cafe-header cafe="{{ cafe }}"></cafe-header>
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
          <div v-if="pagination">
            <a v-if="pagination.next" href="/c/{{ params.slug }}/{{ pagination.next }}">load more</a>
          </div>
        </div>
      </div>

      <div class="sidebar-view">
        <a class="new-topic" href="#">New topic in this cafe</a>

        <div class="widget box-container">
          <h3 class="widget-title">Widget title</h3>
          <div class="widget-content">
            Here is the content
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
        pagination: {},
        topics: []
      }
    },
    watch: {
      'params': function(obj) {
        if (!obj.slug) return;
        this.fetchTopics();

        if (this.cafe.slug !== obj.slug) {
          this.fetchCafe();
        }
      }
    },
    methods: {
      fetchCafe: function() {
        this.cafe = {slug: this.params.slug};
        api.cafe.profile(this.params.slug, function(resp) {
          this.cafe = resp;
          document.title = this.$site.name + ' — ' + this.cafe.name;
        }.bind(this));
      },
      fetchTopics: function(page) {
        this.topics = [];
        this.pagination = {};
        page = page || this.params.page;
        api.cafe.topics(this.params.slug, page, function(resp) {
          this.pagination = resp.pagination;
          this.topics = resp.data;
        }.bind(this));
      }
    },
    components: {
      'topic-item': require('./components/topic-item.vue'),
      'cafe-header': require('./components/cafe-header.vue'),
      'logo-loading': require("./components/logo-loading.vue")
    }
  };
</script>

<style>
  a.new-topic {
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
