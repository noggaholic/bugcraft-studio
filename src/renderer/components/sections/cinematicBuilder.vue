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
                  <label class="label">Cinematic speed</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      ref="cinematic_speed"
                      v-model="cinematicSpeed"
                      v-on:input="setCinematicSpeed($event)"
                      placeholder="Value in seconds, default to 10.">
                  </div>
                  <p class="help">From 0.1 to whatever you want.</p>
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(cinematic, index) in cinematicSteps.slice().reverse()" :key="`cinematic-${index}`">
                      <td>{{ cinematic.position.x }}</td>
                      <td>{{ cinematic.position.y }}</td>
                      <td>{{ cinematic.position.z }}</td>
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
        loopCinematic: this.$store.state.camera.loopCinematic
      };
    },
    watch: {
      cinematicSteps (cameraState) { reportWindowSize.bind(this)(); }
    }
  };
</script>

<style>
  table {
    width: 100%;
  }
  .is-scrollable {
    overflow: auto;
  }

  .is-scrollable::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: rgb(49, 49, 49);
  }

  .is-scrollable::-webkit-scrollbar {
    width: 12px;
    background-color: rgb(49, 49, 49);
  }

  .is-scrollable::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }

</style>