<template>
  <div class="header">
    <div class="header-intro">
      <div class="container">
        <h2>{{ user.username }}</h2>
        <p>{{ user.description }}</p>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav>
          <a href="/u/{{user.username}}/topics">Topics</a>
          <a href="/u/{{user.username}}/likes">Likes</a>
          <a href="/u/{{user.username}}/replies">Replies</a>
          <a href="/u/{{user.username}}/cafes">Cafes</a>
        </nav>
      </div>
    </div>
  </div>

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
    }
  };
</script>
