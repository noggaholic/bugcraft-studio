<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" style="-webkit-app-region: drag;font-size: 1.2rem;">
            {{ brand }}
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navPortraitMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div id="navPortraitMenu" class="navbar-menu">
        <div class="navbar-start">
            <router-link to="/" class="navbar-item" data-id="general" >
                <span class="icon">
                    <i class="fa fa-home"></i>
                </span> 
                &nbsp;General</router-link>
            <router-link to="/spectate" class="navbar-item" data-id="spectate">
                <span class="icon">
                    <i class="fa fa-film"></i>
                </span> 
                &nbsp;Spectate</router-link>
            <router-link to="/environment" class="navbar-item" data-id="environment">
                <span class="icon">
                    <i class="fa fa-palette"></i>
                </span> 
                &nbsp;Environment</router-link>
            <router-link to="/settings" class="navbar-item" data-id="settings">
                <span class="icon">
                    <i class="fa fa-sliders-h"></i>
                </span> 
                &nbsp;Settings</router-link>
            <a class="navbar-item" v-on:click="open('https://github.com/noggaholic/bugcraft-studio/wiki')" data-id="faq">
                <span class="icon">
                    <i class="fa fa-info"></i>
                </span> 
                &nbsp;Documentation</a>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div v-if="this.$store.state.camera.mode === 'SPECTATE'" class="spectate-status">
                    <span class="icon" style="color: green;">
                        <i class="fas fa-circle"></i>
                    </span>
                    <div>[F4] Add wp - [F5] Play - [F6] Clear wps</div>
                </div>
                <div v-if="this.$store.state.camera.mode === 'DISABLED'" class="spectate-status">
                    <span class="icon" style="color: gray;">
                        <i class="fas fa-circle"></i>
                    </span>
                    <div>[F3] Toggle Spectate</div>
                </div>
                <div v-if="this.$store.state.camera.mode === 'PLAYING'" class="spectate-status">
                    <span class="icon" style="color: red;">
                        <i class="fas fa-circle"></i>
                    </span>
                    <div>[F5] Stop cinematic</div>
                </div>
            </div>
            <a class="navbar-item" v-on:click="open('http://www.twitter.com/k4rliky')">
                <span class="icon">
                    <i class="fab fa-twitter"></i>
                </span>
            </a>
            <a class="navbar-item" v-on:click="open('https://github.com/noggaholic/bugcraft-studio')">
                <span class="icon">
                    <i class="fab fa-github"></i>
                </span>
            </a>
        </div>
    </div>
</nav>
</template>

<script>
  const { shell } = require('electron');

  function navData() {
    return {
      brand: 'BugCraft Studio',
    };
  }

  export default {
    name: 'navbar',
    data: navData,
    methods: {
      open(link) {
        shell.openExternal(link);
      }
    },
  };

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

</script>

<style>
  .spectate-status {                        
    display:flex;
    align-items:center;
  }

  #navPortraitMenu > div.navbar-end > a:nth-child(1):hover {
    background: transparent;
    cursor: initial;
  }
</style>
