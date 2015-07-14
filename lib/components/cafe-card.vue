<template>
  <div id="c-{{ cafe.slug }}" class="cafe-card card">
    <a class="cover" v-style="color" href="{{ link }}">
      <div class="cover-inner">
        <h3 class="card-title">{{ cafe.name }}</h3>
      </div>
    </a>
    <user-avatar user="{{cafe.user}}" class="small circle" v-if="cafe.user"></user-avatar>
    <div class="card-footer">
      <div class="card-description" v-html="description|urlize"></div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['cafe', 'query'],
    computed: {
      link: function() {
        var url = '/c/' + this.cafe.slug;
        if (this.query) {
          url += this.query;
        }
        return url;
      },
      color: function() {
        var style = this.cafe.style;
        var rv = {};
        if (style.color) {
          rv['background-color'] = style.color;
        }
        if (style.cover) {
          rv['background-image'] = 'url(' + style.cover + ')';
        }
        return rv;
      },
      description: function() {
        return this.cafe.description || 'No description'
      }
    },
    components: {
      'user-avatar': require('./user-avatar.vue')
    }
  }
</script>

<style>
.cafe-card {
  position: relative;
  width: 300px;
}
.cafe-card .avatar {
  position: absolute;
  top: 10px;
  right: 10px;
}
.cafe-card .cover {
  height: 120px;
}
</style>
