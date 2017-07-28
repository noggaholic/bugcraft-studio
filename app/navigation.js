'use strict';

const navData = () => {
  return {
    brand: 'Bugcraft Studio',
    section: 'general'
  }
};

Vue.component('navigation', {
  data: navData,
  template: `
  <div class="appContainer">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left menu-tabs">
          <span class="nav-item" style="-webkit-app-region: drag;font-size: 1.2rem;">
            {{ brand }}
          </span>
          <a class="nav-item is-tab is-hidden-mobile is-active" data-id="general" v-on:click="setActiveItem">General</a>
          <a class="nav-item is-tab is-hidden-mobile" data-id="spectate" v-on:click="setActiveItem">Spectate</a>
          <a class="nav-item is-tab is-hidden-mobile" data-id="environment" v-on:click="setActiveItem">Environment</a>
          <a class="nav-item is-tab is-hidden-mobile" data-id="faq" v-on:click="setActiveItem">F.A.Q</a>
        </div>
        <span class="nav-toggle" v-on:click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right menu-tabs nav-menu">
          <a class="nav-item is-tab is-hidden-tablet is-active" data-id="general" v-on:click="setActiveItem">General</a>
          <a class="nav-item is-tab is-hidden-tablet" data-id="spectate" v-on:click="setActiveItem">Spectate</a>
          <a class="nav-item is-tab is-hidden-tablet" data-id="environment" v-on:click="setActiveItem">Environment</a>
          <a class="nav-item is-tab is-hidden-tablet" data-id="faq" v-on:click="setActiveItem">F.A.Q</a>
          <a class="nav-item is-tab">
            <figure class="image is-16x16">
              <i class="fa fa-github"></i>
            </figure>
          </a>
          <a class="nav-item is-tab" v-on:click="openLink" href="http://www.twitter.com/k4rliky">
            <figure class="image is-16x16">
              <i class="fa fa-twitter"></i>
            </figure>
          </a>
        </div>
      </div>
    </nav>
    <div class="container wrapper" v-if="section === 'general'">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label is-normal">Camera zoom</label>
            <p class="control">
              <input class="input range ltpurple" type="range">
            </p>
          </div>
          <div class="field">
            <label class="label is-normal">Slow motion (FPS:60)</label>
            <p class="control">
              <input class="input range ltpurple" type="range">
            </p>
          </div>
          <div class="field">
            <label class="label is-normal">Time of day</label>
            <p class="control">
              <input class="input range ltpurple" type="text" placeholder="00:00">
            </p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label is-normal">Attach x</label>
            <p class="control">
              <input class="input range ltpurple" type="range">
            </p>
          </div>
          <div class="field">
            <label class="label is-normal">Attach y</label>
            <p class="control">
              <input class="input range ltpurple" type="range">
            </p>
          </div>
          <div class="field">
            <label class="label is-normal">Attach z</label>
            <p class="control">
              <input class="input range ltpurple" type="range">
            </p>
          </div>
        </div>
        <div class="column render">
          <label class="label is-normal">Render</label>
              <div class="field">
                <input type="checkbox" checked="checked" id="renderer_m2" name="renderer_m2" />
                <label for="renderer_m2"><span></span>Decoration objects (M2)</label>
              </div>
              <div class="field">
                <input type="checkbox" checked="checked" id="renderer_details" name="renderer_details" />
                <label for="renderer_details"><span></span>Details</label>
              </div>
              <div class="field">
                <input type="checkbox" checked="checked" id="renderer_terrain" name="renderer_terrain" />
                <label for="renderer_terrain"><span></span>Terrain</label>
              </div>
              <div class="field">
                <input type="checkbox" checked="checked" id="renderer_wmo" name="renderer_wmo" />
                <label for="renderer_wmo"><span></span>World Model Object (WMO)</label>
              </div>
              <div class="field">
                <input type="checkbox" checked="checked" id="renderer_liquids" name="renderer_liquids" />
                <label for="renderer_liquids"><span></span>Liquids</label>
              </div>
              <div class="field">
                <input type="checkbox" checked="checked" id="renderer_mountains" name="renderer_mountains" />
                <label for="renderer_mountains"><span></span>Mountains</label>
              </div>
        </div>
      </div>
    </div>
    <div class="container wrapper" v-if="section === 'spectate'">
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
    </div>
    <div class="container wrapper" v-if="section === 'environment'">Environment</div>
    <div class="container wrapper content" v-if="section === 'faq'">
      <h1>Frequently Asked Questions and Answers.</h1>
      <h2>Author and story</h2>
      <p>@k4rliky</p>
    </div>
  </div>
  `,
  methods: {
    openLink: function(event) {
      event.preventDefault();
      shell.openExternal(event.currentTarget.href);
    },
    setActiveItem: function(element) {
      const domElement    = element.currentTarget;
      const section       = domElement.getAttribute('data-id');
      const activeSection = this.section;
      this.section = section;
      if (activeSection !== this.section) {
        this.disableCurr(activeSection);
      }
      domElement.classList.toggle('is-active');
      console.log("this.$emit('setSection', this.section);", this.section)
      AppEvent.$emit('setSection', this.section);
    },
    disableCurr: function(section) {
      document.querySelector('a[data-id="' + section + '"]').classList.toggle('is-active');
    },
    toggleMenu: () => {
      var burger = document.querySelector('.nav-toggle');
      var menu = document.querySelector('.nav-menu');
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    },
    sendMessage: (element) => {
      const domElement = element.currentTarget;
      const messageId  = domElement.getAttribute('data-id');
      manager.sendMessage(messageId);
    }
  }
})
