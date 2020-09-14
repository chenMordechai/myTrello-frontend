<template>
  <section class="board-nav">
    <div class="main-container">

    <contenteditable
      class="board-name"
      tag="div"
      :contenteditable="isEditable"
      v-model="boardName"
      :noNL="true"
      @input="contentChange"
    />
    <!-- <input
      class="board-name"
      v-model="boardName"
      @input="contentChange"
    /> -->
    <button>
        <vue-fontawesome icon="star" size="1" color="white"></vue-fontawesome>
    </button>
    <span>|</span>
    <button>Personal</button>
    <span>|</span>
    <button>
        <vue-fontawesome icon="lock" size="1" color="white"></vue-fontawesome>
      <span>Private</span>
    </button>
    <span>|</span>
    <button class="round-btn">CM</button>
    <button>Invite</button>
    </div>

    <div class="sec-container">
    <button>
      <img src="../assets/img/umbrella-beach.svg" />
      <span>Butler</span>
    </button>
    <button>
     <span>⋯</span> 
      <span>Show menu</span>
    </button>
    </div>
  </section>
</template>

<script>
export default {
  props:['boardName'],
  name: "Board-Nav",
  data() {
    return {
      isEditable: true,
      message: "Chen Board"
    };
  },
  methods: {
    contentChange() {
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/components/BoardNav.scss";
</style>
