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
                    <a class="navbar-item" v-on:click="open('https://github.com/noggaholic/bugcraft-studio/wiki')" data-id="faq">
                        <span class="icon">
                            <i class="fa fa-info"></i>
                        </span> 
                        &nbsp;Documentation</a>
                </div>
                <div class="navbar-end">
                    <a class="navbar-item">
                        <div v-if="this.$store.state.camera.mode === 'SPECTATE'">
                            <span class="icon" style="color: green;">
                                <i class="fas fa-circle"></i>
                            </span>
                        </div>
                        <div v-if="this.$store.state.camera.mode === 'DISABLED'">
                            <span class="icon" style="color: gray;">
                                <i class="fas fa-circle"></i>
                            </span>
                        </div>
                        <div v-if="this.$store.state.camera.mode === 'PLAYING'">
                            <span class="icon" style="color: red;">
                                <i class="fas fa-circle"></i>
                            </span>
                        </div><div>&nbsp;&nbsp;&nbsp;Spectate mode</div>
                    </a>
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
</script>

<style>

</style>
