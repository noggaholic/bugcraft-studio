<template>
  <div class="container container-top">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label is-normal">Time of day {{timeOfDay.hour}}:{{timeOfDay.minutes}}</label>
            <input 
              :checked="isTimeOfDayEnabled"
              v-model="isTimeOfDayEnabled"
              type="checkbox"
              id="time_of_day"
              name="time_of_day"
              v-on:click="setTimeOfDayStatus"
            />
            <label for="time_of_day"><span></span>Enable time of day</label>
          </div>
          <div class="field">
            <label class="label is-normal">Time of day (hours)</label>
            <p class="control">
              <input
                :disabled="isTimeOfDayEnabled === false"
                class="input range ltpurple" 
                v-tooltip="`Current time: ${timeOfDay.hour}:${timeOfDay.minutes}`" 
                type="range"
                v-on:change="setTimeOfDay($event, 'hour')"
                v-on:input="setTimeOfDay($event, 'hour')"
                min="0"
                max="1"
                step="0.005"
                value="0.5"
                ref="hour"
              >
            </p>
          </div>
          <div class="field">
            <label class="label is-normal">Time of day (minutes)</label>
            <p class="control">
              <input
                :disabled="isTimeOfDayEnabled === false"
                class="input range ltpurple" 
                v-tooltip="`Current time: ${timeOfDay.hour}:${timeOfDay.minutes}`" 
                type="range"
                v-on:change="setTimeOfDay($event, 'minutes')"
                v-on:input="setTimeOfDay($event, 'minutes')"
                min="0"
                max="1"
                step="0.005"
                value="0.5"
                ref="minutes"
              >
            </p>
          </div>
        </div>
        <div class="column render">
          <label class="label is-normal">Render</label>
              <div class="field">
                <input disabled type="checkbox" checked="checked" id="renderer_m2" name="renderer_m2" />
                <label for="renderer_m2"><span></span>Decoration objects (M2)</label>
              </div>
              <div class="field">
                <input disabled type="checkbox" checked="checked" id="renderer_details" name="renderer_details" />
                <label for="renderer_details"><span></span>Details</label>
              </div>
              <div class="field">
                <input disabled type="checkbox" checked="checked" id="renderer_terrain" name="renderer_terrain" />
                <label for="renderer_terrain"><span></span>Terrain</label>
              </div>
              <div class="field">
                <input disabled type="checkbox" checked="checked" id="renderer_wmo" name="renderer_wmo" />
                <label for="renderer_wmo"><span></span>World Model Object (WMO)</label>
              </div>
              <div class="field">
                <input disabled type="checkbox" checked="checked" id="renderer_liquids" name="renderer_liquids" />
                <label for="renderer_liquids"><span></span>Liquids</label>
              </div>
              <div class="field">
                <input disabled type="checkbox" checked="checked" id="renderer_mountains" name="renderer_mountains" />
                <label for="renderer_mountains"><span></span>Mountains</label>
              </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'environment',
    mounted() {
      const hourEl = this.$refs.hour;
      const minutesEl = this.$refs.minutes;
      const currentHour = this.$store.state.environment.timeOfDay.hour;
      const currentMinutes = this.$store.state.environment.timeOfDay.minutes;
      const toHour = (currentHour * 3600) / 86400;
      const toMinutes = (currentMinutes * 60) / 3600;
      hourEl.value = toHour;
      minutesEl.value = toMinutes;
    },
    methods: {
      setTimeOfDayStatus ({ target: element }) {
        const isChecked = element.checked;
        this.$store.commit('setTimeOfDayStatus', isChecked);     
      },
      setTimeOfDay (element, kind) {
        const currentHour = this.$store.state.environment.timeOfDay.hour;
        const currentMinutes = this.$store.state.environment.timeOfDay.minutes;
        const time = element.target.value;
        const toHour = Math.floor(((time / 3600) * 86400));
        const hour = toHour < 23 ? toHour : 23;
        const toMinutes = Math.floor(((time / 60) * 3600));
        const minutes = toMinutes < 59 ? toMinutes : 59;
        const normalized = time * 1440;
        if (kind === 'hour') {
          const timeOfDay = { hour, minutes: currentMinutes, normalized };
          this.timeOfDay = timeOfDay;
          this.$store.commit('setTimeOfDay', timeOfDay);     
        } else if (kind === 'minutes') {
          const timeOfDay = { hour: currentHour, minutes, normalized };
          this.timeOfDay = timeOfDay;
          this.$store.commit('setTimeOfDay', timeOfDay);  
        }
      }
    },
    data() {
      return {
        timeOfDay: this.$store.state.environment.timeOfDay,
        isTimeOfDayEnabled: this.$store.state.environment.isTimeOfDayEnabled,
      };
    },
  };
</script>
