
<script>
  var api = require('../api');
  module.exports = {
    replace: true,
    props: ['cafe'],
    data: function() {
      return {
        pagination: {},
        topics: []
      }
    },
    watch: {
      'cafe': function(cafe) {
        if (!cafe || !cafe.slug) return;
        this.fetchTopics();
      }
    },
    methods: {
      fetchUsers: function(slug, page) {
        api.cafe.users(slug, page, function(resp) {
          console.log(resp);
        }.bind(this));
      }
    },
    components: {
      'topic-item': require('./topic-item.vue'),
      'logo-loading': require("./logo-loading.vue")
    }
  }
</script>
