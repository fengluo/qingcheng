<template>
  <cafe-header cafe="{{ cafe }}"></cafe-header>
  <component is="{{view}}" v-if="cafe.slug"
    cafe="{{cafe}}"
    v-transition
    transition-mode="out-in">
  </component>
</template>

<script>
  var api = require('./api');

  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        cafe: {},
        view: 'cafe-topic-list',
      }
    },
    watch: {
      'params': function(obj) {
        if (!obj.slug) return;
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
      }
    },
    components: {
      'cafe-topic-list': require('./components/cafe-topic-list.vue'),
      'cafe-header': require('./components/cafe-header.vue')
    }
  };
</script>
