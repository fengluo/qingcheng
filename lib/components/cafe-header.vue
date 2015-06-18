<template>
  <div class="header">
    <div class="header-intro" v-style="style">
      <div class="container">
        <h2>{{ cafe.name }}</h2>
        <p>{{ cafe.content }}</p>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav v-if="cafe.slug">
          <a href="/c/{{ cafe.slug }}">Topics</a>
          <a href="/c/{{ cafe.slug }}/members">Members</a>
        </nav>
        <div class="header-actions">
          <a class="button" href="#">Follow</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  replace: true,
  props: ['cafe'],
  data: function() {
    return {
      cafe: {},
      style: {}
    };
  },
  watch: {
    'cafe.style': function(style) {
      this.style = {};
      if (!style) return;

      var rv = {};
      if (style.background_url) {
        rv['background-image'] = 'url(' + style.background_url + ')';
      }
      this.style = rv;
    }
  }
}
</script>
