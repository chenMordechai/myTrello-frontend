<template>
<section>
<section @click="closeLogin" class="screen"></section>

  <section class="login">
    <span @click="closeLogin">✖</span>
    <h2>Log in to myTrello </h2>
    <form @submit.prevent="login">
      <input
        ref="input"
        type="text"
        name="userName"
        v-model="credentials.name"
        placeholder="Enter name"
      />
      <input
        type="password"
        name="password"
        v-model="credentials.password"
        placeholder="Enter password"
      />
      <button>Login</button>
    </form>
    <a href>Can't log in?</a> •
    <a href>Sign up for an accunt</a>
  </section>
  </section>
</template>


<script>
import { userService } from "@/services/user.service.js";

export default {
  data() {
    return {
      credentials: {
        name: "",
        password: ""
      }
    };
  },
  created() {
    document.querySelector("body").classList.add("open-comp");
  },

  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    login() {
      this.$emit('login' , this.credentials)
      
    },
    closeLogin(){
      this.$emit('closeLogin')
    }
  },
  destroyed(){
    document.querySelector("body").classList.remove("open-comp");

  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/Login.scss";
</style>