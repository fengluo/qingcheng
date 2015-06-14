<template>
  <div class="header">
    <div class="header-intro">
      <div class="container">
        <h2>{{ cafe.title }}</h2>
        <p>{{ cafe.description }}</p>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav>
          <a href="/c/1">Topics</a>
          <a href="/c/1?sort=new">New</a>
          <a href="/c/1">Members</a>
        </nav>
        <div class="header-actions">
          <a class="button" href="#">Follow</a>
          <a class="button" href="#">New Topic</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  replace: true,
  props: ['cafe']
}
</script>
