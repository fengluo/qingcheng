<template>
<h2>Topic view</h2>

<p>{{ params|json }}</p>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['params']
  };
</script>
