<template>
  <div class="header">
    <div class="header-intro">
      <div class="container">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
    </div>
    <div class="header-nav">
      <div class="container">
        <nav>
          <a href="/c/1">Topics</a>
          <a href="/c/1?sort=new">New</a>
          <a href="/c/1">Members</a>
        </nav>
        <div class="header-actions">
          <a class="button" href="#">Follow</a>
          <a class="button" href="#">New Topic</a>
        </div>
      </div>
    </div>
  </div>

  <div class="body">
    <div class="split-view container">
      <div class="main-view">
        <topic-list topics="{{ topics }}"></topic-list>
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
        title: "A Cafe",
        description: "Hello Cafe. Fetch from API",
        topics: [
        {
          id: 2,
          title: 'What can I do with ZERQU',
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
        }
        ]
      }
    },
    components: {
      'topic-list': require('./partial/topic-list.vue')
    }
  };
</script>
