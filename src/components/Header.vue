<template>
  <section class="header">
    <router-link to="/">My Trello</router-link>
    <div class="btn-container">
      <button @click="login">Log In</button>
      <button @click="signUp">Sign Up</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",

  methods: { 
    login() {
      this.$emit('showLogin')
    },
    signUp() {
      this.$emit("showSignup");
    },
  }
};
</script>

<style scoped lang="scss">
@import "../styles/components/Header.scss";
</style>
