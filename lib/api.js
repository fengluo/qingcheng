
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
    } else if (status === 401) {
      cleanUser();
    }
  };

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
  } else {
    exports.user.profile('me');
  }

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
    Vue.http.post('/session', data, function(user) {
      trackUser(user);
      cb(user);
    });
  },

  logout: function(cb) {
    cleanUser();
    Vue.http.delete('/session', cb);
  },

  profile: function(uid, cb) {
    var url = '/api/users/' + uid;

    if (uid === 'me') {
      Vue.http.get(url, function(user) {
        trackUser(user);
        cb(user);
      });
    } else {
      Vue.http.get(url, cb);
    }
  }
};

function trackUser(user) {
  exports.app.currentUser = user;
  sessionStorage['zq:user'] = JSON.stringify(user);
}

function cleanUser() {
  exports.app.currentUser = {};
  delete sessionStorage['zq:user'];
}
