<template>
  <cafe-header cafe="{{ cafe }}"></cafe-header>
  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <div class="topic-list">
          <div class="topic-filters clearfix">
            <div class="topic-order-by">
              <select>
                <option>Newest</option>
              </select>
            </div>
          </div>
          <logo-loading v-if="!topics.length"></logo-loading>
          <ul v-if="topics.length">
            <topic-item v-repeat="topic: topics"></topic-item>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['params'],
    data: function() {
      return {
        cafe: {
          title: "A Cafe",
          description: "Hello Cafe. Fetch from API"
        },
        topics: []
      }
    },
    compiled: function() {
      var me = this;

      setTimeout(function() {

        me.topics = [{
          id: 2,
          title: 'What can I do with ZERQU, What can I do with ZERQU, What can I do with ZERQU What can I do with ZERQU, What can I do with ZERQU, What can I do with ZERQU',
          cafe: {
            slug: 'good',
            name: 'Good',
            background_color: 'green'
          },
          user: {
            username: 'lepture',
            avatar_url: ''
          }
        },
        {
          id: 1,
          title: 'Hello world, this is a test',
          created_at: '2015-06-12T09:08:23Z',
          user: {
            username: 'lizzy',
            avatar_url: 'https://avatars1.githubusercontent.com/u/1206493?v=3&s=96'
          }
        }];

      }, 10);

    },
    components: {
      'topic-item': require('./components/topic-item.vue'),
      'cafe-header': require('./components/cafe-header.vue'),
      'logo-loading': require("./components/logo-loading.vue")
    }
  };
</script>
