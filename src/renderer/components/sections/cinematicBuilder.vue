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
          <div v-if="cinematicSteps.length">
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
  const BugCraft = window.BugCraft;

  const playCinematic = (cinematicSteps) => {
    const firstStep = cinematicSteps[0];
    console.log('# firstStep', firstStep);
    const cinematicValues = {
      x: firstStep.position.x,
      y: firstStep.position.y,
      z: firstStep.position.z,
      viewMatrix00: firstStep.viewMatrix[0][0],
      viewMatrix01: firstStep.viewMatrix[0][1],
      viewMatrix02: firstStep.viewMatrix[0][2],
      viewMatrix10: firstStep.viewMatrix[1][0],
      viewMatrix11: firstStep.viewMatrix[1][1],
      viewMatrix12: firstStep.viewMatrix[1][2],
      viewMatrix20: firstStep.viewMatrix[2][0],
      viewMatrix21: firstStep.viewMatrix[2][1],
      viewMatrix22: firstStep.viewMatrix[2][2],
    };

    const keyframes = cinematicSteps.map((step) => {
      return {
        x: step.position.x,
        y: step.position.y,
        z: step.position.z,
        viewMatrix00: step.viewMatrix[0][0],
        viewMatrix01: step.viewMatrix[0][1],
        viewMatrix02: step.viewMatrix[0][2],
        viewMatrix10: step.viewMatrix[1][0],
        viewMatrix11: step.viewMatrix[1][1],
        viewMatrix12: step.viewMatrix[1][2],
        viewMatrix20: step.viewMatrix[2][0],
        viewMatrix21: step.viewMatrix[2][1],
        viewMatrix22: step.viewMatrix[2][2],
      };
    });

    BugCraft.sendMessage('START_CINEMATIC');
    const tween = TweenLite.to(cinematicValues, 20, {
      bezier: {
        values: keyframes,
        curviness: 0,
        type: 'soft',
        timeResolution: 0,
      },
      ease: {
        base: 'Power0',
        sub: 'easeNone',
        configurable: null,
      },
      onComplete: () => BugCraft.sendMessage('STOP_CINEMATIC'),
      onUpdate: () => BugCraft.sendMessage('PLAY_CINEMATIC_STEP', cinematicValues)
    });
  };

  export default {
    name: 'cinematicBuilder',
    beforeCreate: () => {
      BugCraft.sendMessage('TOGGLE_CINEMATIC_BUILDER');
    },
    beforeDestroy: () => {
      BugCraft.sendMessage('TOGGLE_CINEMATIC_BUILDER');
    },
    mounted: function() {
      console.log('# this.$store.state.camera.cinematicSteps', this.$store.state.camera.cinematicSteps);
      BugCraft.sendMessage('ADD_CINEMATIC_LISTENER', function(event) {
        if (event === 'ADD_KEYFRAME') this.$store.commit('addCinematicStep', BugCraft.getMessage('CAMERA_VIEW'));
        if (event === 'PLAY') playCinematic(this.$store.state.camera.cinematicSteps);
        if (event === 'CLEAR') this.$store.commit('cleanCinematicSteps');
      }.bind(this));
    },
    components: {
      spectateMenu: require('./spectateMenu'),
    },
    data() {
      return { cinematicSteps: this.$store.state.camera.cinematicSteps };
    },
  };
</script>
