<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="tabs is-boxed">
          <spectateMenu></spectateMenu>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label is-normal">Camera position (x)</label>
          <p class="control">
            <input class="input" 
              v-model="pos_x"
              name="pos_x"
              ref="pos_x"
              v-on:change="setPosition"
            />
          </p>
        </div>
        <div class="field">
          <label class="label is-normal">Camera position (y)</label>
          <p class="control">
            <input class="input" 
              v-model="pos_y"
              name="pos_y"
              ref="pos_y"
              v-on:change="setPosition"
            />
          </p>
        </div>
        <div class="field">
          <label class="label is-normal">Camera position (z)</label>
          <p class="control">
            <input class="input" 
              v-model="pos_z"
              name="pos_z"
              ref="pos_z"
              v-on:change="setPosition"
            />
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
</template>

<script>

let positionInterval;

export default {
  name: "spectate",
  components: {
    spectateMenu: require("./spectateMenu"),
    cameraViewer: require("./cameraViewer")
  },
  mounted() {
    const store = this.$store;
    if (store.getters.core && this.$refs) {
      const { x, y, z } = store.getters.core.camera.getView().position;
      const refs = this.$refs;
      refs.pos_x.value = x;
      refs.pos_y.value = y;
      refs.pos_z.value = z;
      store.commit("setCurrPosition", { x, y, z });
    }
    positionInterval = setInterval(() => {
      if (document.activeElement.name === 'pos_x'
            || document.activeElement.name === 'pos_y'
                || document.activeElement.name === 'pos_z') {
        console.log('# nothing to do');
         return;
      }
      const { x, y, z } = store.getters.core.camera.getView().position;
      store.commit("setCurrPosition", { x, y, z });
      const refs = this.$refs;
      refs.pos_x.value = x;
      refs.pos_y.value = y;
      refs.pos_z.value = z;
    }, 1000);
  },
  destroyed() {
    clearInterval(positionInterval);
    positionInterval = undefined;
  },
  methods: {
    setPosition(element) {
      if (this.$store.state.camera.mode === 'DISABLED') return;
      const { x: currX, y: currY, z: currZ } = this.$store.getters.core.camera.getView().position;
      const store = this.$store;
      const refs = this.$refs;
      // TODO: Investigate this.
      let x = parseFloat(refs.pos_x.value);
      let y = parseFloat(refs.pos_y.value);
      let z = parseFloat(refs.pos_z.value);
      if (x === 0) x = currX;
      if (y === 0) y = currY;
      if (z === 0) z = currZ;
      store.commit("setPosition", { x, y, z });
    },
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
      this.$store.commit("setSpeed", speed);
    }
  },
  data() {
    return {
      speed: this.$store.state.camera.speed,
      clientVersion: this.$store.state.settings.client,
      pos_x: this.$store.state.camera.position.x,
      pos_y: this.$store.state.camera.position.y,
      pos_z: this.$store.state.camera.position.z
    };
  }
};
</script>

<style>
</style>