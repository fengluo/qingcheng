
var Vue = require('vue');


exports.cafe = function(slug, cb) {
  var url = '/api/cafes/' + slug;
  Vue.http.get(url, cb);
};

exports.cafeTopics = function(slug, page, cb) {
  var url = '/api/cafes/' + slug + '/topics';
  if (page) {
    url += '?page=' + page;
  }
  Vue.http.get(url, cb);
};

exports.timeline = function(cursor, cb) {
  var url = '/api/timeline';
  Vue.http.get(url, cb);
};
