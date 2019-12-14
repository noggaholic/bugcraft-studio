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
  const cinematicSteps = [];

  const playCinematic = (cinematicSteps) => {
    const firstStep = cinematicSteps[0];
    const cinematicValues = {
      x: firstStep.position.x,
      y: firstStep.position.y,
      z: firstStep.position.z,
    };

    const keyframes = cinematicSteps.map((step) => {
      return {
        x: step.position.x,
        y: step.position.y,
        z: step.position.z,
      };
    });

    const onUpdate = () => {
      BugCraft.sendMessage('PLAY_CINEMATIC', cinematicValues);
    };

    const tween = TweenLite.to(cinematicValues, 8, {
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
      onComplete: () => console.log('onComplete'),
      onUpdate,
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
    mounted: () => {
      BugCraft.sendMessage('ADD_CINEMATIC_LISTENER', (event) => {
        console.log('event', event);
        if (event === 'ADD_KEYFRAME') cinematicSteps.push(BugCraft.getMessage('CAMERA_VIEW'));
        if (event === 'PLAY') playCinematic(cinematicSteps);
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
