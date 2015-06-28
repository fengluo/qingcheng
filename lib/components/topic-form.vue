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
        content: '',
        feature_type: '',
        feature_value: ''
      };
    },
    computed: {
      user: function() {
        return this.$root.currentUser;
      },
      prefix: function() {
        return prefix = this.cafe.slug + ':topic:';
      }
    },
    methods: {
      cleanData: function() {
        this.title = '';
        this.content = '';
      },
      dismiss: function() {
        this.$parent.showTopicForm = false;
      },
      formSubmit: function(e) {
        e.preventDefault();
        var payload = {
          title: this.title,
          content: this.content,
          feature_type: this.feature_type,
          feature_value: this.feature_value,
        };
        api.cafe.newTopic(this.cafe.slug, payload, function(resp) {
          this.cleanData();
          resp.user = this.user;
          this.$parent.topics = [resp].concat(this.$parent.topics);
          this.dismiss();
        }.bind(this))
      }
    },
    compiled: function() {
      this.title = localStorage[this.prefix + 'title'] || '';
      this.content = localStorage[this.prefix + 'content'] || '';
    },
    detached: function() {
      localStorage[this.prefix + 'title'] = this.title;
      localStorage[this.prefix + 'content'] = this.content;
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
