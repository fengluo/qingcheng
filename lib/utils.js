exports.escape = function (html) {
  html = html || '';
  return html
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');
};


exports.messageFactory = function(app) {
  var clock;

  var flush = function() {
    app.messages = [];
  };

  var clear = function(index) {
    clearTimeout(clock);
    app.messages.splice(index, 1);
    clock = setTimeout(flush, 4000);
  };

  var show = function(type, text) {
    var msg = {type: type, text: text};
    if (!unique(msg, app.messages)) return;

    app.messages.push(msg);
    var index = app.messages.length - 1;
    setTimeout(function() {
      clear(index);
    }, 3000);
  }
  return {clear: clear, show: show, flush: flush};
};


function unique(item, list) {
  return !list.some(function(data) {
    return JSON.stringify(data) === JSON.stringify(item);
  });
}
