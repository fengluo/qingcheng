
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


var app = new Vue(require('./app.vue'));
// register api plugin
require('./api').register(app);
// load currentUser
var currentUser = sessionStorage['zq:user'];
if (currentUser) {
  try {
    currentUser = JSON.parse(currentUser);
  } catch(e) {
    delete sessionStorage['zq:user'];
    currentUser = {};
  }
  app.currentUser = currentUser;
}

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
