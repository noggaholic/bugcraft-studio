'use strict';

const spectateData = () => {
  return {
    spectateSection: 'settings'
  }
};

Vue.component('spectate', {
  data: spectateData,
  methods: {
    sendMessage: (element) => {
      const domElement = element.currentTarget;
      const messageId  = domElement.getAttribute('data-id');
      manager.sendMessage(messageId);
    },
    setSpeed: (element) => {
      const domElement = element.currentTarget;
      const speed      = domElement.value;
      manager.sendMessage('SET_CAMERA_SPEED', speed);
    },
    switchSection: function(element) {
      const domElement      = element.currentTarget;
      const section         = domElement.getAttribute('data-id');
      const spectateSection = document.querySelector('.spectateSection');
      const currMainSection = spectateSection.innerHTML;
      const currSubSection  = domElement.innerHTML;
      this.spectateSection      = section;

      const spectateSettings = document.querySelector('div[data-id="spectateSettings"]');
      const cinematicBuilder = document.querySelector('div[data-id="cinematicBuilder"]');

      spectateSettings.classList.toggle('hide');
      cinematicBuilder.classList.toggle('hide');
    }
  },
  template: `<div class="container">
    <div class="columns">
     <div class="column">
        <div class="tabs is-boxed">
          <ul>
            <li>
              <a v-on:click="switchSection"  class="spectateSection">
                <span class="icon is-small"><i class="fa fa-video-camera"></i></span>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a v-on:click="switchSection">
                <span class="icon is-small"><i class="fa fa-film"></i></span>
                <span>Cinematic</span>
              </a>
            </li>
          </ul>
        </div>
        <div data-id="spectateSettings" class="">
           <div class="columns">
              <div class="column">
                 <div class="field">
                    <label class="label is-normal">Pan x</label>
                    <p class="control">
                       <input class="input range ltpurple" type="range">
                    </p>
                 </div>
                 <div class="field">
                    <label class="label is-normal">Pan y</label>
                    <p class="control">
                       <input class="input range ltpurple" type="range">
                    </p>
                 </div>
                 <div class="field">
                    <label class="label is-normal">Pan z</label>
                    <p class="control">
                       <input class="input range ltpurple" type="range">
                    </p>
                 </div>
              </div>
              <div class="column">
                 <label class="label is-normal">Spectate options</label>
                 <div class="field">
                    <input type="checkbox" id="toggle_spectate" name="toggle_spectate" data-id="ENABLE_SPECTATOR" v-on:click="sendMessage" />
                    <label for="toggle_spectate"><span></span>Toggle Spectate Mode (F3)</label>
                 </div>
                 <div class="field">
                    <input type="checkbox" id="toggle_collision" name="toggle_collision" />
                    <label for="toggle_collision"><span></span>Toggle Collision</label>
                 </div>
                 <div class="field">
                    <input type="checkbox" id="toggle_look_at_target" name="toggle_look_at_target" />
                    <label for="toggle_look_at_target"><span></span>Look at selected unit</label>
                 </div>
                 <div class="field">
                    <input type="checkbox" id="toggle_follow_target" name="toggle_follow_target" />
                    <label for="toggle_follow_target"><span></span>Follow target</label>
                 </div>
              </div>
              <div class="column">
                 <div class="field">
                    <label class="label is-normal">Speed</label>
                    <p class="control">
                       <input class="input range ltpurple" name="speed" type="range" min="0.01" max="1.4" step="0.005" value="0.7" v-on:input="setSpeed" >
                    </p>
                 </div>
              </div>
           </div>
        </div>
        <div data-id="cinematicBuilder" class="hide">
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
                 <p class="subtitle">Press F5 to play the entire cinematic.</p>
               </article>
              </div>
            </div>
          </div>
        </div>
     </div>
    </div>
  </div>`
})
