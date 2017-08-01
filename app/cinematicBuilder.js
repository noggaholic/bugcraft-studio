'use strict';

const cinematicBuilderData = () => {
  return {}
};

Vue.component('cinematicBuilder', {
  data: cinematicBuilderData,
  template: `<div>
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
  </div>`
});
