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
Vue.filter('timeago', require('timeago'));
Vue.filter('urlize', function(text) {
  if (!text) return '';
  var pattern = /https?:\/\/[^\s<]+[^<.,:;"')\]\s]/g;
  return text.replace(pattern, function(u) {
    var t = u.replace('http://', '');
    return '<a href="' + u + '">' + t + '</a>';
  });
});

var app = new Vue(require('./app.vue'));
// attach app on Vue
Vue.app = app;
Vue.message = require('./utils').messageFactory(app);

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
page('/c/:slug/:page(\\d+)?', handle('cafe'));

page('/u/', handle('user-list'));
page('/u/:username', handle('user'));

if (!zerqu.production) {
  page({hashbang: true});
} else {
  page();
}
