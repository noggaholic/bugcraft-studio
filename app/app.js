const shell = require('electron').shell;
const CreateUI = (err, manager) => {
  var app = new Vue({
    el: '#app',
    data: {
      brand: 'Bugcraft Studio',
      section: 'general'
    },
    methods: {
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
      },
      disableCurr: function(section) {
        document.querySelector('a[data-id="' + section + '"]').classList.toggle('is-active');
      },
      sendMessage: (element) => {
        const domElement = element.currentTarget;
        const messageId  = domElement.getAttribute('data-id');
        manager.sendMessage(messageId);
      },
      toggleMenu: () => {
        var burger = document.querySelector('.nav-toggle');
        var menu = document.querySelector('.nav-menu');
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      }
    }
  });
};
