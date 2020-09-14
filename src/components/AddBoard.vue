<template>
<section>
<section @click="closeAddBoard" class="screen"></section>

  <section class="add-board">
    <div class="main-container">
      <div class="board" :style="bgc">
        <div class="header-container">
          <span @click="closeAddBoard">✖</span>
          <input
            ref="input"
            @input="boardNameChange"
            v-model="newBoard.name"
            placeholder="Add board title"
            type="text"
          />
          <!-- {{loggedinUser}} -->
        </div>
      </div>
      <ColorPicker @selectBgc="selectBgc" :selectedColor="bgcName" />
    </div>
    <div class="btn-container">
      <button @click="addNewBoard">Create board</button>
      <button>
        <img src="../assets/img/palette-white.svg" />
        <span>Start with a Template</span>
      </button>
    </div>
  </section>
  </section>
</template>

<script>
import ColorPicker from "./ColorPicker.vue";

export default {
  props: ["loggedinUser"],
  data() {
    return {
      isEditable: true,
      bgcName:'red',
      newBoard: {
        name: "",
        bgc: "#f44336"
      }
    };
  },
  created() {
    document.querySelector("body").classList.add("open-comp");
  },

  mounted() {
    this.$refs.input.focus();
  },
  computed: {
    bgc() {
      return this.newBoard.bgc.length > 8
        ? {backgroundColor: 'unset', backgroundImage: `url(${this.newBoard.bgc})`  }
        : { backgroundColor: this.newBoard.bgc };
    }
  },
  methods: {
    addNewBoard() {
      if (!this.newBoard.name) return;
      let newBoard = JSON.parse(JSON.stringify(this.newBoard));
      newBoard.recentlyViewed = Date.now();
      newBoard.creator = {
        _id: this.loggedinUser._id,
        fullName: this.loggedinUser.fullName
      };
      newBoard.collaborators = [];
      newBoard.lists = [];
      this.$emit("addNewBoard", newBoard);
    },
    boardNameChange() {},
    closeAddBoard() {
      this.$emit("closeAddBoard");
    },
    selectBgc(bgc , bgcName) {
      this.newBoard.bgc = bgc;
      this.bgcName = bgcName
    }
  },
  components: {
    ColorPicker
  },
  destroyed() {
    document.querySelector("body").classList.remove("open-comp");
  }
};
</script>

 <style lang="scss" scoped>
@import "../styles/components/addBoard.scss";
</style>

