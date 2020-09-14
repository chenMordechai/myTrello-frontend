<template>
  <div v-if="board" class="board-details">
    <BoardNav :boardName="board.name" />
    <BoardLists
      @saveList="saveList"
      v-if="board"
      :boardList="board.lists"
      @openEditCard="openEditCard"
    />
    <EditCard :card="card" v-if="isEditCardOpen&&card" @closeEditCard="closeEditCard" />
  </div>
</template>
<script>
import BoardNav from "@/components/BoardNav.vue";
import BoardLists from "@/components/BoardLists.vue";
import EditCard from "@/components/EditCard.vue";
import { boardService } from "@/services/board.service.js";

export default {
  data() {
    return {
      isEditCardOpen: false,
      card: null
    };
  },
  created() {
    const boardId = this.$route.params.boardId;
    this.$store.dispatch({ type: "loadBoard", boardId }).then(board => {
      let elBody = document.querySelector("body");
      if (board.bgc.length > 8) {
        (elBody.style.backgroundColor = "unset"),
          (elBody.style.backgroundImage = `url(${board.bgc})`);
      } else {
        elBody.style.backgroundColor = board.bgc;
      }
    });
  },
  computed: {
    board() {
      return this.$store.getters.board;
    }
  },
  methods: {
    closeEditCard() {
      this.isEditCardOpen = false;
    },
    openEditCard(card) {
      this.isEditCardOpen = true;
      this.card = card;
    },
    saveList(list) {
      // let board = JSON.parse(JSON.stringify(this.board));
      this.$store.dispatch({
        type: "saveList",
        list
      });

      // if (list._id) {
      //   const listIdx = this.board.lists.findIndex(
      //     currList => currList._id === list._id
      //   );
      //   this.board.lists.splice(listIdx, 1, list);
      // } else {
      //     list._id = boardService.makeId();
      //   this.board.lists.push(list);
      // }
      // let newBoard = JSON.parse(JSON.stringify(this.board));
      // this.$store
      //   .dispatch({ type: "saveBoard", board: newBoard })
      //   .then(newBoard => {

      // });
    }
  },
  components: {
    BoardNav,
    BoardLists,
    EditCard
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/BoardDeatels.scss";
</style>
