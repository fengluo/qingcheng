
var Vue = require('vue');

exports.register = function(app) {
  Vue.use(require('vue-resource'));
  Vue.http.options.error = function(resp) {
    if (resp.error_description) {
      app.flashMessage('error', resp.error_description);
    }
  };
};

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
  var url = '/api/topics/timeline';
  if (cursor) {
    url += '?cursor=' + cursor;
  }
  Vue.http.get(url, cb);
};
