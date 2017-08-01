'use strict';

const robot     = require('robot-js');
const Keyboard  = robot.Keyboard;
const cinematicBuilderData = () => {
  return {}
};

let skip = false;

/**
 * Refactor this to support multiple keys
 * @type {Number}
 */
var notyet = 0;
function clearTimer() {
  notyet = 0;
}

const checkForKeyStroke = (key) => {
  if (Keyboard.getState(key)) {
    if (notyet === 1) {
      return;
    }
    notyet = 1;
    setTimeout(clearTimer, 300);
    return true;
  }
};

const handleKeyboard = () => {
  if (skip) return;
  if (checkForKeyStroke(robot.KEY_F3)) {
    console.log('F3 pressed')
  }
  setImmediate(handleKeyboard);
};

Vue.component('cinematicBuilder', {
  data: cinematicBuilderData,
  mounted: () => {
    skip = false;
    setImmediate(handleKeyboard);
  },
  beforeDestroy: () => {
    skip = true;
  },
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
