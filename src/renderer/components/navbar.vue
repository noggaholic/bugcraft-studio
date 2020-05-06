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

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
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
