<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item navbar-menu-item" data-id="general">
          <div class="navbar-menu-icon">
            <span class="icon">
              <i data-feather="home"></i>
            </span>
          </div>
          <div class="navbar-menu-title">General</div>
        </router-link>
        <router-link to="/spectate" class="navbar-item navbar-menu-item" data-id="spectate">
          <div class="navbar-menu-icon">
            <span class="icon">
             <i data-feather="video"></i>
            </span>
          </div>
          <div class="navbar-menu-title">Spectate</div>
        </router-link>
        <router-link to="/environment" class="navbar-item navbar-menu-item" data-id="environment">
          <div class="navbar-menu-icon">
            <span class="icon">
             <i data-feather="image"></i>
            </span>
          </div>
          <div class="navbar-menu-title">Environment</div>
        </router-link>
        <router-link to="/settings" class="navbar-item navbar-menu-item" data-id="settings">
          <div class="navbar-menu-icon">
            <span class="icon">
              <i data-feather="sliders"></i>
            </span>
          </div>
          <div class="navbar-menu-title">Settings</div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
const { shell } = require("electron");

function navData() {
  const data = {};
  return data;
}

export default {
  name: "navbar",
  data: navData,
  mounted() {
    feather.replace({  width: "20", height: "20", 'stroke-width': 2 })
  },
  methods: {
    open(link) {
      shell.openExternal(link);
    }
  }
};
</script>

<style scoped>
  .navbar-menu {
    display: flex;
  }
  @media screen and (max-width: 1023px) {
    .navbar-menu {
      background: transparent;
      padding: 0;
    }
  }
</style>
