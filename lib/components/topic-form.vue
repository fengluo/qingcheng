<template>
  <form class="topic-form" v-on="submit: formSubmit" v-el="form">
    <div class="form-description">
      New topic in <a href="/c/{{ cafe.slug }}"/>{{ cafe.name }}</a>
    </div>
    <div class="form-field">
      <input placeholder="Your topic title" v-model="title" v-el="title">
    </div>
    <div class="form-field clearfix">
      <a class="markdown-logo" v-class="fade-markdown-logo: hasContent" title="Writing in Markdown" href="#" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="32" viewBox="0 0 208 128"><mask id="a"><rect width="100%" height="100%" fill="#fff"/><path d="M30 98v-68h20l20 25 20-25h20v68h-20v-39l-20 25-20-25v39zM155 98l-30-33h20v-35h20v35h20z"/></mask><rect width="100%" height="100%" ry="15" mask="url(#a)"/></svg>
      </a>
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
  var shake = require('../utils').shake;
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
      },
      hasContent: function() {
        return this.title || this.content;
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
          title: this.title.trim(),
          content: this.content.trim(),
          feature_type: this.feature_type,
          feature_value: this.feature_value,
        };
        if (!payload.title || !payload.content) {
          return shake(this.$$.form);
        }
        api.cafe.newTopic(this.cafe.slug, payload, function(resp) {
          this.cleanData();
          this.$parent.topics = [resp].concat(this.$parent.topics);
          this.dismiss();
        }.bind(this))
      }
    },
    compiled: function() {
      this.title = localStorage[this.prefix + 'title'] || '';
      this.content = localStorage[this.prefix + 'content'] || '';
      console.log('compile')
    },
    detached: function() {
      localStorage[this.prefix + 'title'] = this.title;
      localStorage[this.prefix + 'content'] = this.content;
      document.body.classList.remove('no-scroll');
    },
    attached: function() {
      document.body.classList.add('no-scroll');
      console.log('attached')
    },
    ready: function() {
      var el = this.$$.title;
      setTimeout(function() {
        el.focus();
      }, 20);
    }
  }
</script>

<style>
.topic-form {
  padding: 40px 110px 20px;
}
.topic-form .markdown-logo {
  float: left;
  display: block;
  margin-left: -75px;
  opacity: 0.84;
  transition: all .2s ease;
}
.topic-form .fade-markdown-logo {
  opacity: 0.08;
}
.topic-form .markdown-logo:hover {
  opacity: 1;
}
.topic-form .form-field textarea {
  border: none;
  height: 24em;
}
.topic-form .form-field input, .topic-form .form-field textarea {
  font-family: "Georgia", "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", "SimSun", sans-serif;
}
</style>
