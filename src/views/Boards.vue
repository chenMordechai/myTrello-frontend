<template>
  <section class="boards">
    <SideBar />
    <AddBoard
      v-if="isAddBoardShow"
      @addNewBoard="addNewBoard"
      @closeAddBoard="closeAddBoard"
      :loggedinUser="loggedinUser"
    />

    <router-view
      @showAddBoard="toggleShowAddBoard"
      :boards="boards"
      :recentlyViewedBoards="recentlyViewedBoards"
    />
  </section>
</template>

<script>
import { boardService } from "@/services/board.service.js";
import { userService } from "@/services/user.service.js";
import BoardsList from "@/components/BoardsList.vue";
import SideBar from "@/components/SideBar.vue";
import AddBoard from "@/components/AddBoard.vue";

export default {
  data() {
    return {
      isAddBoardShow: false
    };
  },
  created() {},
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    recentlyViewedBoards() {
      return this.$store.getters.recentlyViewedBoards;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    addNewBoard(newBoard) {
      this.$store
        .dispatch({ type: "saveBoard", board: newBoard })
        .then(newBoard => {
          this.closeAddBoard();
          this.$store.dispatch({ type: "loadBoards" });
          this.$router.push(`/board/${newBoard._id}`);
        });
    },
    toggleShowAddBoard() {
      this.isAddBoardShow = !this.isAddBoardShow;
    },
    closeAddBoard() {
      this.isAddBoardShow = false;
    }
  },
  components: {
    BoardsList,
    SideBar,
    AddBoard
  }
};
</script>


<style lang="scss" scoped >
@import "@/styles/views/Boards";
</style>