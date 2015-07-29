<template>
  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <div v-if="canWrite" class="new-topic">
          <user-avatar user="{{ user }}" class="small circle"></user-avatar>
          <a href="javascript:;" role="button" v-on="click: showTopicForm=true">Create a new topic here</a>
        </div>
        <div class="topic-list">
          <ul>
            <topic-item v-repeat="topic: topics" track-by="id"></topic-item>
          </ul>
          <logo-loading class="center" v-if="fetching"></logo-loading>
          <div v-if="pagination" class="pagination clearfix">
            <a class="pagination-prev" v-if="pagination.prev" href="/c/{{ cafe.slug }}?page={{ pagination.prev }}">Prev</a>
            <span class="pagination-prev" v-if="!pagination.prev">Prev</span>

            <a class="pagination-next" v-if="pagination.next" href="/c/{{ cafe.slug }}?page={{ pagination.next }}">Next</a>
            <span class="pagination-next" v-if="!pagination.next">Next</span>
          </div>
        </div>
      </div>

      <div class="sidebar-view" v-if="cafe.id">
        <div class="sidebar-notice" v-if="!canWrite">
          You have no permission in writing here.
        </div>

        <div class="widget" v-if="isAdmin">
          <h3 class="widget-title">Admin</h3>
          <div class="widget-content">
            <p>You are the admin here.</p>
            <a class="button circle">View Settings</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="overlay" v-if="showTopicForm" v-transition="bounce">
    <div class="overlay-mask" v-on="click: showTopicForm=false"></div>
    <div class="overlay-inner">
      <topic-form v-if="cafe.id" cafe="{{cafe}}" type="create"></topic-form>
    </div>
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['cafe', 'params'],
    data: function() {
      var showTopicForm = location.href.indexOf('?new') !== -1;
      return {
        cafe: {},
        pagination: {},
        showTopicForm: showTopicForm,
        fetching: true,
        topics: []
      }
    },
    computed: {
      user: function() {
        return this.$root.currentUser;
      },
      canWrite: function() {
        var permission = this.cafe.permission || {};
        return permission.write;
      },
      isAdmin: function() {
        var permission = this.cafe.permission || {};
        return permission.admin;
      }
    },
    watch: {
      'params': function(params) {
        if (!params.slug) return;
        this.fetchTopics(params.query.page);
      }
    },
    methods: {
      fetchTopics: function(page) {
        this.fetching = true;
        api.cafe.topics(this.cafe.slug, page, function(resp) {
          if (resp.pagination.pages > 1) {
            this.pagination = resp.pagination;
          } else {
            this.pagination = null;
          }
          this.topics = resp.data;
          this.fetching = false;
        }.bind(this));
      },
    },
    components: {
      'topic-item': require('./topic-item.vue'),
      'topic-form': require('./topic-form.vue'),
      'user-avatar': require('./user-avatar.vue'),
      'logo-loading': require('./logo-loading.vue')
    }
  }
</script>

<style>
  .new-topic {
    height: 6em;
    padding: 5px 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .new-topic .avatar {
    margin-right: 12px;
  }
  .new-topic a {
    color: #999;
  }
  .pagination {
    padding: 5px 10px;
  }
  .pagination-prev {
    float: left;
  }
  .pagination-next {
    float: right;
  }
  .pagination a, .pagination span {
    display: inline-block;
    padding: 5px 14px;
  }
  .pagination a {
    cursor: pointer;
  }
  .pagination span {
    cursor: not-allowed;
    color: #999;
  }
</style>
