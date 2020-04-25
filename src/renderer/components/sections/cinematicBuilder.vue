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
          <div ref="table_cinematic" :class="{ 'is-hidden' : cinematicSteps.length === 0}">
          </div>
      </div>
      </div>
  </div>
</template>

<script>
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

    },
    mounted: function() {
      const table_cinematic = this.$refs.table_cinematic;
      const scene = window.scene;
      const timeline = new Timeline(scene, table_cinematic);
      window.timeline = timeline;
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
      cinematicSteps (cameraState) {
        const scene = window.scene;
        const table_cinematic = this.$refs.table_cinematic;
        if (cameraState.length === 0) table_cinematic.classList.add('is-hidden');
        if (cameraState.length === 1) table_cinematic.classList.remove('is-hidden');

        const items = cameraState.reduce((acc, item, index) => {
          acc[index] = {
            x: item.position.x,
            y: item.position.y,
            z: item.position.z,
            viewMatrix00: item.viewMatrix[0][0],
            viewMatrix01: item.viewMatrix[0][1],
            viewMatrix02: item.viewMatrix[0][2],
            viewMatrix10: item.viewMatrix[1][0],
            viewMatrix11: item.viewMatrix[1][1],
            viewMatrix12: item.viewMatrix[1][2],
            viewMatrix20: item.viewMatrix[2][0],
            viewMatrix21: item.viewMatrix[2][1],
            viewMatrix22: item.viewMatrix[2][2],
          };
          return acc; 
        }, {});
        scene.removeItem("camera");
        scene.set({ camera: items } );
        window.timeline.update();
      }
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

  body .scenejs-editor-timeline {
    max-height: 600px;
    width: 100%;
    overflow: auto;
  }

</style>