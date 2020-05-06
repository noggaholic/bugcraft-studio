<template>
    <div class="appContainer">
        <div class="sidenav">
            <div class="navbar-brand" >
              <a class="navbar-item" style="-webkit-app-region: drag; font-size: 1.2rem;">
                <img class="bugcraft" src="../assets/bugcraft.svg" alt="Bugcraft Studio">
              </a>
          </div>
          <navbar></navbar>
        </div>
        <div class="main">
          <keyboard/>
          <TopBar />
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
  const { shell } = require('electron');

  function home() {
    const data = {};
    return data;
  }

  export default {
    name: 'home',
    data: home,
    mounted() {},
    components: {
      TopBar: require('./topbar'),
      navbar: require('./navbar'),
      keyboard: require('./keyboard'),
    },
  };
</script>

<style scoped>
  .bugcraft {
    width: 100%;
    height: 100%;
  }
  .navbar-item {
    transform: scale(1);
    -webkit-transform-origin-y: 20px;
    width: 100%;
  }
</style>