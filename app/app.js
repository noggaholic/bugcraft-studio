const shell = require('electron').shell;
const launch = (process, module, memory, window) => {

  // var burger = document.querySelector('.nav-toggle');
  // var menu = document.querySelector('.nav-menu');
  // burger.addEventListener('click', function() {
  //     burger.classList.toggle('is-active');
  //     menu.classList.toggle('is-active');
  // });

  /**
   * Add a button to shake the camera like this https://www.youtube.com/watch?v=JNOxz9paA6E
   */

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
      toggleMenu: () => {
        var burger = document.querySelector('.nav-toggle');
        var menu = document.querySelector('.nav-menu');
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      }
    }
  });
};
