
var Vue = require('vue');

// Vue plugins
Vue.use(require('vue-resource'));

var page = require('page');

// site configuration
var zerqu = window.ZERQU || {};

var app = new Vue(require('./app.vue'));
app.site = zerqu.site || {};

Vue.filter('timeago', require('timeago'));

function handle(view) {
  return function(ctx) {
    app.view = view;
    app.params = ctx.params;
  };
}

page('/', handle('home'));
page('/t/:id', handle('topic'));

page('/c/', handle('cafe-list'));
page('/c/:slug/:page(\\d+)?', handle('cafe'));

page('/u/', handle('user-list'));
page('/u/:username', handle('user'));

if (!zerqu.production) {
  page({hashbang: true});
} else {
  page();
}
