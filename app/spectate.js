'use strict';

const spectateData = () => {
  return {}
};

Vue.component('spectate', {
  data: spectateData,
  template: `
  <div class="columns">
    <div class="column">
    <nav class="navbar">
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        Camera settings
      </a>

      <div class="navbar-dropdown">
        <a class="navbar-item">
          Cinematic
        </a>
      </div>
    </div>
    </nav>
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
  `
})
