<template>
  <cafe-header></cafe-header>
  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <topic-list topics="{{ topics }}"></topic-list>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        user: {
          username: 'lepture',
          description: 'Love its people, but never trust its government.'
        }
      }
    },
    components: {
      'cafe-header': require('./components/cafe-header.vue')
    }
  };
</script>
