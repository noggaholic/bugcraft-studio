<template>
    <div class="appContainer">
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io"  style="-webkit-app-region: drag;font-size: 1.2rem;">
                    {{ brand }}
                </a>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                    data-target="navPortraitMenu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navPortraitMenu" class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" class="navbar-item" data-id="general" >General</router-link>
                    <router-link to="/spectate" class="navbar-item" data-id="spectate">Spectate</router-link>
                    <router-link to="/environment" class="navbar-item" data-id="environment" >Environment</router-link>
                    <a class="navbar-item" v-on:click="open('https://github.com/noggaholic/bugcraft-studio/wiki')" data-id="faq">Documentation</a>
                </div>

                <div class="navbar-end">
                    <a class="navbar-item" v-on:click="open('http://www.twitter.com/k4rliky')">
                        <span class="icon">
                            <i class="fa fa-twitter"></i>
                        </span>
                    </a>
                    <a class="navbar-item" v-on:click="open('https://github.com/noggaholic/bugcraft-studio')">
                        <span class="icon">
                            <i class="fa fa-github"></i>
                        </span>
                    </a>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
  const { shell } = require('electron');

  function navData() {
    return {
      brand: 'Bugcraft Studio',
      section: 'general',
    };
  }

  export default {
    name: 'home',
    data: navData,
    methods: {
      open(link) {
        shell.openExternal(link);
      },
      setActiveItem() {

      },
      toggleMenu() {

      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  .navbar.is-dark .navbar-brand > a.navbar-item:hover {
    background-color: inherit;
  }

  .navbar.is-dark .navbar-brand > a.navbar-item {
    cursor: pointer;
  }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .spectateMenu li a {
     border-bottom: 0px !important;
  }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .table td, .table th {
    color: #fff;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
