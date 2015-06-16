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
          <div v-if="cursor">
            <a href="/c/{{ params.slug }}/{{ cursor }}" v-on="click: fetchTopics(cursor)">load more</a>
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
  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        cafe: {},
        cursor: null,
        topics: []
      }
    },
    computed: {
      cafeUrl: function() {
        return '/api/cafes/' + this.params.slug;
      },
      topicsUrl: function() {
        return this.cafeUrl + '/topics';
      }
    },
    watch: {
      'params.slug': function() {
        this.clean();
        this.fetchCafe();
        this.fetchTopics();
      }
    },
    methods: {
      clean: function() {
        this.topics = [];
        this.cursor = null;
      },
      fetchCafe: function() {
        this.$http.get(this.cafeUrl, function(resp) {
          this.cafe = resp;
          console.log(resp);
        });
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
