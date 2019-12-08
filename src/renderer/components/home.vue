<template>
  <div class="appContainer">
      <nav class="nav has-shadow">
        <div class="container is-fluid">
          <div class="nav-left menu-tabs">
            <span class="nav-item" style="-webkit-app-region: drag;font-size: 1.2rem;">
              {{ brand }}
            </span>
            <a class="nav-item is-tab is-hidden-mobile is-active" data-id="general" >General</a>
            <router-link to="/spectate" class="nav-item is-tab is-hidden-mobile" data-id="spectate">Spectate</router-link>
            <a class="nav-item is-tab is-hidden-mobile" data-id="environment" >Environment</a>
            <a class="nav-item is-tab is-hidden-mobile" data-id="faq" >F.A.Q</a>
          </div>
          <span class="nav-toggle" v-on:click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div class="nav-right menu-tabs nav-menu">
            <a class="nav-item is-tab is-hidden-tablet is-active" data-id="general" >General</a>
            <a class="nav-item is-tab is-hidden-tablet" data-id="spectate" >Spectate</a>
            <a class="nav-item is-tab is-hidden-tablet" data-id="environment" >Environment</a>
            <a class="nav-item is-tab is-hidden-tablet" data-id="faq" >F.A.Q</a>
            <a class="nav-item is-tab" v-on:click="open" href="https://github.com/noggaholic/bugcraft-studio">
              <figure class="image is-16x16">
                <i class="fa fa-github"></i>
              </figure>
            </a>
            <a class="nav-item is-tab" v-on:click="open" href="http://www.twitter.com/k4rliky">
              <figure class="image is-16x16">
                <i class="fa fa-twitter"></i>
              </figure>
            </a>
          </div>
        </div>
      </nav>
      <router-view></router-view>
      <!--<spectate v-if="section === 'spectate'"></spectate>
      <environment v-if="section === 'environment'"></environment>
      <faq v-if="section === 'faq'"></faq> -->
    </div>
</template>

<script>

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
        this.$electron.shell.openExternal(link);
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
