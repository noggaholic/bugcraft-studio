<template>
  <div class="container">
    <div class="columns columns-top">
      <div class="column is-one-fifth">
        <div class="render">
          <div>
            <label class="label is-normal">
              <div class="render_flags">
                <div class="render_flags_title">Render flags</div>
                <div v-tooltip="`${renderflagsHelp}`"><i data-feather="help-circle"></i></div>
              </div>
              <div class="render_flags_subtitle">hex 0 to 0xFF</div>
            </label>
            <div class="byteSelectors">
              <ByteSelector @upRenderFlags="upRenderFlags" @downRenderFlags="downRenderFlags" v-bind:byte="renderflags[0]" index=0 />
              <ByteSelector @upRenderFlags="upRenderFlags" @downRenderFlags="downRenderFlags" v-bind:byte="renderflags[1]" index=1 />
              <ByteSelector @upRenderFlags="upRenderFlags" @downRenderFlags="downRenderFlags" v-bind:byte="renderflags[2]" index=2 />
              <ByteSelector @upRenderFlags="upRenderFlags" @downRenderFlags="downRenderFlags" v-bind:byte="renderflags[3]" index=3 />
            </div>
          </div>
          <div class="buttons">
            <button class="button random" v-on:click="copyRender" v-tooltip="`Copy render flags to clipboard`"><i data-feather="clipboard"></i></button>
            <button class="button random" v-on:click="setRenderToRandom" v-tooltip="`Set render flags to a random value`"><i data-feather="shuffle"></i></button>
            <button class="button random" v-on:click="resetRender" v-tooltip="`Reset render flags to default`"><i data-feather="refresh-ccw"></i></button>
          </div>
        </div>
      </div>
      <div class="column is-one-third">
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
const { clipboard } = require('electron')
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  name: "environment",
  components: {
      ByteSelector: require('./inputs/byteSelector'),
  },
  mounted() {
    feather.replace({  width: "20", height: "20", 'stroke-width': 2, color: '#626b82' });
    if (!this.$store.getters.core) return;
    const { GetRenderFlags } = this.$store.getters.core.environment;
    const renderflags = [
      GetRenderFlags(0), 
      GetRenderFlags(1), 
      GetRenderFlags(2), 
      GetRenderFlags(3)
    ];
    this.renderflags = renderflags;
  },
  methods: {
    resetRender() {
      const { ResetRenderFlags } = this.$store.getters.core.environment;
      ResetRenderFlags();
    },
    setRenderToRandom() {
      const { SetCustomRenderFlags } = this.$store.getters.core.environment;
      const randomRender = [
        randomInteger(0, 255),
        randomInteger(0, 255),
        randomInteger(0, 255),
        randomInteger(0, 255),
      ];
      SetCustomRenderFlags(randomRender);
      this.renderflags = randomRender;
    },
    copyRender() {
      const renderFlags = Buffer.from(this.renderflags, 'utf8').toString('hex').toUpperCase();
      clipboard.writeText(renderFlags);
    },
    upRenderFlags({ index }) {
      const renderIndex = Number(index);
      const { SetRenderFlags, GetRenderFlags } = this.$store.getters.core.environment;
      SetRenderFlags(renderIndex);
      this.$set(this.renderflags, renderIndex, GetRenderFlags(renderIndex));
    },
    downRenderFlags({ index }) {
      const renderIndex = Number(index);
      const { SetRenderFlags, GetRenderFlags } = this.$store.getters.core.environment;
      const isNegative = true;
      SetRenderFlags(renderIndex, isNegative);
      this.$set(this.renderflags, renderIndex, GetRenderFlags(renderIndex));
    },
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
      isTimeOfDayEnabled: this.$store.state.environment.isTimeOfDayEnabled,
      renderflags: [0, 0, 0, 0],
      renderflagsHelp: 'Render flags control how WoW is rendered.<br/>Changing these values may break your client, specially from WoW Alpha to WoW 3.x'
    };
  }
};
</script>

<style scoped>
.columns-top {
  margin-top: auto;
}
.byteSelectors {
  display: flex;
  align-items: row;
}
.buttons .button:not(:last-child):not(.is-fullwidth) {
  margin-right: 0;
}
.render_flags_title {
  display: flex;
  margin-right: 5px;
}
.render_flags {
  display: flex;
}
.render_flags_title > svg {
  padding-left: 5px;
}
.render_flags_subtitle {
  color: #626b82;
}
</style>