<template>
  <div class="header">
    <div class="header-cover cover" v-style="style">
      <div class="header-intro cover-inner">
        <div class="container">
          <h2>{{ cafe.name }}</h2>
          <p v-html="cafe.description|urlize"></p>
        </div>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav v-if="cafe.slug">
          <a href="/c/{{ cafe.slug }}">Topics</a>
          <a href="/c/{{ cafe.slug }}/members">Members</a>
          <a v-if="cafe.intro" href="/t/{{ cafe.intro }}">Introduction</a>
        </nav>
        <div class="header-actions" v-if="cafe.id">
          <button v-if="!following" v-on="click:follow">Follow</button>
          <button class="unfollow-button" v-if="following" v-on="click:unfollow">
            <span class="unfollow-fg">Following</span>
            <span class="unfollow-bg">Unfollow</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var api = require('../api');
module.exports = {
  replace: true,
  props: ['cafe'],
  computed: {
    style: function() {
      var style = this.cafe.style;
      if (!style || !style.cover) return {};
      return {'background-image': 'url(' + style.cover + ')'};
    },
    following: function() {
      var role = this.cafe.membership;
      if (!role) return false;
      return role != 'visitor';
    }
  },
  methods: {
    follow: function() {
      api.cafe.join(this.cafe.slug, function() {
        this.cafe.membership = 'subscriber';
      }.bind(this));
    },
    unfollow: function() {
      api.cafe.leave(this.cafe.slug, function() {
        this.cafe.membership = 'visitor';
      }.bind(this));
    }
  }
}
</script>

<style>
.unfollow-button {
  width: 9.6em;
  transition: background-color .2s ease;
}
.unfollow-button .unfollow-bg {
  display: none;
}
.unfollow-button:hover {
  background-color: #FF4444;
}
.unfollow-button:hover .unfollow-bg {
  display: inline;
}
.unfollow-button:hover .unfollow-fg {
  display: none;
}

</style>
