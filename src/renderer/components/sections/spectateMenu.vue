<template>
  <div>
    <ul>
      <li>
        <router-link
          to="/spectate"
          class="nav-item is-tab"
          v-bind:class="{ 'is-active': spectateActived }"
        >
          <span class="icon is-small">
            <i data-feather="video"></i>
          </span>
          <span>Settings</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/spectate/cinematicBuilder"
          class="nav-item is-tab"
          v-bind:class="{ 'is-active': cinematicBuilderActived }"
        >
          <span class="icon is-small">
            <i data-feather="film"></i>
          </span>
          <span>Cinematic builder</span>
        </router-link>
      </li>
    </ul>
    <div class="cinematic_menu" v-if="this.$route.path === '/spectate/cinematicBuilder'">
      <div v-on:click="loadCinematic">
        <i data-feather="file"></i>
        <span>Load</span>
      </div>
      <div v-on:click="saveCinematic">
        <i data-feather="save"></i>
        <span>Save</span>
      </div>
    </div>
  </div>
</template>

<script>
const filters = [{ name: `BugCraft's Studio Cinematic (JSON)`, extensions: ['json'] }];
const { dialog } = require('@electron/remote');
const fs = require('fs');

export default {
  name: "spectateMenu",
  mounted() {
    feather.replace({ width: "16", height: "16" });
  },
  methods: {
    loadCinematic() {
      const [ cinematicPath ] = dialog.showOpenDialogSync({ 
        properties: ['openFile'], 
        filters
      });
      const cinematic = JSON.parse(fs.readFileSync(cinematicPath, 'utf8'));
      const {
        cinematicSteps,
        cinematicSpeed,
        easing,
        easingType,
        isTimeOfDayEnabled
      } = cinematic;
      this.$store.commit("setCinematicSpeed", Number(cinematicSpeed));
      this.$store.commit('setEasing', easing);
      this.$store.commit('setEasingType', easing);
      this.$store.commit('setEasingTypeSelected', easingType);
      if (isTimeOfDayEnabled) this.$store.commit("setTimeOfDayStatus", true);
      cinematicSteps.forEach(step => this.$store.commit('addCinematicStep', step));
      // TODO: Weird way to force a refresh of the UI :(
      this.$router.push({ path: "/spectate" });
      setTimeout(() => app.$router.push({ path: "/spectate/cinematicBuilder" }));
    },
    saveCinematic() {
      const date = new Date();
      const defaultPath = `cinematic-${this.$store.state.settings.client}-${this.$store.state.settings.build}-${date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}`;
      const cinematicPath = dialog.showSaveDialogSync({ 
        properties: ['openFile'], 
        filters,
        title: "Save BugCraft's Studio Cinematic",
        defaultPath,
      });
      const cinematicSteps = this.$store.getters.steps;
      const cinematic = {
        cinematicSteps,
        cinematicSpeed: this.$store.state.camera.cinematicSpeed,
        easing: this.$store.state.camera.easing,
        easingType: this.$store.state.camera.easingTypeSelected,
        isTimeOfDayEnabled: this.$store.state.camera.isTimeOfDayEnabled
      };
      fs.writeFileSync(cinematicPath, JSON.stringify(cinematic));
    }
  },
  data() {
    const data = {
      spectateActived: false,
      cinematicBuilderActived: false
    };
    if (this.$route.path === "/spectate") {
      data.spectateActived = true;
    } else if (this.$route.path === "/spectate/cinematicBuilder") {
      data.cinematicBuilderActived = true;
    }
    return data;
  }
};
</script>

<style scoped>
  .cinematic_menu {
    display: flex;
  }
  .cinematic_menu div:first-child {
    margin-left: 23px;
  }
  .cinematic_menu div:last-child {
    margin-left: 10px;
  }
  .cinematic_menu span {
    margin: 0px;
    vertical-align:middle;
  }
  .cinematic_menu svg {
    vertical-align:middle;
  }
  .cinematic_menu div {
    cursor: pointer;
  }
</style>
