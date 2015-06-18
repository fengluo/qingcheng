
var Vue = require('vue');
Vue.use(require('vue-resource'));

exports.flashMessage = function(type, msg) {
  exports.app.flashMessage(type, msg);
}

exports.register = function(app) {
  exports.app = app;

  Vue.http.options.error = function(resp, status) {
    if (status === 400 && resp.error_description) {
      app.flashMessage('error', resp.error_description);
    }
  };
};

exports.cafe = {
  profile: function(slug, cb) {
    var url = '/api/cafes/' + slug;
    Vue.http.get(url, cb);
  },

  topics: function(slug, page, cb) {
    var url = '/api/cafes/' + slug + '/topics';
    if (page) {
      url += '?page=' + page;
    }
    Vue.http.get(url, cb);
  }
};

exports.timeline = function(cursor, cb) {
  var url = '/api/topics/timeline';
  if (cursor) {
    url += '?cursor=' + cursor;
  }
  Vue.http.get(url, cb);
};


exports.user = {
  login: function(data, cb) {
    if (data.permanent) {
      data.permanent = 'yes';
    } else {
      delete data.permanent;
    }
    Vue.http.post('/session', data, cb);
  },

  logout: function(cb) {
    Vue.http.delete('/session', cb);
  },

  profile: function(uid, cb) {
    if (!uid) uid = 'me';
    var url = '/api/users/' + uid;
    Vue.http.get(url, cb);
  }
};
