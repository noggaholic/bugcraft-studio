<template>
  <ul class="spectateMenu">
    <li>
      <router-link to="/spectate" class="nav-item is-tab is-hidden-mobile" v-bind:class="{ 'is-active': spectateActived }">
        <span class="icon is-small"><i class="fa fa-video"></i></span>
        <span>Settings</span>
      </router-link>
    </li>
    <li>
      <router-link to="/spectate/cinematicBuilder" class="nav-item is-tab is-hidden-mobile"  v-bind:class="{ 'is-active': cinematicBuilderActived }">
        <span class="icon is-small"><i class="fa fa-film"></i></span>
        <span>Cinematic mode</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'spectateMenu',
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
