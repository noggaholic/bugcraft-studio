<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="tabs is-boxed">
          <spectateMenu></spectateMenu>
        </div>
        <div data-id="spectateSettings" class>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label is-normal">Pan x</label>
                <p class="control">
                  <input disabled class="input range ltpurple" type="range" />
                </p>
              </div>
              <div class="field">
                <label class="label is-normal">Pan y</label>
                <p class="control">
                  <input disabled class="input range ltpurple" type="range" />
                </p>
              </div>
              <div class="field">
                <label class="label is-normal">Pan z</label>
                <p class="control">
                  <input disabled class="input range ltpurple" type="range" />
                </p>
              </div>
            </div>
            <div class="column">
              <label class="label is-normal">Spectate options</label>
              <div class="field">
                <input
                  type="checkbox"
                  id="toggle_spectate"
                  :checked="this.$store.state.camera.mode !== 'DISABLED'"
                  name="toggle_spectate"
                  ref="toggle_spectate"
                  data-id="ENABLE_SPECTATOR"
                  v-on:click="toggleSpectate"
                />
                <label for="toggle_spectate">
                  <span></span>Toggle Spectate Mode (F3)
                </label>
              </div>
              <div class="field">
                <input
                  :disabled="clientVersion === 'vanilla' || clientVersion === 'alpha'"
                  type="checkbox"
                  v-on:click="toggleCollision"
                  id="toggle_collision"
                  name="toggle_collision"
                  :checked="this.$store.state.camera.collision"
                />
                <label for="toggle_collision">
                  <span></span>Collision enabled
                </label>
              </div>
              <div class="field">
                <input type="checkbox" disabled id="toggle_look_at_target" name="toggle_look_at_target" />
                <label for="toggle_look_at_target">
                  <span></span>Look at selected unit
                </label>
              </div>
              <div class="field">
                <input type="checkbox" disabled id="toggle_follow_target" name="toggle_follow_target" />
                <label for="toggle_follow_target">
                  <span></span>Follow target
                </label>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label is-normal">Spectate Speed</label>
                <p class="control">
                  <input
                    v-model="speed"
                    class="input"
                    name="speed"
                    type="text"
                    min="0.01"
                    max="1.9"
                    step="0.005"
                    value="0.975"
                    v-on:change="setSpeed"
                    v-on:input="setSpeed"
                  />
                </p>
              </div>
              <div class="field">
                <cameraViewer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "spectate",
  components: {
    spectateMenu: require("./spectateMenu"),
    cameraViewer: require("./cameraViewer")
  },
  methods: {
    toggleSpectate(element) {
      const domElement = element.currentTarget;
      const isChecked = domElement.checked;
      if (isChecked) return this.$store.commit("setMode", "SPECTATE");
      return this.$store.commit("setMode", "DISABLED");
    },
    toggleCollision(element) {
      const domElement = element.currentTarget;
      const isChecked = domElement.checked;
      return this.$store.commit("setCollision", isChecked);
    },
    setSpeed(element) {
      const domElement = element.currentTarget;
      const speed = domElement.value;
      console.log('# speed', speed);
      this.$store.commit("setSpeed", speed);
    }
  },
  data() {
    return {
      speed: this.$store.state.camera.speed,
      clientVersion: this.$store.state.settings.client,
    };
  }
};
</script>
