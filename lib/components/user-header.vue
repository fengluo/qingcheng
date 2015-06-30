<template>
  <div class="header">
    <div class="header-cover cover">
      <div class="header-intro cover-inner">
        <div class="container">
          <h2>{{ user.username }}</h2>
          <p v-html="user.description|urlize"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  replace: true,
  props: ['user']
}
</script>
