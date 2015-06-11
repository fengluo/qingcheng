
var Vue = require('vue');
var Router = require('director').Router;

var app = new Vue(require('./app.vue'));

console.log('hello')

var router = new Router();

router.on('/', function(page) {
  app.view = 'home';
});

router.init('/');
