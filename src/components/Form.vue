<template>
  <section>
    <section @click="close" class="screen"></section>

    <section class="form">
      <span @click="close">✖</span>
      <h2>{{formHeaderStr}}</h2>
      <form class="flex column" @submit.prevent="enter">
        <slot name="inputs"></slot>

        <button>{{btnStr}}</button>
      </form>
      <slot name="links"></slot>
      <!-- <a href>Can't log in?</a> •
      <a href>Sign up for an accunt</a>-->
    </section>
  </section>
</template>

<script>
export default {
  props: ["formHeaderStr", "btnStr"],
  created() {
    document.querySelector("body").classList.add("open-comp");
  },
  mounted() {
    //  setTimeout(()=>{
    //      this.$refs.input.focus();
    //  },0)
  },
  methods: {
    close() {
      this.$emit("close");
    },
    enter() {
         this.$emit('enter')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/Form.scss";
</style>