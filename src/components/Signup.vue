<template>
<section>
<section @click="closeSignUp" class="screen"></section>

  <section class="signup">
      <span @click="closeSignUp">✖</span>
    <h2>Sign up for your account </h2>
    <form @submit.prevent="signup">
      <input
        ref="input"
        type="text"
        name="fullName"
        v-model="newUser.fullName"
        placeholder="Enter full name"
      />
      <input
        type="text"
        name="userName"
        v-model="newUser.name"
        placeholder="Enter user name"
      />
      <input
        type="password"
        name="password"
        v-model="newUser.password"
        placeholder="Enter password"
      />
      
      <button>Sign Up</button>
    </form>
    <a href>Alredy have an account?  Log In</a> •
  </section>
  </section>
</template>


<script>
import { userService } from "@/services/user.service.js";

export default {
  data() {
    return {
      newUser: {
        name: "",
        password: "",
        fullName:""
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
    signup() {
        const newUser = JSON.parse(JSON.stringify(this.newUser))
        this.$emit("signup", newUser);
    },
    closeSignUp(){
        this.$emit('closeSignup'  )
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