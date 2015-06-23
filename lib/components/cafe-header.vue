<template>
  <div class="header">
    <div class="header-cover" v-style="style">
      <div class="header-intro">
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
      if (!style) return;

      var rv = {};
      if (style.cover) {
        rv['background-image'] = 'url(' + style.cover + ')';
      }
      this.style = rv;
    }
  }
}
</script>
