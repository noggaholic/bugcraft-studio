<template>
  <div class="field">
    <p class="control">
      <button v-on:click="upRenderFlags" class="button">
        <i data-feather="chevron-up"></i>
      </button>
    </p>
    <div class="byte">{{byte.toString(16)}}</div>
    <p class="control">
      <button v-on:click="downRenderFlags" class="button">
        <i data-feather="chevron-down"></i>
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
    width: 34px;
    align-items: center;
    margin-left: 5px;
  }
  .byte {
    text-transform: uppercase;
    background: #10141c;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 28px;
    border-radius: 5px;
  }
  .button {
    background-color: transparent;
    border: 0;
    height: 30px;
  }
</style>
