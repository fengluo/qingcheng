<template>
  <form class="topic-form" v-on="submit: formSubmit" v-el="form">
    <div class="form-description">
      Topic in <a href="/c/{{ cafe.slug }}"/>{{ cafe.name }}</a>
    </div>
    <div class="form-field">
      <input placeholder="Your topic title" v-model="topic.title" v-el="title">
    </div>
    <div class="form-field clearfix">
      <a class="markdown-logo" v-class="fade-markdown-logo: hasContent" title="Writing in Markdown" href="http://daringfireball.net/projects/markdown/" tabindex="-1" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="32" viewBox="0 0 208 128"><mask id="a"><rect width="100%" height="100%" fill="#fff"/><path d="M30 98v-68h20l20 25 20-25h20v68h-20v-39l-20 25-20-25v39zM155 98l-30-33h20v-35h20v35h20z"/></mask><rect width="100%" height="100%" ry="15" mask="url(#a)"/></svg>
      </a>
      <textarea placeholder="What is in your mind" v-model="topic.content"></textarea>
    </div>
    <div class="form-submit" v-if="isLogin">
      <button class="green" v-if="!isUpdate">Create</button>
      <button class="green" v-if="isUpdate">Update</button>
    </div>
  </form>
</template>

<script>
  var api = require('../api');
  var shake = require('../utils').shake;
  module.exports = {
    replace: true,
    props: ['cafe', 'type', 'topic'],
    data: function() {
      return {
        'topic': {
          title: '',
          content: ''
        }
      };
    },
    computed: {
      isLogin: function() {
        return this.$root.currentUser.id;
      },
      isUpdate: function() {
        return this.type === 'update';
      },
      cacheKey: function() {
        return this.cafe.slug + ':topic:';
      },
      hasContent: function() {
        return this.topic.title || this.topic.content;
      }
    },
    methods: {
      emptyTopic: function() {
        return {'title': '', 'content': ''};
      },
      dismiss: function() {
        this.$parent.showTopicForm = false;
      },
      esc: function(e) {
        if (e.keyCode === 27) {
          this.dismiss();
        }
      },
      create: function(slug, payload) {
        api.topic.create(slug, payload, function(resp) {
          this.topic = this.emptyTopic();
          resp.read_count = 0;
          resp.comment_count = 0;
          this.$parent.topics = [resp].concat(this.$parent.topics);
          this.dismiss();
        }.bind(this));
      },
      update: function(payload) {
        api.topic.update(this.topic.id, payload, function(resp) {
          var topic = this.$parent.topic
          Object.keys(resp).forEach(function(key) {
            topic[key] = resp[key];
          });
          this.dismiss();
        }.bind(this));
      },
      formSubmit: function(e) {
        e.preventDefault();
        var payload = this.topic;

        payload.title = payload.title.trim();
        payload.content = payload.content.trim();

        if (!payload.title || !payload.content) {
          return shake(this.$$.form);
        }

        if (this.isUpdate) {
          this.update(payload);
        } else {
          this.create(this.cafe.slug, payload);
        }
      }
    },
    compiled: function() {
      if (this.isUpdate) return;

      var cache = localStorage[this.cacheKey];
      if (cache) {
        this.topic = JSON.parse(cache);
      }
    },
    detached: function() {
      if (!this.isUpdate) {
        localStorage[this.cacheKey] = JSON.stringify(this.topic);
      }
      document.body.classList.remove('no-scroll');
      this.$$.form.removeEventListener('keyup', this.esc);
    },
    attached: function() {
      document.body.classList.add('no-scroll');
      this.$$.form.addEventListener('keyup', this.esc);
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
  font-family: "Helvetica Neue", "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", "SimSun", sans-serif;
}
</style>
