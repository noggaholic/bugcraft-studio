<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'bugcraft-studio',
    mounted() {
      const store = this.$store;
      launch((error, AppManager) => {
        if (error) {
          if (this.$route.path !== '/error') this.$router.push({ name: 'error', params: { error: error.message }});
          return;
        }
        store.commit('setGameInfo', AppManager.Game);
        store.commit('setCore', AppManager);
      });
    }
  };
</script>

<style lang="scss">
  html {
    overflow-y: auto;
  }

  /**
  * Body
  */
  html, body {
    background: #161b26;
    color: #fff;
    font-family: 'Source Sans Pro', sans-serif;
  }

  /**
  * Container
  */
  .container {
    padding: 5px 25px;
  }

  /**
   * Label
   */
  .label {
    color: #e8e8ea;
    font-size: 14px;
  }

  /**
  * Input
  */
  .input {
    border: none;
    background: #10141c;
    color: #e8e8ea;
    font-size: 14px;
    border: 1px solid #1e2433;
    width: initial;
  }

  .input[disabled] {
    background: #10141c;
    border: 1px solid #1e2433;
  }

  .input:hover {
    border: 1px solid #1e2433;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /**
  * NavBar
  */

  .navbar {
    background: #1e2433;
  }
  .navbar, .navbar-menu, .navbar-start, .navbar-end {
    flex-direction: column;
    align-items: center;
  }
  .navbar-item {
    color: #e8e8ea;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-bottom: 5px;
  }
  .navbar-item:hover {
    color: #e8e8ea;
  }

  .navbar-item:hover {
    background-color: #10141c;
    border-radius: 5px;
  }
  .navbar-item.router-link-exact-active {
    background-color: #10141c;
    border-radius: 5px;
  }
  .router-link-exact-active > .navbar-menu-icon {
    color: #FF1A3B;
  }

  .navbar-menu-item {
    font-size: 14px;
  }

  .navbar-start > .navbar-item, .navbar-link {
    display: block;
    text-align: center;
    width: 95px;
  }

  /**
  * Sidebar
  */
  .sidenav {
    height: 100%;
    width: 160px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #1e2433;
    overflow: hidden;
  }
  .main {
    margin-left: 160px;
  }

  /**
  * Tabs
  */
  .tabs a {
    color: #e8e8ea;
    padding: 10px 25px;
    font-size: 14px;
  }
  .tabs a:hover {
    color: #e8e8ea;
  }
  .tabs.is-boxed {
    border-bottom: 1px solid #1e2433;
  }
  .tabs.is-boxed a {
    border: none;
    border-radius: inherit;
    border-bottom: 3px solid #1a1e21;
  }
  .tabs.is-boxed a:hover {
    background-color: transparent;
    border: none;
    border-radius: inherit;
    border-bottom: 3px solid #ff1a3b;
  }
  .tabs.is-boxed a.router-link-exact-active {
    border: none;
    border-radius: inherit;
    border-bottom: 3px solid #ff1a3b;
  }
  .tabs ul {
    border: none;
  }
  /**
   * Box
   */
  .box {
    background-color: #161b26;
    color: #e8e8ea;
    border-left: 6px solid #ff1a3b;
  }

  .title {
    color: #e8e8ea;
  }
  
  .subtitle {
    color: #e8e8ea;
  }

  /**
   * Button
   */
   .button {
      border: none;
      background: #10141c;
      color: #e8e8ea;
      font-size: 14px;
      border: 1px solid #1e2433;
      width: initial;
   }

   .button:hover, .button:active, .button:focus {
      color: #e8e8ea;
      border: 1px solid #1e2433;
   }

  /**
   * Input range
   */
  input[type=range] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
    background: transparent;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    background: #ff1a3b;
  }
  input[type=range]::-webkit-slider-thumb {
    border: 2px solid #1e2433;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: #161b26;
    -webkit-appearance: none;
    margin-top: -10px;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.24);
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #ff1a3b;
  }
  input[type=range]:disabled {
    background: transparent;
  }
  input[type=range]:disabled::-webkit-slider-runnable-track {
    border: 1px solid #d7dbdd;
    background-color: transparent;
    opacity: 0.4;
  }
  input[type=range]:disabled::-webkit-slider-thumb {
    background-color: transparent;
    border: 1px solid #d7dbdd;
  }

  /**
    * Table
    */
  .table {
    width: 100%;
    background: #10141c;
    color: white;
  }
  .table thead td, .table thead th {
    color: white;
    font-size: 0.9em;
  }
  .table td, .table th {
    font-size: 0.9em;
  }

  /**
   * Checkbox
   */
  .checkbox {
      display: block;
      position: relative;
      padding-left: 30px;
      margin-bottom: 5px;
      cursor: pointer;
  }
  .checkbox input {
      position: absolute;
      z-index: -1;
      opacity: 0;
  }
  .checkbox_indicator {
      position: absolute;
      top: 2px;
      left: 0;
      height: 20px;
      width: 20px;
      background: #10141c;
      border: 1px solid #1e2433;
  }
  .checkbox:hover input ~ .checkbox_indicator,
  .checkbox input:focus ~ .checkbox_indicator {
      background: #10141c;
  }

  .checkbox input:checked ~ .checkbox_indicator {
      background: #ff1a3b;
  }

  .checkbox input:disabled ~ .checkbox_indicator {
      background: #10141c;
      opacity: 0.6;
      cursor: no-drop;
  }
  .checkbox_indicator:after {
      box-sizing: unset;
      content: '';
      position: absolute;
      display: none;
  }
  .checkbox input:checked ~ .checkbox_indicator:after {
      display: block;
  }
  .checkbox-custom .checkbox_indicator:after {
      left: 7px;
      top: 3px;
      width: 3px;
      height: 8px;
      border: solid #ffffff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
  }
  .checkbox-custom input:disabled ~ .checkbox_indicator:after {
      border-color: #7b7b7b;
  }
  .checkbox-custom .checkbox_indicator::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 4.5rem;
      height: 4.5rem;
      margin-left: -1.3rem;
      margin-top: -1.3rem;
      background: #ff1a3b;
      border-radius: 3rem;
      opacity: 0.6;
      z-index: 99999;
      transform: scale(0);
  }
  .checkbox:hover, .radio:hover {
      color: #fff;
  }

 /**
  * Tooltip
  */
  .tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

/*
 * Scrollbar
 */

body::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #1e2433;
}

body::-webkit-scrollbar
{
	width: 12px;
	background-color: #1e2433;
}

body::-webkit-scrollbar-thumb
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #161b26;
}
</style>
