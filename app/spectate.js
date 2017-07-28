'use strict';

const spectateData = () => {
  return {
    spectateSection: 'settings'
  }
};

Vue.component('spectate', {
  data: spectateData,
  methods: {
    switchSection: function(element) {
      const domElement      = element.currentTarget;
      const section         = domElement.getAttribute('data-id');
      const spectateSection = document.querySelector('.spectateSection');
      const currMainSection = spectateSection.innerHTML;
      const currSubSection  = domElement.innerHTML;
      domElement.innerHTML      = currMainSection;
      spectateSection.innerHTML = currSubSection;
      this.spectateSection      = section;

      const spectateSettings = document.querySelector('div[data-id="spectateSettings"]');
      const cinematicBuilder = document.querySelector('div[data-id="cinematicBuilder"]');

      spectateSettings.classList.toggle('hide');
      cinematicBuilder.classList.toggle('hide');
    }
  },
  template: `<div class="columns">
   <div class="column">
      <nav class="navbar">
         <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link spectateSection">
            Camera settings
            </a>
            <div class="navbar-dropdown">
               <a class="navbar-item" v-on:click="switchSection">
               Cinematic builder
               </a>
            </div>
         </div>
      </nav>
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
                  <input type="checkbox" id="toggle_spectate" name="toggle_spectate" data-id="ENABLE_SPECTATOR" />
                  <label for="toggle_spectate"><span></span>Toggle Spectate Mode</label>
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
               <div class="field">
                  <input type="checkbox" id="toggle_follow_target" name="toggle_follow_target" />
                  <label for="toggle_follow_target"><span></span>Follow target</label>
               </div>
            </div>
            <div class="column">
               <label class="label is-normal">Spectate options</label>
            </div>
         </div>
      </div>
      <div data-id="cinematicBuilder" class="hide">
         <table class="table">
            <thead>
               <tr>
                  <th><abbr title="Position">Position</abbr></th>
                  <th>Look at</th>
                  <th><abbr title="Played">Roll</abbr></th>
                  <th><abbr title="Played">Time of day</abbr></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <th>0</th>
                  <th>0</th>
                  <th>0</th>
                  <th>0</th>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</div>`
})
