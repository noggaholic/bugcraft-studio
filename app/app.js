'use strict';

const shell = require('electron').shell;

window.AppEvent = new Vue({});

const CreateUI = (err, manager) => {
  window.app = new Vue({
    el: '#app',
    data: {
      brand: 'Bugcraft Studio',
      section: 'general'
    },
    template: '<navigation></navigation>'
  });
};
