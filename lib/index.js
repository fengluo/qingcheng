
var Vue = require('vue');
var page = require('page');

var app = new Vue(require('./app.vue'));

Vue.filter('timeago', require('timeago'));

function handle(view) {
  return function(ctx) {
    app.view = view;
    app.params = ctx.params;
  }
}

page('/', handle('home'));
page('/t/:id', handle('topic'));
page('/c/:slug', handle('cafe'));
page('/u/:username', handle('user'));

if (!window.production) {
  page({hashbang: true});
}
