
var Vue = require('vue');
var page = require('page');

var app = new Vue(require('./app.vue'));

function escape(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

Vue.filter('avatar_html', function(user, size) {
  size = size || 48;
  var text;
  if (user.avatar_url) {
    text = '<img src="#1" alt="@#2" class="avatar" height="#3" width="#3">';
  } else {
    text = '<span class="avatar" title="@#2" >#4</span>';
  }
  return text
    .replace(/#1/, encodeURI(user.avatar_url))
    .replace(/#2/, escape(user.username))
    .replace(/#4/, escape(user.username.charAt(0).toUpperCase()))
    .replace(/#3/g, size);
});

page('/', function() {
  app.view = 'home';
});

page('/c/:slug', function(ctx) {
  app.view = 'cafe';
  app.params = ctx.params;
});

page('/t/:id', function(ctx) {
  app.view = 'topic';
  app.params = ctx.params;
});

if (!window.production) {
  page({hashbang: true});
}
