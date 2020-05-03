<template>
  <ul class="settingsMenu">
    <li>
      <router-link to="/settings" class="nav-item is-tab" v-bind:class="{ 'is-active': settingsActivated }">
        <span class="icon is-small"><i class="fa fa-video"></i></span>
        <span>Settings</span>
      </router-link>
    </li>
    <li>
      <router-link to="/settings/laboratory" class="nav-item is-tab"  v-bind:class="{ 'is-active': laboratoryActivated }">
        <span class="icon is-small"><i class="fa fa-film"></i></span>
        <span>Laboratory</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'settingsMenu',
    data() {
      const data = {
        settingsActivated: false,
        laboratoryActivated: false,
      };
      if (this.$route.path === '/settings') {
        data.settingsActivated = true;
      } else if (this.$route.path === '/settings/laboratory') {
        data.laboratoryActivated = true;
      }
      return data;
    },
  };
</script>
