<template>
  <div class="error">
    <div class="wrapper">
      <div class="fatal-description">
        <img src="../assets/mpq.png" class="error-img" alt="Nogg-aholic forever.">
        <h1 style="-webkit-app-region: drag;">A fatal error has ocurred</h1>
        <h2>Error description:</h2>
        <p class="description">{{error ? error : 'No error found :('}}</p>
        <p>If you don't know how to fix it, please open an issue here: 
          <a 
            v-on:click="open('https://github.com/noggaholic/bugcraft-studio')"
          >https://github.com/noggaholic/bugcraft-studio</a>
        </p>
        <button class="err-button" v-on:click="exit()">Close BugCraft Studio</button>
      </div>
    </div>
  </div>
  <!-- <div class="card card--default is-active">
  <div class="card__header">
    <img class="card__img"..../>
    <h1 class="card__title"></h1>
  </div>
  <div class="card__body"></div>
</div> -->
</template>
<script>
  const { shell, remote } = require('electron');

  export default {
    name: 'error',
    data() {
      return { error: this.$route.params.error };
    },
    methods: {
      exit() {
        let w = remote.getCurrentWindow()
        w.close();
      },
      open(link) {
        shell.openExternal(link);
      }
    },
  };
</script>

<style scoped>
  .error {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 0px 30px;
  }

  .wrapper {
    max-width: 760px;
    width: 100%; 
    margin: 20px auto;
    transform: scale(0.8);
  }
  .fatal-description {
    max-width: 960px;
    height: 375px;
    margin: 0;
    box-shadow: 0px 0px 8px 1px #252525;
    background: #363636;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-size: 48px;
    margin: 0;
    padding: 0;
  }
  h2 {
    font-size: 28px;
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 16px;
    margin: 16px auto 24px;
    text-align: center;
  }
  .err-button {
    border-radius: 5px;
    padding: 10px 10px 15px 10px;
    font-size: 16px;
    font-size: 16px;
    cursor: pointer;
    background:#690707;
    color: #fff;
    border: 1px solid black;
    box-shadow: 0 4px 8px 0#252525;
  }
  .err-button:hover {
    border-radius: 5px;
    cursor: pointer;
    background:rgb(70, 7, 7);
    color: #fff;
    border: 1px solid black;
    box-shadow: 0 4px 8px 0#252525;
  }
  .error-img {
    width: 80px;
    height: 100px;
  }
  .description {
    color: red;
  }
</style>
