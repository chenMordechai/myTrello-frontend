<template>
  <!-- <section > -->
  <router-link :style="bgc" class="board-preview" :to="'/board/'+board._id">
    <!-- <h3 @click="goToBoard">board preview</h3> -->
    <span>{{board.name}}</span>
  </router-link>
  <!-- </section> -->
</template>

<script>
export default {
  props: ["board"],
  computed: {
    bgc() {
      return this.board.bgc.length > 8
        ? {
            backgroundColor: "unset",
            backgroundImage: `url(${this.board.bgc})`
          }
        : { backgroundColor: this.board.bgc };
    }
  },
  methods: {
    // goToBoard() {
    //   this.$router.push(`/board/${this.board._id}`);
    // }
  }
};
</script>


 <style lang="scss" scoped>
@import "../styles/components/BoardPreview.scss";
</style>