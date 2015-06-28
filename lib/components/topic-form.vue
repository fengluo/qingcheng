<template>
  <form class="topic-form" v-on="submit: formSubmit" v-el="form">
    <div class="form-description">
      New topic in <a href="/c/{{ cafe.slug }}"/>{{ cafe.name }}</a>
    </div>
    <div class="form-field">
      <input placeholder="Your topic title" v-model="title">
    </div>
    <div class="form-field">
      <textarea placeholder="What is in your mind" v-model="content"></textarea>
    </div>
    <div class="form-submit">
      <button v-if="user.id">Create</button>
    </div>
    <div class="markdown-help">
    </div>
  </form>
</template>

<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['cafe'],
    data: function() {
      return {
        title: '',
        content: ''
      };
    },
    computed: {
      user: function() {
        return this.$root.currentUser;
      }
    },
    methods: {
      formSubmit: function() {
        console.log(this.$data);
      }
    },
    compiled: function() {
      var prefix = this.cafe.slug + ':topic:';
      this.title = localStorage[prefix + 'title'] || '';
      this.content = localStorage[prefix + 'content'] || '';
    },
    detached: function() {
      var prefix = this.cafe.slug + ':topic:';
      localStorage[prefix + 'title'] = this.title;
      localStorage[prefix + 'content'] = this.content;
      document.body.classList.remove('no-scroll');
    },
    attached: function() {
      document.body.classList.add('no-scroll');
    }
  }
</script>

<style>
.topic-form {
  padding: 40px 110px 20px;
}
.topic-form .form-field textarea {
  border: none;
  height: 24em;
}
.topic-form .form-field input, .topic-form .form-field textarea {
  font-family: "Georgia", "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", "SimSun", sans-serif;
}
</style>
