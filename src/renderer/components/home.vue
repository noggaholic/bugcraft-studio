<template>
    <div class="appContainer">
        <keyboard/>
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>
<script>
  const { shell } = require('electron');

  function home() {
    return {};
  }

  export default {
    name: 'home',
    data: home,
    components: {
      navbar: require('./navbar'),
      keyboard: require('./keyboard'),
    },
  };
</script>

<style>
</style>
