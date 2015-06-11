
var Vue = require('vue');
var Router = require('director').Router;

var app = new Vue(require('./app.vue'));


var router = new Router();
router.configure({html5history: true});

router.on('/', function() {
  app.view = 'home';
});

route.on('/c/:slug', function(slug) {
  app.view = 'cafe';
  app.params.cafeSlug = slug;
});

route.on('/t/:id', function(id) {
  app.view = 'topic';
  app.params.topicId = id;
});

router.init('/');
