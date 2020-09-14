<template>
  <div class="user-options">
    <div class="name-container">
      <span @click="closeUserOptions">✖</span>
      <p>loggedinUser name</p>
    </div>
    <a>Profile and Visibility</a>
    <a>Activity</a>
    <a>Cards</a>
    <a>Settings</a>
    <a>Help</a>
    <a>Shortcuts</a>
    <a @click="logout">Log Out</a>
  </div>
</template>

<script>
export default {
  methods: {
    closeUserOptions() {
      this.$emit("closeUserOptions");
    },
    logout(){
      this.$emit('logout')
    }

  }
};
</script>

<style lang="scss">
@import "../styles/components/UserOptions.scss";
</style>