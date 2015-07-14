<template>
  <div class="header">
    <div class="header-cover cover">
      <div class="header-intro cover-inner">
        <div class="item-container container">
          <user-avatar user="{{ user }}" v-if="user.username"></user-avatar>
          <div class="item-content">
            <h2>{{ user.username }}</h2>
            <p v-html="user.description|urlize"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  replace: true,
  props: ['user'],
  components: {
    'user-avatar': require('./user-avatar.vue')
  }
}
</script>
