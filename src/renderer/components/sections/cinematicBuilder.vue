<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="tabs is-boxed">
          <spectateMenu></spectateMenu>
        </div>
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
              <div class="column is-one-third">
                <div class="field">
                  <label class="label">Cinematic duration</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      ref="cinematic_speed"
                      v-model="cinematicSpeed"
                      v-on:input="setCinematicSpeed($event)"
                      placeholder="Value in seconds, defaults to 10.">
                  </div>
                  <p class="help">This sets how much the cinematic will last.</p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <input 
                    type="checkbox" 
                    id="loop_cinematic" 
                    name="loop_cinematic"
                    v-model="loopCinematic" 
                    v-on:change="setLoopCinematic($event)"
                  />
                  <label for="loop_cinematic"><span></span>Loop cinematic</label>
                  <p class="help">Cinematic plays in infinite loop</p>
                </div>
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
                        {{cinematic.environment.timeOfDay.hour}}:{{cinematic.environment.timeOfDay.minutes}}
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  function reportWindowSize() {
    if (this.$refs.table_cinematic) {
      const height = window.innerHeight - 100;
      this.$refs.table_cinematic.style.height = `${height}px`;
    }
  }

  export default {
    name: 'cinematicBuilder',
    beforeCreate: () => {
      
    },
    beforeDestroy: () => {
      
    },
    methods: {
      setRoll ({ target: element }, index) {
        this.$store.commit('setRoll', { index, value: element.value });
      },
		  setCinematicSpeed: function({ target: element }) {
        this.$store.commit('setCinematicSpeed', element.value);
      },
      setLoopCinematic: function({ target: element }) {
        this.$store.commit('setLoopCinematic', element.checked);
      },
	  },
    destroyed: function() {
      window.removeEventListener('resize', reportWindowSize);
    },
    mounted: function() {
      reportWindowSize.bind(this)();
      window.addEventListener('resize', reportWindowSize.bind(this));
    },
    components: {
      spectateMenu: require('./spectateMenu'),
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

<style>

</style>