<template>
<div>

  <div class="tabs is-boxed">
    <spectateMenu></spectateMenu>
  </div>
  <div class="container cinematic_builder">
    <div class="columns">
      <div class="column">
        <div v-if="!cinematicSteps.length" class="column">
              <div class="tile is-ancestor">
                  <div class="tile is-parent">
                      <article class="tile is-child box">
                          <p class="title">Toggle Spectate Mode</p>
                          <p class="subtitle">Press F3 and you'll be able to move the camera around.</p>
                      </article>
                  </div>
                  <div class="tile is-parent">
                      <article class="tile is-child box">
                          <p class="title">Add Waypoints</p>
                          <p class="subtitle">Press F4 to add the current camera position to the cinematic builder</p>
                      </article>
                  </div>
                  <div class="tile is-parent">
                      <article class="tile is-child box">
                          <p class="title">Play it!</p>
                          <p class="subtitle">Press F5 to play the whole cinematic.</p>
                      </article>
                  </div>
              </div>
          </div>
          <div v-if="cinematicSteps.length" class="is-scrollable" ref="table_cinematic">
            <div class="columns">
              <div class="column is-one-quarter">
                <div class="field">
                  <label class="label">Cinematic duration in seconds</label>
                  <p class="help">This sets how much the cinematic will last.</p>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      ref="cinematic_speed"
                      v-model="cinematicSpeed"
                      v-on:input="setCinematicSpeed($event)"
                      placeholder="Value in seconds, defaults to 10.">
                  </div>
                </div>
              </div>
              <div class="column is-one-quarter">
                <div class="field">
                  <label class="label">Easing</label>
                  <p class="help easing">Open <a v-on:click="open('https://greensock.com/docs/v2/Easing')">Ease Visualizer</a></p>
                  <div class="control">
                    <div class="select">
                      <select v-on:change="setEasing">
                        <option>Power0.easeNone</option>
                        <option>Power1.easeOut</option>
                        <option>Power2.easeOut</option>
                        <option>Power3.easeOut</option>
                        <option>Power4.easeOut</option>
                        <option>Bounce.easeOut</option>
                        <option>Back.easeOut</option>
                        <option>Elastic.easeOut</option>
                        <option>SlowMo.ease</option>
                        <option>Circ.easeOut</option>
                        <option>Expo.easeOut</option>
                        <option>Sine.easeOut</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
          <label class="checkbox checkbox-custom">
            Play in infinite loop
            <input
              type="checkbox" 
              id="loop_cinematic" 
              name="loop_cinematic"
              v-model="loopCinematic" 
              v-on:change="setLoopCinematic($event)"
            />
            <div class="checkbox_indicator"></div>
          </label>
              </div>
          </div>
            <div class="table-container">
              <table class="table">
                  <thead>
                    <tr>
                      <th><abbr title="Position">Pos x</abbr></th>
                      <th><abbr title="Position">Pos y</abbr></th>
                      <th><abbr title="Position">Pos z</abbr></th>
                      <th><abbr title="Yaw">yaw</abbr></th>
                      <th><abbr title="Pitch">pitch</abbr></th>
                      <th><abbr title="Roll">roll</abbr></th>
                      <th v-if="this.$store.state.environment.isTimeOfDayEnabled"><abbr title="Time of day">Time of day</abbr></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(cinematic, index) in cinematicSteps" :key="`cinematic-${index}`">
                      <td>{{ cinematic.position.x }}</td>
                      <td>{{ cinematic.position.y }}</td>
                      <td>{{ cinematic.position.z }}</td>
                      <td>{{ cinematic.yaw }}</td>
                      <td>{{ cinematic.pitch }}</td>
                      <td v-if="clientVersion === 'vanilla'"><input 
                        type="text" 
                        v-bind:value="cinematic.roll"
                        v-on:input="setRoll($event, index)"
                        /></td>
                      <td v-if="clientVersion !== 'vanilla'">{{cinematic.roll}}</td>
                      <td v-if="cinematic.environment">
                        <TimeSelector
                          v-bind:hour=cinematic.environment.timeOfDay.hour
                          v-bind:minutes=cinematic.environment.timeOfDay.minutes
                          v-bind:index=index
                        />
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

  const { shell } = require('electron');

  function reportWindowSize() {
    if (this.$refs.table_cinematic) {
      const height = window.innerHeight - 100;
      this.$refs.table_cinematic.style.height = `${height}px`;
    }
  }

  export default {
    name: 'cinematicBuilder',
    components: {
      TimeSelector: require('./inputs/timeSelector.vue'),
      spectateMenu: require('./spectateMenu'),
    },
    methods: {
      open(url) {
        shell.openExternal(url);
      },
      setRoll ({ target: element }, index) {
        this.$store.commit('setRoll', { index, value: element.value });
      },
		  setCinematicSpeed: function({ target: element }) {
        this.$store.commit('setCinematicSpeed', element.value);
      },
      setLoopCinematic: function({ target: element }) {
        this.$store.commit('setLoopCinematic', element.checked);
      },
      setEasing: function({ target: element }) {
        const easing = element.options[element.selectedIndex].text;
        let ease = easing;
        if (ease === 'Back.easeOut') ease = Back.easeOut.config(1.7, 1.7);
        if (ease === 'Elastic.easeOut') ease = Elastic.easeOut.config(1, 1, 0.3, 0.3);
        if (ease === 'SlowMo.ease') ease = SlowMo.ease.config(0.7, 0.7, false);
        this.$store.commit('setEasing', ease);
      }
	  },
    destroyed: function() {
      window.removeEventListener('resize', reportWindowSize);
    },
    mounted: function() {
      reportWindowSize.bind(this)();
      window.addEventListener('resize', reportWindowSize.bind(this));
    },
    data() {
      return { 
        cinematicSteps: this.$store.state.camera.cinematicSteps,
        cinematicSpeed: this.$store.state.camera.cinematicSpeed,
        loopCinematic: this.$store.state.camera.loopCinematic,
        clientVersion: this.$store.state.settings.client,
      };
    },
    watch: {
      cinematicSteps (cameraState) { reportWindowSize.bind(this)(); }
    }
  };
</script>

<style scoped>
  .help {
    color: #626b82;
    margin-top: 0;
  }
  a {
    color: #626b82;
    text-decoration: underline;
  }
  a:hover {
    text-decoration: none;
    color: #ff1a3b;
  }
  .easing {
    margin-top: -2px;
  }
  .label, .label:not(:last-child) {
    margin-bottom: 0;
  }
</style>