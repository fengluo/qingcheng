
var Vue = require('vue');
Vue.use(require('vue-resource'));

var TRY_CURRENT_USER_KEY = 'zq:try:me';
var CURRENT_USER_KEY = 'zq:user';


exports.register = function(app) {
  Vue.http.options.error = function(resp, status) {
    if (status === 401) {
      cleanUser();
    } else if (resp.error_description) {
      var type = 'error';
      if (status === 429) {
        type = 'warn';
      }
      Vue.message.show(type, resp.error_description);
    }
  };

  // load currentUser
  var currentUser = sessionStorage[CURRENT_USER_KEY];
  if (currentUser) {
    try {
      currentUser = JSON.parse(currentUser);
    } catch(e) {
      delete sessionStorage[CURRENT_USER_KEY];
      currentUser = {};
    }
    app.currentUser = currentUser;
  } else {
    if (sessionStorage[TRY_CURRENT_USER_KEY]) return;

    exports.user.profile('me').error(function() {
      sessionStorage[TRY_CURRENT_USER_KEY] = '1';
    });
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

exports.topic = {
  view: function(tid, cb) {
    var url = '/api/topics/' + tid;
    Vue.http.get(url, cb);
  }
};

exports.user = {
  login: function(data, cb) {
    delete sessionStorage[TRY_CURRENT_USER_KEY];

    if (data.permanent) {
      data.permanent = 'yes';
    } else {
      delete data.permanent;
    }
    return Vue.http.post('/session', data, function(user) {
      trackUser(user);
      cb && cb(user);
    });
  },

  logout: function(cb) {
    cleanUser();
    return Vue.http.delete('/session', cb);
  },

  profile: function(uid, cb) {
    var url = '/api/users/' + uid;

    if (uid === 'me') {
      return Vue.http.get(url, function(user) {
        trackUser(user);
        cb && cb(user);
      });
    } else {
      return Vue.http.get(url, cb);
    }
  }
};

function trackUser(user) {
  Vue.app.currentUser = user;
  sessionStorage[CURRENT_USER_KEY] = JSON.stringify(user);
}

function cleanUser() {
  Vue.app.currentUser = {};
  delete sessionStorage[CURRENT_USER_KEY];
}
