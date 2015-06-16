<template>
  <div class="header">
    <div class="header-intro">
      <div class="container">
        <h2>ZERQU</h2>
        <p>ZERQU is not a forum, it is an API based application.</p>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav>
          <a href="/">Overview</a>
          <a href="/c/site">Topics</a>
          <a href="/c/about">Cafes</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['params']
  };
</script>
