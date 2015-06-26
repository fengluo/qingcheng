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

Vue.filter('timeago', function(time) {
  time = new Date(time);
  var delta = parseInt((new Date() - time) / 1000, 10);
  if (delta <= 0) return 'just now';

  var minutes = delta / 60;
  if (minutes < 1) return 'less than a minute ago';
  if (minutes < 2) return 'about a minute ago';

  var hours = minutes / 60;
  if (hours < 1) return parseInt(minutes, 10) + ' minutes ago';
  if (hours < 1.5) return 'about an hour ago';

  var days = hours / 24;
  if (days < 1) return Math.round(hours) + ' hours ago';
  if (days < 7) return parseInt(days, 10) + ' days ago';

  var month = time.getMonth();
  if (month < 10) month = '0' + month;
  var date = time.getDate();
  if (date < 10) date = '0' + date;
  return [time.getFullYear(), month, date].join('-');
});

Vue.filter('urlize', function(text) {
  if (!text) return '';
  var pattern = /https?:\/\/[^\s<]+[^<.,:;"')\]\s]/g;
  return text.replace(pattern, function(u) {
    var t = u.replace('http://', '');
    return '<a href="' + u + '">' + t + '</a>';
  });
});

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
