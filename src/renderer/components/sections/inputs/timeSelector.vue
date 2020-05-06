<template>
  <div
    class="time_selector"
    v-on:mousedown="mousedown"
    v-on:mouseup="mouseup"
  >
    {{this.$props.hour}}:{{this.$props.minutes}}
  </div>
</template>

<script>

  function timeSelectorData() {
    const data = {};
    return data;
  }
  
  const createMouseMove = (props) => {
    return (e) => {
      e.stopPropagation();
      const direction = getDirection(e);
      if (!direction) return;
      if (direction === 'up') {
        let hour = app.$store.getters.timeOfDay.hour;
        let minutes = app.$store.getters.timeOfDay.minutes + 1;
        if (minutes === 60) {
          minutes = 0;
          hour += 1;
        }
        props.hour = hour;
        props.minutes = minutes;
        const timeOfDay = { hour, minutes };
        app.$store.commit('setTimeOfDay', timeOfDay);  
        return;
      }
      let hour = app.$store.getters.timeOfDay.hour;
      let minutes = app.$store.getters.timeOfDay.minutes - 1;
      if (minutes === 0) {
        minutes = 59;
        hour -= 1;
      }
      const timeOfDay = { hour, minutes };
      app.$store.commit('setTimeOfDay', timeOfDay);  
    };
  };
  
  let mouseY = 0;
  function getDirection(e) {
    var direction;
    var rect = e.target.getBoundingClientRect();
    var y;
    if (e.pageY < mouseY) {
      y = e.clientY - rect.top;
      direction = 'up';
    } else if (e.pageY > mouseY) {
      y = e.clientY + rect.top;
      direction = 'down';
    }
    mouseY = e.pageY;
    if (mouseY % 2) return;
    return direction;
  }

  export default {
    name: "TimeSelector",
    props: ['hour', 'minutes', 'index'],
    data: timeSelectorData,
    mounted() {
      this.mouseMove = createMouseMove(this.$props);
    },
    methods: {
      mousedown(e) {
        document.body.addEventListener('mousemove', this.mouseMove);
        document.body.addEventListener('mouseup', mouseup);
      },
      mouseup(e) {
        document.body.removeEventListener('mousemove', this.mouseMove);
      },
    },
    destroyed() {
      document.body.removeEventListener('mousemove', this.mouseMove);
    }
  };
</script>

<style>
  .time_selector {
    cursor: row-resize;
  }
</style>
