<template>
  <section v-if="value" class="container">
    <h1>{{headerStr}}</h1>
    <span class="close" @click="close">✖</span>
    <slot name="content"></slot>
  </section>
</template>

<script>
export default {
  props: ["value", "headerStr"],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("input");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/components/Container.scss";
</style>
