<template>
  <h1 :style="{ color: fontColor, 'font-size': fontSize + 'px' }">
    <slot></slot>
  </h1>
</template>
<script>
export default {
  name: "BigTitle",
  props: {
    fontColor: {
      type: String,
      default: "#000",
    },
    fontSize: {
      type: String,
      default: '30'
    },
  },
};
</script>

