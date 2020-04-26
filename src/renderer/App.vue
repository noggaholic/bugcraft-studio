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
        store.commit('setCore', AppManager);
      });
    }
  };
</script>

<style>
  /* CSS */
</style>

<style lang="scss">
 html {
   overflow: auto;
 }
</style>