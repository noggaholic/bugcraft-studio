'use strict';

const genData = () => {
  return {}
};

Vue.component('general', {
  data: genData,
  template: `
  <div class="container">
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
  `
})
