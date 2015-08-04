(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments);
  };
  i[r].l = new Date();
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  if (id) {
    m.parentNode.insertBefore(a, m);
  }
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-21475122-6', 'auto', {'name': 'z'});
ga('z.set', 'dimension1', 'qingcheng');
ga('z.send', 'pageview');
window.addEventListener('error', function(e) {
  ga('z.send', 'exception', {
    exDescription: e.message + ' ' + e.filename + ': ' + e.lineno
  });
});
