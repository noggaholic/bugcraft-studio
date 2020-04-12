<template>
  <div class="container container-top">
      <div class="columns">
            <div class="column is-one-third">
            <div class="field">
                <label class="label">Window transparency</label>
                <div class="control">
                <input 
                  class="input range ltpurple"
                  v-model="windowTransparency"
                  min="20" 
                  max="100" 
                  step="1" 
                  value="100"
                  v-on:change="setWindowTransparency($event)"
                  v-on:input="setWindowTransparency($event)"
                  type="range" />
                </div>
                <p class="help">From 0.1 to whatever you want.</p>
            </div>
            </div>
            <div class="column">
            <div class="field">
                <label class="label">Set window always on top</label>
                <input 
                    type="checkbox" 
                    id="always_on_top" 
                    name="always_on_top"
                    v-model="alwaysOnTop" 
                    v-on:change="setAlwaysOnTop($event)"
                  />
                <label for="always_on_top"><span></span>Always on top</label>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
  const electron = require('electron');
  const win = electron.remote.getCurrentWindow();
  export default {
    name: 'settings',
    methods: {
      setAlwaysOnTop: function({ target: element }) {
        this.$store.commit('setAlwaysOnTop', element.checked);
        win.setAlwaysOnTop(element.checked);
      },
      setWindowTransparency: function({ target: element }) {
        this.$store.commit('setWindowTransparency', element.value);
        const html = window.document.querySelector('html');
        const body = window.document.querySelector('body');
        const alphaChannel = (element.value / 100);
        console.log('alphaChannel', alphaChannel);
        console.log('html.style.backgroundColor', html.style.backgroundColor);
        console.log('html.style.opacity', html.style.opacity);
        console.log('body.style.backgroundColor', body.style.backgroundColor);
        html.style.backgroundColor = 'transparent';
        html.style.opacity = alphaChannel;
        body.style.backgroundColor = `rgba(26, 26, 26, ${alphaChannel})`;
      },
    },
    data() {
      return {
        alwaysOnTop: this.$store.state.settings.alwaysOnTop,
        windowTransparency: this.$store.state.settings.windowTransparency
      };
    },
  };
</script>
