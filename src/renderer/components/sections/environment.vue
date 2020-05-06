<template>
  <div class="container">
    <div class="columns columns-top">
      <div class="column render is-one-third">
        <label class="label is-normal">Render</label>
        <label class="checkbox checkbox-custom" v-tooltip="'Not implemented yet'">
          <input
            disabled
            type="checkbox"
            class="checkbox checkbox-custom"
            checked="checked"
            name="renderer_m2"
          />
          <label for="renderer_m2">
            <span></span>Decoration objects (M2)
          </label>
          <div class="checkbox_indicator no-drop"></div>
        </label>
        <label class="checkbox checkbox-custom" v-tooltip="'Not implemented yet'">
          <input
            disabled
            type="checkbox"
            class="checkbox checkbox-custom"
            checked="checked"
            name="renderer_details"
          />
          <label for="renderer_details">
            <span></span>Details
          </label>
          <div class="checkbox_indicator no-drop"></div>
        </label>
        <label class="checkbox checkbox-custom" v-tooltip="'Not implemented yet'">
          <input
            disabled
            type="checkbox"
            class="checkbox checkbox-custom"
            checked="checked"
            name="renderer_terrain"
          />
          <label for="renderer_terrain">
            <span></span>Terrain
          </label>
          <div class="checkbox_indicator no-drop"></div>
        </label>
        <label class="checkbox checkbox-custom" v-tooltip="'Not implemented yet'">
          <input
            disabled
            type="checkbox"
            class="checkbox checkbox-custom"
            checked="checked"
            name="renderer_wmo"
          />
          <label for="renderer_wmo">
            <span></span>World Model Object (WMO)
          </label>
          <div class="checkbox_indicator no-drop"></div>
        </label>
        <label class="checkbox checkbox-custom" v-tooltip="'Not implemented yet'">
          <input
            disabled
            type="checkbox"
            class="checkbox checkbox-custom"
            checked="checked"
            name="renderer_liquids"
          />
          <label for="renderer_liquids">
            <span></span>Liquids
          </label>
          <div class="checkbox_indicator no-drop"></div>
        </label>
        <label class="checkbox checkbox-custom" v-tooltip="'Not implemented yet'">
          <input
            disabled
            type="checkbox"
            class="checkbox checkbox-custom"
            checked="checked"
            name="renderer_mountains"
          />
          <label for="renderer_mountains">
            <span></span>Mountains
          </label>
          <div class="checkbox_indicator no-drop"></div>
        </label>
      </div>
      <div class="column">
        <div class="field">
          <label class="label is-normal">Time of day ({{timeOfDay.hour}}:{{timeOfDay.minutes}})</label>
          <label class="checkbox checkbox-custom">
            Enable time of day
            <input
              type="checkbox"
              :checked="isTimeOfDayEnabled"
              v-model="isTimeOfDayEnabled"
              name="time_of_day"
              v-on:click="setTimeOfDayStatus"
            />
            <div class="checkbox_indicator"></div>
          </label>
        </div>
        <div v-if="isTimeOfDayEnabled">
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
              />
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
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "environment",
  methods: {
    setTimeOfDayStatus({ target: element }) {
      const isChecked = element.checked;
      this.$store.commit("setTimeOfDayStatus", isChecked);
    },
    setTimeOfDay(element, kind) {
      const currentHour = this.$store.state.environment.timeOfDay.hour;
      const currentMinutes = this.$store.state.environment.timeOfDay.minutes;
      const time = element.target.value;
      const toHour = Math.floor((time / 3600) * 86400);
      const hour = toHour < 23 ? toHour : 23;
      const toMinutes = Math.floor((time / 60) * 3600);
      const minutes = toMinutes < 59 ? toMinutes : 59;
      if (kind === "hour") {
        const timeOfDay = { hour, minutes: currentMinutes };
        this.timeOfDay = timeOfDay;
        this.$store.commit("setTimeOfDay", timeOfDay);
      } else if (kind === "minutes") {
        const timeOfDay = { hour: currentHour, minutes };
        this.timeOfDay = timeOfDay;
        this.$store.commit("setTimeOfDay", timeOfDay);
      }
    }
  },
  watch: {
    isTimeOfDayEnabled(isEnabled) {
      if (!isEnabled) return;
      const refs = this.$refs;
      setTimeout(() => {
        const hourEl = refs.hour;
        const minutesEl = refs.minutes;
        const currentHour = this.$store.state.environment.timeOfDay.hour;
        const currentMinutes = this.$store.state.environment.timeOfDay.minutes;
        const toHour = (currentHour * 3600) / 86400;
        const toMinutes = (currentMinutes * 60) / 3600;
        hourEl.value = toHour;
        minutesEl.value = toMinutes;
      });
    }
  },
  data() {
    return {
      timeOfDay: this.$store.state.environment.timeOfDay,
      isTimeOfDayEnabled: this.$store.state.environment.isTimeOfDayEnabled
    };
  }
};
</script>

<style>
.columns-top {
  margin-top: auto;
}
</style>