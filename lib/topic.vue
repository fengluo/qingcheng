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
  <div class="hentry">
    <div class="container yue">
        <h2 class="entry-title">Topic view</h2>
        <p>{{ params|json }}</p>
    </div>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['params']
  };
</script>

<style>
.hentry {
  padding: 20px 0;
}
.hentry .container {
  max-width: 680px;
  padding: 10px 20px;
  background-color: white;
}
.hentry .entry-title {
  margin-top: 0;
  border-bottom: 1px solid #ddd;
}
</style>
