<template>
  <section class="board-header" style="backgroundColor:bgc">
    <div class="input-container">
      <button>
        <vue-fontawesome icon="th" size="1.1" color="white"></vue-fontawesome>
      </button>
      <button>
        <vue-fontawesome icon="home" size="1.1" color="white"></vue-fontawesome>
      </button>
      <button>
        <!-- <vue-fontawesome icon="clipboard" size="1" color="white"></vue-fontawesome> -->
          <img src="../assets/img/clipboard.svg" alt />

        <span>Boards</span>
      </button>
      <input type="text" />
      <span class="search-icon">
        <vue-fontawesome icon="search" size="1" color="white"></vue-fontawesome>
      </span>
    </div>
    <router-link to="/">MyTrello</router-link>

    <div class="btns-container">
      <button>
        <vue-fontawesome icon="plus" size="1.1" color="white"></vue-fontawesome>
      </button>
      <button>
        <vue-fontawesome icon="info-circle" size="1.1" color="white"></vue-fontawesome>
      </button>
      <button>
        <vue-fontawesome icon="bell" size="1" color="white"></vue-fontawesome>
      </button>
      <button @click="openUserOptions" class="round-btn">CM</button>
    </div>
    <UserOptions v-if="isUserOptionsOpen" @closeUserOptions="closeUserOptions" @logout="logout" />
  </section>
</template>

<script>
import UserOptions from "./UserOptions.vue";
import { userService } from "../services/user.service.js";

export default {
  name: "Board-Header",
  props: ["bgc"],
  data() {
    return {
      isUserOptionsOpen: false
    };
  },
  created() {
  },
  methods: {
    openUserOptions() {
      this.isUserOptionsOpen = !this.isUserOptionsOpen;
    },
    closeUserOptions() {
      this.isUserOptionsOpen = false;
    },
    logout() {
      userService.logout().then(() => {
      });
    }
  },
  components: {
    UserOptions
  }
};
</script>

<style scoped lang="scss">
@import "../styles/components/BoardHeader.scss";
</style>
