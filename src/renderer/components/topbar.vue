<template>
  <div class="topbar" style="  -webkit-user-select: none; -webkit-app-region: drag;">
      <div class="topbar-status">
          <div v-if="this.$store.state.camera.mode === 'SPECTATE'" class="spectate-status">
            <span class="icon" style="color: #20801d;">
              <i class="fas fa-circle"></i>
            </span>
            <div>[F4] Add wp - [F5] Play - [F6] Clear wps</div>
          </div>
          <div v-if="this.$store.state.camera.mode === 'DISABLED'" class="spectate-status">
            <span class="icon" style="color: #626b82;">
              <i class="fas fa-circle"></i>
            </span>
            <div>[F3] Toggle Spectate</div>
          </div>
          <div v-if="this.$store.state.camera.mode === 'PLAYING'" class="spectate-status">
            <span class="icon" style="color: #c10808;">
              <i class="fas fa-circle"></i>
            </span>
            <div>[F5] Stop cinematic</div>
          </div>
      </div>
      <div class="topbar-app-control" style="-webkit-app-region: no-drag;">
          <span v-on:click="minimize"><i data-feather="minus"></i></span>
          <span v-on:click="maximize"><i data-feather="square"></i></span>
          <span v-on:click="close"><i data-feather="x"></i></span>
      </div>
  </div>
</template>

<script>
  const { BrowserWindow } = require('@electron/remote')
  var WindowStatus = { maximized: false }
  const win = BrowserWindow.getFocusedWindow();
  export default {
    name: 'topbar',
    created() {
      const store = this.$store;
      window.onbeforeunload = (e) => {
        store.dispatch('saveSettings');
        store.commit('setMode', 'DISABLED');
        store.commit("setTimeOfDayStatus", false);
        if (process.env.NODE_ENV === 'development') return;
        process.nextTick(() => win.destroy());
      }
    },
    mounted() {
      feather.replace({  width: "16", height: "16" })
    },
    methods: {
        minimize() {
          win.minimize();
        },
        maximize() {
          if(WindowStatus.maximized === true) {
            WindowStatus.maximized = false;
            win.unmaximize();
          } else {
            WindowStatus.maximized = true;
            win.maximize();
          }
        },
        close() {
          win.close();
        },
    },
    data() {
      return {}
    },
  };
</script>

<style scoped>
    .topbar{
        width: 100%;
        height: 40px;
        background-color: #1e2433;
        display: flex;
        margin-left: 1px;
        align-items: center;
        justify-content: space-between;
    }
    .topbar-status {
        color: #626b82;
        font-size: 0.9em;
    }
    .topbar-app-control {
        margin-right: 10px;
        color: #626b82;
        font-size: 0.9em;
        display: flex;
    }
    .topbar-app-control > span {
        margin-left: 10px;
        display: flex;
    }
    .topbar-app-control > span:hover {
      color: white;
    }
    .spectate-status {
      display: flex;
      align-items: center;
      margin-left: 15px;
    }
</style>