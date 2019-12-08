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
          <div v-if="cinematicSteps.length" class="column table-container">
            <table class="table">
              <tr v-for="(cinematic, index) in cinematicSteps.slice().reverse()" :key="`cinematic-${index}`">
                <td>{{ cinematic}}</td>
              </tr>
            </table>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
  const BugCraft = window.BugCraft;
  const cinematicSteps = [];
  export default {
    name: 'cinematicBuilder',
    beforeCreate: () => {
      BugCraft.sendMessage('TOGGLE_CINEMATIC_BUILDER');
    },
    beforeDestroy: () => {
      BugCraft.sendMessage('TOGGLE_CINEMATIC_BUILDER');
    },
    mounted: () => {
      BugCraft.sendMessage('ADD_CINEMATIC_LISTENER', (event) => {
        if (event === 'ADD_KEYFRAME') {
          cinematicSteps.push(Object.assign({}, BugCraft.getMessage('CAMERA_VIEW')));
          console.log('Add keyframe', cinematicSteps);
        }
        if (event === 'PLAY') console.log('Playing cinematic...');
      });
    },
    components: {
      spectateMenu: require('./spectateMenu'),
    },
    data() {
      return { cinematicSteps };
    },
  };
</script>
