<template>
  <div class="body cafe-list" v-if="!fetching">
    <div class="section container" v-if="following.length">
      <h2 class="section-title">Following</h2>
      <div class="cafe-cards clearfix">
        <cafe-item v-repeat="cafe: following" track-by="id"></cafe-item>
      </div>
    </div>

    <div class="section container">
      <h2 class="section-title">Cafes</h2>
      <div class="cafe-cards">
        <cafe-item v-repeat="cafe: cafes" track-by="id"></cafe-item>
      </div>
    </div>
  </div>
  <logo-loading class="center" v-if="fetching"></logo-loading>
</template>

<script>
var api = require('./api');

module.exports ={
  replace: true,
  props: ['params'],
  data: function() {
    return {
      fetching: true,
      cursor: 0,
      following: [],
      cafes: []
    }
  },
  compiled: function() {
    api.cafe.list(function(resp) {
      this.fetching = false;
      this.following = resp.following || [];
      this.cafes = this.cafes.concat(resp.data);
      this.cursor = resp.cursor;
    }.bind(this));
  },
  components: {
    'cafe-item': require('./components/cafe-item.vue'),
    'logo-loading': require('./components/logo-loading.vue')
  }
};
</script>

<style>
.cafe-list {
  padding: 40px 0;
}
</style>
