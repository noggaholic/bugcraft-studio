'use strict';

const shell = require('electron').shell;

const CreateUI = (err, manager) => {
  window.app = new Vue({
    el: '#app',
    data: {
      brand: 'Bugcraft Studio',
      section: 'general'
    },
    mounted: () => {
      const loading = document.getElementById('loading');
      loading.outerHTML = "";
    },
    template: '<navigation></navigation>'
  });
};
