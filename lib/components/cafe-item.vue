<template>
  <li id="c-{{ cafe.slug }}" class="cafe-item">
    <span class="cafe-color" v-style="color"></span>
    <h3><a href="/c/{{ cafe.slug }}">{{ cafe.name }}</a></h3>
  </li>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['cafe'],
    computed: {
      user: function() {
        return this.cafe.user;
      },
      color: function() {
        var style = this.cafe.style;
        var rv = {};
        if (style.color) {
          rv['background-color'] = style.color;
        }
        return rv;
      }
    },
    components: {
      'user-avatar': require('./user-avatar.vue')
    }
  }
</script>
