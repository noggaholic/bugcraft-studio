<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'bugcraft-studio',
    mounted() {
      const store = this.$store;
      launch((error, AppManager) => {
        if (error) {
          if (this.$route.path !== '/error') this.$router.push({ name: 'error', params: { error: error.message }});
          return;
        }
        store.commit('setGameInfo', AppManager.Game);
        store.commit('setCore', AppManager);
      });
    }
  };
</script>

<style>
  /* CSS */
</style>

<style lang="scss">
 html {
   overflow: auto;
 }

  /**
  * Body
  */
  html, body {
    background: #1a1e21;
    color: #e8e8ea;
  }

  /**
   * Label
   */
  .label {
    color: #e8e8ea;
  }

  /**
  * Input
  */
  .input {
    border-radius: #4a473f;
    background: #1a1e21;
    color: #e8e8ea;
  }

  /**
  * NavBar
  */

  .navbar {
    background: #1a1e21;
    border-bottom: 1px solid #29292b;
  }

  .navbar-item {
    color: #e8e8ea;
  }
  .navbar-item:hover {
    color: #e8e8ea;
  }

  .navbar-item:hover {
    border-bottom: 1px solid #cc272d;
  }
  .navbar-item.router-link-exact-active {
    border-bottom: 1px solid #cc272d;
  }

  /**
  * Tabs
  */
  .tabs a {
    color: #e8e8ea;
  }
  .tabs a:hover {
    color: #e8e8ea;
  }
  .tabs.is-boxed a {
    background-color: #1a1e21;
    border: none;
    border-radius: inherit;
    border-bottom: 2px solid #1a1e21;
  }
  .tabs.is-boxed a:hover {
    background-color: #1a1e21;
    border: none;
    border-radius: inherit;
    border-bottom: 2px solid #cd262d;
  }
  .tabs.is-boxed a.router-link-exact-active {
      border: none;
      border-radius: inherit;
      border-bottom: 2px solid #cd262d;
  }
  .tabs ul {
    border: none;
  }
  /**
   * Box
   */
  .box {
    background-color: #20201e;
    color: #e8e8ea;
    border-left: 6px solid #464648;
  }

  .title {
    color: #e8e8ea;
  }
  
  .subtitle {
    color: #e8e8ea;
  }

 /**
  * Tooltip
  */
  .tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>