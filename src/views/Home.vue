<template>
  <div class="Home">
    <Header @showLogin="toggleShowLogin" @showSignup="toggleShowSignup" />
    <!-- <Login @login="login" @closeLogin="toggleShowLogin" v-if="isLoginShow" /> -->
    <!-- <Signup @signup="signup" @closeSignup="toggleShowSignup" v-if="isSignupShow" /> -->
    <Form
      v-if="isLoginShow"
      @close="toggleShowLogin"
      formHeaderStr="Log in to myTrello"
      btnStr="Log In"
      @enter="login"
    >
      <div slot="inputs" class="inputs-container">
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
      </div>
      <div slot="links">
        <a href>Can't log in?</a> •
        <a href>Sign up for an accunt</a>
      </div>
    </Form>
    <Form
      v-if="isSignupShow"
      @close="toggleShowSignup"
      formHeaderStr="Sign up for your account"
      btnStr="Sign Up"
      @enter="signup"
    >
      <div slot="inputs" class="inputs-container">
        <input
          ref="input"
          type="text"
          name="fullName"
          v-model="newUser.fullName"
          placeholder="Enter full name"
        />
        <input type="text" name="userName" v-model="newUser.name" placeholder="Enter user name" />
        <input
          type="password"
          name="password"
          v-model="newUser.password"
          placeholder="Enter password"
        />
      </div>
      <div slot="links">
        <a href>Can't log in?</a> •
        <a href>Sign up for an accunt</a>
      </div>
    </Form>

    <h1>Home</h1>
    <router-link to="/board">continue as a guest</router-link>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Form from "@/components/Form.vue";
import { userService } from "@/services/user.service.js";

export default {
  name: "Home",
  data() {
    return {
      isLoginShow: false,
      isSignupShow: false,
      // isShow: true,
      credentials: {
        name: "",
        password: ""
      },
      newUser: {
        name: "",
        password: "",
        fullName: ""
      }
    };
  },
  created() {},
  methods: {
    // toggle() {
    //   this.isShow = !this.isShow;
    // },
    toggleShowLogin() {
      this.isLoginShow = !this.isLoginShow;
      if (this.isLoginShow) {
        setTimeout(() => {
          this.$refs.input.focus();
        }, 0);
      }
    },
    toggleShowSignup() {
      this.isSignupShow = !this.isSignupShow;
      if (this.isSignupShow) {
        setTimeout(() => {
          this.$refs.input.focus();
        }, 0);
      }
    },
    login() {
      userService.login(this.credentials).then(user => {
        this.toggleShowLogin();
        this.$router.push("/board");
      });
    },
    signup() {
      userService.signup(this.newUser).then(user => {
        this.toggleShowSignup();
        this.$router.push("/board");
      });
    }
  },
  components: {
    Header,
    Login,
    Signup,
    Form
  }
};
</script>
<style lang="scss">
</style>
