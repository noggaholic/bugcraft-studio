<template>
  <div class="field">
    <p class="control">
      <button v-on:click="upRenderFlags" class="button">
        <i data-feather="arrow-up"></i>
      </button>
    </p>
    <div class="byte">{{byte.toString(16)}}</div>
    <p class="control">
      <button v-on:click="downRenderFlags" class="button">
        <i data-feather="arrow-down"></i>
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: "byteSelector",
  props: ['byte', 'index'],
  data: () => ({}),
  methods: {
    upRenderFlags() {
      this.$emit('upRenderFlags', { index: this.index });
    },
    downRenderFlags() {
      this.$emit('downRenderFlags', { index: this.index });
    }
  },
  mounted() {}
};
</script>

<style scoped>
  .field {
    display: flex;
    flex-direction: column;
    width: 49px;
    align-items: center;
    margin-left: 5px;
  }
  .byte {
    text-transform: uppercase;
  }
</style>
