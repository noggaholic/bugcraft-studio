<template>
  <div>
    <div class="tabs is-boxed">
      <settingsMenu></settingsMenu>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column is-one-third">
          <div class="field">
            <label class="label">Window transparency</label>
            <div class="control">
              <input
                class="input range ltpurple"
                v-model="windowTransparency"
                min="50"
                max="100"
                step="1"
                value="100"
                v-on:change="setWindowTransparency($event)"
                v-on:input="setWindowTransparency($event)"
                type="range"
              />
            </div>
          </div>
        </div>
        <div class="column">
          <label class="checkbox checkbox-custom">
            <input
             type="checkbox"
              id="always_on_top"
              name="always_on_top"
              v-model="alwaysOnTop"
              v-on:change="setAlwaysOnTop($event)"
            />
            <label for="renderer_details">
              <span></span>Set window always on top
            </label>
            <div class="checkbox_indicator no-drop"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const electron = require("electron");
const win = electron.remote.getCurrentWindow();
export default {
  name: "settings",
  components: {
    settingsMenu: require("./settingsMenu")
  },
  methods: {
    setAlwaysOnTop: function({ target: element }) {
      this.$store.commit("setAlwaysOnTop", element.checked);
      win.setAlwaysOnTop(element.checked);
    },
    setWindowTransparency: function({ target: element }) {
      this.$store.commit("setWindowTransparency", element.value);
      const html = window.document.querySelector("html");
      const body = window.document.querySelector("body");
      const alphaChannel = element.value / 100;
      html.style.backgroundColor = "transparent";
      html.style.opacity = alphaChannel;
      body.style.backgroundColor = `rgba(22, 27, 38, ${alphaChannel})`;
    }
  },
  data() {
    return {
      alwaysOnTop: this.$store.state.settings.alwaysOnTop,
      windowTransparency: this.$store.state.settings.windowTransparency
    };
  }
};
</script>

<style>
</style>