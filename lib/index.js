require('./css/base.css');
require('./css/ui.css');
require('./css/animate.css');
require('./css/yue.css');

var Vue = require('vue');
var page = require('page');

// site configuration
var zerqu = window.ZERQU || {};

Object.defineProperty(Vue.prototype, '$site', {
  get: function() {
    return zerqu.site || {name: 'ZERQU'};
  }
});

// register filters
var filters = require('./filters');
Object.keys(filters).forEach(function(k) {
  Vue.filter(k, filters[k]);
})

var app = new Vue(require('./app.vue'));
app.message = require('./utils').messageFactory(app);
Vue.app = app;

// register api plugin
require('./api').register(app);


function handle(view) {
  return function(ctx) {
    app.view = view;
    app.params = ctx.params;
  };
}

page('/', handle('home'));
page('/t/:topicId', handle('topic'));

page('/c/', handle('cafe-list'));
page('/c/:slug', handle('cafe'));
page('/c/:slug/members', function(ctx) {
  app.view = 'cafe';
  app.params = ctx.params;
  app.params.subview = 'cafe-user-list';
});

page('/u/', handle('user-list'));
page('/u/:username', handle('user'));

if (!zerqu.production) {
  page({hashbang: true});
} else {
  page();
}
