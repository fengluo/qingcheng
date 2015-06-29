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
          <button class="follow-button" v-class="following-button: following" v-on="click: toggleFollow">
            <span class="follow-fg">
              <i class="qc-icon-star-empty"></i>
              Follow
            </span>
            <span class="unfollow-fg">
              <i class="qc-icon-star-full"></i>
              Following
            </span>
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
    },
    toggleFollow: function() {
      if (this.following) {
        this.unfollow();
      } else {
        this.follow();
      }
    }
  }
}
</script>

<style>
.follow-button {
  min-width: 10em;
  transition: background-color .2s ease;
}
.unfollow-bg, .unfollow-fg {
  display: none;
}
.following-button .follow-fg {
  display: none;
}
.following-button .unfollow-fg {
  display: inline;
}
.following-button:hover {
  background-color: #FF4444;
}
.following-button:hover .unfollow-bg {
  display: inline;
}
.following-button:hover .unfollow-fg {
  display: none;
}
</style>
