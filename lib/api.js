
var Vue = require('vue');
Vue.use(require('vue-resource'));


var TRY_CURRENT_USER_KEY = 'zq:try:me';
var CURRENT_USER_KEY = 'zq:user';


exports.register = function(app) {
  Vue.http.options.error = function(resp, status) {
    if (status === 401) {
      cleanUser();
      if (!sessionStorage[TRY_CURRENT_USER_KEY]) return;
    }

    if (resp.error_description) {
      var type = 'error';
      if (status === 429) {
        type = 'warn';
      }
      app.message.show(type, resp.error_description);
    } else if (status >= 500) {
      app.message.show('error', 'There is a server error.');
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
  list: function(cb) {
    Vue.http.get('/api/cafes', cb);
  },
  url: function(slug) {
    return '/api/cafes/' + slug;
  },

  view: function(slug, cb) {
    Vue.http.get(this.url(slug), cb);
  },

  topics: function(slug, page, cb) {
    var url = this.url(slug) + '/topics';
    if (page) {
      url += '?page=' + page;
    }
    Vue.http.get(url, cb);
  },

  users: function(slug, page, cb) {
    var url = this.url(slug) + '/users';
    if (page) {
      url += '?page=' + page;
    }
    Vue.http.get(url, cb);
  },

  join: function(slug, cb) {
    Vue.http.post(this.url(slug) + '/users', cb);
  },

  leave: function(slug, cb) {
    Vue.http.delete(this.url(slug) + '/users', cb);
  },
};


exports.timeline = function(cursor, cb) {
  var url = '/api/topics/timeline';
  var query = [];
  if (cursor) {
    query.push('cursor=' + cursor);
  }
  if (query.length) {
    url += '?' + query.join('&');
  }
  Vue.http.get(url, cb);
};

exports.topic = {
  create: function(slug, payload, cb) {
    var url = '/api/cafes/' + slug + '/topics';
    Vue.http.post(url, payload, cb);
  },

  url: function(tid) {
    return '/api/topics/' + tid;
  },
  view: function(tid, cb) {
    Vue.http.get(this.url(tid), cb);
  },
  viewRaw: function(tid, cb) {
    Vue.http.get(this.url(tid) + '?content=raw', cb);
  },
  update: function(tid, payload, cb) {
    Vue.http.post(this.url(tid), payload, cb);
  },
  read: function(tid, percent, cb) {
    var url = this.url(tid) + '/read';
    Vue.http.post(url, {percent: percent}, cb);
  },
  like: function(tid, cb) {
    Vue.http.post(this.url(tid) + '/likes', cb);
  },
  unlike: function(tid, cb) {
    Vue.http.delete(this.url(tid) + '/likes', cb);
  },
  comments: function(tid, cursor, cb) {
    var url = this.url(tid) + '/comments?order=asc';
    if (cursor) {
      url += '&cursor=' + cursor;
    }
    Vue.http.get(url, cb);
  }
};

exports.comment = {
  url: function(comment) {
    return '/api/topics/' + comment.topic_id + '/comments/' + comment.id;
  },
  create: function(tid, payload, cb) {
    var url = '/api/topics/' + tid + '/comments';
    Vue.http.post(url, payload, cb);
  },
  delete: function(comment, cb) {
    Vue.http.delete(this.url(comment), cb);
  },
  flag: function(comment, cb) {
    var url = this.url(comment) + '/flag';
    Vue.http.post(url, cb);
  }
};

exports.user = {
  login: function(data, cb) {
    delete sessionStorage[TRY_CURRENT_USER_KEY];
    var rv = {};
    if (data.permanent) {
      rv.permanent = 'yes';
    }
    var headers = {
      'Authorization': 'Basic ' + btoa(data.username + ':' + data.password)
    };
    return Vue.http.post('/session', rv, function(user) {
      trackUser(user);
      cb && cb(user);
    }, {headers: headers});
  },
  signup: function(email, cb) {
    return Vue.http.post('/session/new', {email: email}, cb);
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
  ga('set', 'userId', user.username);
  sessionStorage[CURRENT_USER_KEY] = JSON.stringify(user);
}

function cleanUser() {
  Vue.app.currentUser = {};
  delete sessionStorage[CURRENT_USER_KEY];
}
