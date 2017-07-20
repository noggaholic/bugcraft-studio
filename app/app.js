const shell = require('electron').shell;

window.AppEvent = new Vue({});

const CreateUI = (err, manager) => {
  window.app = new Vue({
    el: '#app',
    data: {
      brand: 'Bugcraft Studio',
      section: 'general'
    },
    methods: {
      sendMessage: (element) => {
        const domElement = element.currentTarget;
        const messageId  = domElement.getAttribute('data-id');
        manager.sendMessage(messageId);
      }
    },
    created: () => {
      AppEvent.$on('setSection', (section) => {
         this.section = section;
      });
    }
  });
};
