
var Vue = require('vue');
var page = require('page');

var app = new Vue(require('./app.vue'));

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
