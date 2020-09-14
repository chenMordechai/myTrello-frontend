<template>
  <section class="side-bar">
    <router-link to="/board">
      <button @click="boardClicked" :class="{ active: isBoardActive }">
          <img src="../assets/img/clipboard-grey.svg" alt />
        <span>Boards</span>
      </button>
    </router-link>
    <router-link to="/board/template">
      <button @click="templateClicked" :class="{ active: isTemplateActive }">
        <img src="../assets/img/palette.svg" />
        <span>Template</span>
      </button>
    </router-link>
    <router-link to="/board/home">
      <button @click="homeClicked" :class="{ active: isHomeActive }">
        <vue-fontawesome icon="home" size="1.2" color="#707c90"></vue-fontawesome>
        <span>Home</span>
      </button>
    </router-link>
    <h4>Teams</h4>
    <button>
      <vue-fontawesome icon="plus" size="1.2" color="#707c90"></vue-fontawesome>
      <span class="plus-span">Creat a team</span>
    </button>
  </section>
</template>
<script>
export default {
  name: "SideBar",
  data() {
    return {
      isBoardActive: true,
      isTemplateActive: false,
      isHomeActive: false
    };
  },
  methods: {
    boardClicked() {
      this.isBoardActive = true;
      this.isTemplateActive = false;
      this.isHomeActive = false;
    },
    templateClicked() {
      this.isBoardActive = false;
      this.isTemplateActive = true;
      this.isHomeActive = false;
    },
    homeClicked() {
      this.isBoardActive = false;
      this.isTemplateActive = false;
      this.isHomeActive = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/components/SideBar.scss";
</style>
