<template>
  <section>
    <section @click="closeEditCard" class="screen"></section>
    <section class="edit-card">
      <span class="close" @click="closeEditCard">✖</span>
      <section class="flex column header">
        <section class="flex align-center">
          <img src="../assets/img/clipboard-grey.svg" alt />
          <contenteditable
            class="card-name"
            tag="div"
            v-model="card.title"
            :noNL="true"
            @input="contentChange"
          />
        </section>
        <h4>
          in list
          <span @click="toggleMoveCard">{{list.title}}</span>
        </h4>

        <Container
          headerStr="Move Card"
          class="move-card"
          @input="toggleMoveCard"
          :value="isOpenMoveCard"
        >
          <div slot="content" class="move-card-content">
            <h2>Select Destinaition</h2>
            <div class="select-board-container">
              <label for="boards">Board</label>
              <select v-model="currBoardId" name="boards" id="boards" @change="boardChange">
                <optgroup label="boards">
                  <option
                    v-for="currBoard in boards"
                    :key="currBoard._id"
                    :value="currBoard._id"
                    ref="option"
                  >{{currBoard.name}}</option>
                </optgroup>
              </select>
              <span>{{currBoard.name}}</span>
              <div class="select-bgc select-board-bgc"></div>
            </div>
            <div class="flex space-between">
              <div class="select-list-container">
                <label for="lists">List</label>
                <select v-model="currListId" name="lists" id="lists" @change="listChange">
                  <!-- <optgroup label="lists"> -->
                  <option
                    v-for="currList in currBoard.lists"
                    :key="currList._id"
                    :value="currList._id"
                    ref="option"
                  >{{currList.title}}</option>
                  <!-- </optgroup> -->
                </select>
                <span>{{currList.title}}</span>
                <div class="select-bgc select-list-bgc"></div>
              </div>
              <div class="select-position-container">
                <label for="position">Position</label>
                <select v-model="cardPosition" name="position" id="position">
                  <!-- <optgroup label="position"> -->
                  <option v-for="x in currList.cards.length" :key="x" :value="x" ref="option">{{x}}</option>
                  <!-- </optgroup> -->
                </select>
                <span>{{cardPosition}}</span>
                <div class="select-bgc select-position-bgc"></div>
              </div>
            </div>
            <button @click="moveCard">Move</button>
          </div>
        </Container>
      </section>
      <div class="flex edit-container">
        <section class="card-details">
          <div class="flex align-center">
            <vue-fontawesome icon="file" size="1.2" color="#707c90"></vue-fontawesome>
            <h2>Description</h2>
          </div>
          <!-- <CardDesc :card="card" /> -->
          <div class="open-close-container">
            <OpenClose btnStr="save" :value="value" @save="save" @toggle="toggle">
              <div slot="close" class="card-desc-close">
                <textarea
                  v-model="card.description"
                  placeholder="Add a more detailed description..."
                ></textarea>
              </div>
              <div slot="open" class="card-desc-open">
                <textarea
                  @blur="toggle"
                  v-model="card.description"
                  placeholder="Add a more detailed description..."
                ></textarea>
              </div>
            </OpenClose>
          </div>
          <div class="flex align-center space-between">
            <div class="flex align-center">
              <vue-fontawesome icon="list" size="1.2" color="#707c90"></vue-fontawesome>
              <h2>Activity</h2>
            </div>
            <button>Show Details</button>
          </div>
        </section>
        <section class="side-bar">
          <h2>Add to card</h2>
          <button>
            <vue-fontawesome icon="user" size="1" color="#707c90"></vue-fontawesome>
            <span>Members</span>
          </button>
          <button>
            <vue-fontawesome icon="tag" size="1" color="#707c90"></vue-fontawesome>
            <span>Labels</span>
          </button>
          <button>
            <img src="../assets/img/check-grey.svg" alt />
            <span>Checklist</span>
          </button>
          <button>
            <img src="../assets/img/clock-solid-grey.svg" alt />
            <span>Due Date</span>
          </button>
          <button>
            <img src="../assets/img/paperclip-grey.svg" alt />
            <span>Attachment</span>
          </button>
          <button>
            <img src="../assets/img/image-grey.svg" alt />
            <span>Cover</span>
          </button>
          <h2>Actions</h2>
          <button>
            <vue-fontawesome icon="arrow-right" size="1.2" color="#707c90"></vue-fontawesome>
            <span>Move</span>
          </button>
          <button>
            <img src="../assets/img/copy-grey.svg" alt />
            <span>Copy</span>
          </button>
          <button>
            <img src="../assets/img/palette.svg" alt />
            <span>Make Template</span>
          </button>
          <button>
            <img src="../assets/img/eye-grey.svg" alt />
            <span>Watch</span>
          </button>
          <button>
            <vue-fontawesome icon="archive" size="1" color="#707c90"></vue-fontawesome>
            <span>Archive</span>
          </button>
          <button>
            <img src="../assets/img/share-grey.svg" alt />
            <span>Share</span>
          </button>
        </section>
      </div>
    </section>
  </section>
</template>

<script>
// import CardDesc from "@/components/CardDesc.vue";
import OpenClose from "@/components/OpenClose.vue";
import Container from "@/components/Container.vue";
import { boardService } from "@/services/board.service.js";
import { listService } from "@/services/list.service.js";

export default {
  props: ["card"],
  data() {
    return {
      isOpenMoveCard: false,
      value: false,
      currBoardId: null,
      currListId: null,
      cardPosition: 1,
      //this for the component with the selects:
      currBoard: null,
      currList: null,
      fromList: null
    };
  },
  created() {
    document.querySelector("body").classList.add("open-comp");
    const board = this.$store.getters.board;
    this.currBoard = board;
    this.currBoardId = board._id;
    const list = this.$store.getters.list;
    this.fromList = list;
    this.currList = list;
    this.currListId = list._id;
    const cardIdx = this.currList.cards.findIndex(
      card => card._id === this.card._id
    );
    this.cardPosition = cardIdx + 1;
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    // this for the change avter 'move' clicked:
    board() {
      const board = this.$store.getters.board;
      // this.currBoardId = board._id;
      // this.currBoard = board;
      return board;
    },
    list() {
      const list = this.$store.getters.list;
      // this.currListId = list._id;
      // this.currList = list;
      return list;
    },
    cardIdx() {
      const cardIdx = this.list.cards.findIndex(
        card => card._id === this.card._id
      );
      return cardIdx + 1;
    }
  },
  methods: {
    moveCard() {
      // remove from the list and board
      let fromList = JSON.parse(JSON.stringify(this.fromList));
      var fromCardIdx = fromList.cards.findIndex(
        card => card._id === this.card._id
      );
      fromList.cards.splice(fromCardIdx, 1);
      console.log("after splice:", fromList);
      this.$store.dispatch({ type: "saveList", list: fromList }).then(() => {
        const toCardIdx = this.cardPosition - 1;
       let toList =
          fromList._id === this.currList._id
            ? fromList
            : JSON.parse(JSON.stringify(this.currList));
        // update the list
        toList.cards.splice(toCardIdx, 0, this.card);

        this.$store
          .dispatch({ type: "loadBoard", boardId: this.currBoard._id })
          .then(currBoard => {
            console.log("new board", currBoard);
            this.$store
              .dispatch({ type: "saveList", list: toList })
              .then(currList => {
                console.log("new list", currList);
              });
          });
      });

      // add to list in other board
    },
    cardPositionChange() {},
    listChange() {
      // get list by id
      listService.getById(this.currBoard, this.currListId).then(list => {
        this.currList = list;
        console.log(this.currList);
      });

      // this.$store
      //   .dispatch({ type: "loadList", listId: this.currListId })
      //   .then(currList => {
      //     console.log("new list", currList);
      //   });
    },
    boardChange() {
      console.log(this.currBoardId);
      // change the board for see the other board lists
      // not move yet
      // get board by id
      boardService.getById(this.currBoardId).then(board => {
        this.currBoard = board;
        console.log(this.currBoard);
      });
    },
    toggleMoveCard() {
      this.isOpenMoveCard = !this.isOpenMoveCard;
    },
    save() {},
    toggle() {
      this.value = !this.value;
      this.save();
    },
    contentChange() {
      console.log("contentChange");
    },
    closeEditCard() {
      this.$emit("closeEditCard");
    }
  },
  destroyed() {
    document.querySelector("body").classList.remove("open-comp");
  },
  components: {
    // CardDesc,
    OpenClose,
    Container
  }
};
</script>

<style scoped lang="scss">
@import "../styles/components/EditCard.scss";
</style>
