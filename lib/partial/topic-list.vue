<template>
  <table class="topic-list">
    <thead>
      <tr>
        <th colspan="2" align="left">Hello</th>
        <th colspan="2" align="right">
          <select>
            <option>Newest</option>
            <option>Recent</option>
          </select>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-repeat="topics" class="topic-item" id="topic-{{id}}" v-on="mouseenter: enter(this, cafe), mouseleave: leave(this)" track-by="id">
        <td class="column-avatar" v-el="border">
          <user-avatar user="{{user}}"></user-avatar>
        </td>
        <td class="column-title">
          <a class="topic-title" href="/t/{{id}}">{{title}}</a>
          <div class="explain">
            <time datetime="{{ created_at }}">{{ created_at | timeago }}</time>
            by <a href="/u/{{user.username}}">{{user.username}}</a>
            <span v-if="cafe"> at <a href="/c/{{cafe.slug}}">{{ cafe.name }}</a></span>
          </div>
        </td>
        <td class="column-count">10.3k<span class="explain">views</span></td>
        <td class="column-count">34<span class="explain">replies</span></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" align="center">
          <a href="#">More Topics</a>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['topics'],
    methods: {
      enter: function(vm, cafe) {
        if (cafe && cafe.background_color) {
          vm.$$.border.style.borderColor = cafe.background_color;
        }
      },
      leave: function(vm) {
        vm.$$.border.style.borderColor = 'transparent';
      }
    },
    components: {
      'user-avatar': require('./user-avatar.vue')
    }
  }
</script>

<style>
  .topic-list thead {
    border-bottom: 1px solid rgba(100, 100, 100, 0.08);
  }
  .topic-list tfoot {
    border-top: 1px solid rgba(100, 100, 100, 0.08);
  }
  .topic-list tfoot td {
    padding: 0;
  }
  .topic-list tfoot a {
    display: block;
    padding: 8px;
    text-decoration: none;
    color: #999;
  }
  .topic-list tfoot a:hover {
    background-color: #f9f9f8;
  }
  .topic-list th {
    padding: 10px;
  }
  .topic-list td {
    padding: 18px 10px;
  }
  .topic-list 
  .topic-item .explain {
    display: block;
    color: #999;
    line-height: 1;
    font-size: 13px;
  }
  .topic-item .explain a {
    color: #999;
    text-decoration: none;
    font-weight: 600;
    font-size: 13px;
  }
  .topic-item .explain a:hover {
    color: #666;
  }
  .topic-item .column-avatar {
    width: 48px;
    height: 48px;
    text-align: center;
    vertical-align: middle;
    border-left: 3px solid transparent;
    transition: border-color .2s ease-out;
  }
  .topic-item .avatar {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }
  .topic-item .topic-title {
    text-decoration: none;
    color: #565655;
    line-height: 1;
    font-size: 18px;
    text-overflow: ellipsis;
  }
  .topic-item .topic-title:hover {
    color: #010100;
  }
  .topic-item .column-title {
    padding-left: 0;
  }
  .topic-item .column-title .explain {
    margin-top: 3px;
  }
  .topic-item .column-count {
    width: 48px;
    color: #454544;
    text-align: center;
  }
</style>
