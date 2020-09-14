<template>
  <section class="boards-list">
    <div class="recently-board">
      <h2>
        
        <img src="../assets/img/clock-grey.svg" alt />
        <span>Recently Viewed</span>
      </h2>
      <div class="board-preview-container">
        <BoardPreview v-for="board in recentlyViewedBoards" :key="board._id" :board="board" />
      </div>
    </div>
    <div class="personal-boards">
      <h2>
        <img src="../assets/img/user-grey.svg" alt />
        <span>Personal Boards</span>
      </h2>
      <div class="board-preview-container">
        <BoardPreview v-for="board in boards" :key="board._id" :board="board" />
        <div @click="showAddBoard" class="create-board">
          <span>Create new board</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BoardPreview from "@/components/BoardPreview.vue";

export default {
  props: ["boards", "recentlyViewedBoards"],
  methods: {
    showAddBoard() {
      this.$emit("showAddBoard");
    }
  },
  components: {
    BoardPreview
  }
};
</script>


 <style lang="scss" scoped>
@import "../styles/components/BoardsList.scss";
</style>