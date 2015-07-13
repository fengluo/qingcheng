<template>
  <div id="c-{{ cafe.slug }}" class="cafe-item card">
    <a class="card-cover" v-style="color" href="/c/{{ cafe.slug }}">
      <div class="cover-inner">
        <h3>{{ cafe.name }}</h3>
      </div>
    </a>
    <user-avatar user="{{cafe.user}}"></user-avatar>
    <div class="card-footer">
      <div class="card-description" v-html="description|urlize"></div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['cafe'],
    computed: {
      color: function() {
        var style = this.cafe.style;
        var rv = {};
        if (style.color) {
          rv['background-color'] = style.color;
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
.card {
  position: relative;
  display: inline-block;
  float: left;
  margin: 0 14px 18px 0;
  width: 300px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
.card .avatar {
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  overflow: hidden;
}
.card-cover {
  position: relative;
  display: block;
  height: 120px;
  width: 100%;
}
.card-cover h3 {
  margin: 0;
  padding: 0 14px;
  color: white;
  font-weight: 400;
}
.card-footer {
  height: 40px;
}
.card-footer .card-description {
  padding: 0 10px;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  color: #565655;
  line-height: 40px;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
