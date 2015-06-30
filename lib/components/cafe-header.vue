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
        <div class="header-actions" v-if="showFollowing">
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
  data: function() {
    return {loading: false};
  },
  computed: {
    showFollowing: function() {
      return this.cafe.id && this.$root.currentUser.id;
    },
    style: function() {
      var style = this.cafe.style;
      if (!style || !style.cover) return {};
      return {'background-image': 'url(' + style.cover + ')'};
    },
    following: function() {
      return this.cafe.membership != 'visitor';
    }
  },
  methods: {
    follow: function() {
      this.loading = true;
      api.cafe.join(this.cafe.slug, function() {
        this.cafe.membership = 'subscriber';
        this.loading = false;
      }.bind(this));
    },
    unfollow: function() {
      this.loading = true;
      api.cafe.leave(this.cafe.slug, function() {
        this.cafe.membership = 'visitor';
        this.loading = false;
      }.bind(this));
    },
    toggleFollow: function() {
      if (this.loading) return;

      if (this.following) {
        this.unfollow();
        this.cafe.membership = 'visitor';
      } else {
        this.follow();
        this.cafe.membership = 'subscriber';
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
