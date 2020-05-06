<template>
  <ul>
    <li>
      <router-link to="/spectate" class="nav-item is-tab" v-bind:class="{ 'is-active': spectateActived }">
        <span class="icon is-small"><i data-feather="video"></i></span>
        <span>Settings</span>
      </router-link>
    </li>
    <li>
      <router-link to="/spectate/cinematicBuilder" class="nav-item is-tab" v-bind:class="{ 'is-active': cinematicBuilderActived }">
        <span class="icon is-small"><i data-feather="film"></i></span>
        <span>Cinematic builder</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'spectateMenu',
    mounted() {
      feather.replace({  width: "16", height: "16" })
    },
    data() {
      const data = {
        spectateActived: false,
        cinematicBuilderActived: false,
      };
      if (this.$route.path === '/spectate') {
        data.spectateActived = true;
      } else if (this.$route.path === '/spectate/cinematicBuilder') {
        data.cinematicBuilderActived = true;
      }
      return data;
    },
  };
</script>

<style>
</style>
