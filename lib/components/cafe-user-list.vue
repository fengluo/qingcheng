<template>
  <div class="body members">
    <div class="section container" v-if="admins.length">
      <h2 class="section-title">Moderators</h2>
      <ul>
        <li v-repeat="user: admins">
          <user-avatar user="{{user}}"></user-avatar>
          <div class="member-info">
            <a href="/u/{{ user.username }}">{{ user.username }}</a>
            <p>{{ user.description|urlize }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="section container" v-if="members.length">
      <h2 class="section-title">Members</h2>
      <ul>
        <li v-repeat="members">
          <user-avatar user="{{user}}"></user-avatar>
          <div class="member-info">
            <a href="/u/{{ user.username }}">{{ user.username }}</a>
            <div>{{ label }} at <time datetime="{{ created_at }}">{{ created_at|timeago }}</time></div>
          </div>
        </li>
      </ul>
    </div>
    <logo-loading class="center" v-if="!admins.length"></logo-loading>
  </div>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['cafe'],
    data: function() {
      return {
        cafe: {},
        pagination: {},
        admins: [],
        members: []
      }
    },
    watch: {
      'cafe.slug': function(slug) {
        if (!slug) return;
        this.fetchUsers();
      }
    },
    methods: {
      fetchUsers: function(page) {
        api.cafe.users(this.cafe.slug, page, function(resp) {
          this.pagination = resp.pagination;
          this.admins = resp.admins;
          this.members = resp.data;
        }.bind(this));
      }
    },
    components: {
      'user-avatar': require('./user-avatar.vue'),
      'logo-loading': require("./logo-loading.vue")
    }
  }
</script>

<style>
  .members .section {
    padding-top: 10px;
    padding-bottom: 40px;
    color: #565656;
  }
  .members .avatar {
    float: left;
    margin-right: 14px;
  }
  .members .member-info {
    position: relative;
    overflow: hidden;
  }
</style>
