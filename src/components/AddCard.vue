<template>
  <section class="add-card">
    <div v-if="!addCardOpen" class="add-card-close">
      <button>
        <vue-fontawesome icon="plus" size="1" color="#707c90"></vue-fontawesome>
        <h3 @click="toggleAddCard">{{str}}</h3>
      </button>
      <button>
        <img src="../assets/img/palette.svg" />
      </button>
    </div>
    <div v-else class="add-card-open">
      <textarea
        ref="input"
        v-model="newCard.title"
        type="text"
        placeholder="Enter a title for this card..."
      />
      <div class="btn-container">
        <div class="btn-sec-container">
          <button @click="saveCard">Add Card</button>
          <button @click="toggleAddCard">✖</button>
        </div>
        <button>
          <span>⋯</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {boardService} from '../services/board.service.js'

export default {
  props: ["str"],
  data() {
    return {
      addCardOpen: false,
      newCard: {
        title: ""
      }
    };
  },
  methods: {
    toggleAddCard() {
      this.addCardOpen = !this.addCardOpen;
      if (this.addCardOpen) {
        setTimeout(() => {
          this.$refs.input.focus();
        }, 0);
      }
    },
    saveCard() {
      if (!this.newCard.title) return;
      let newCard = JSON.parse(JSON.stringify(this.newCard));
      // newCard._id = boardService.makeId();
      newCard.description = "";
      newCard.activity = "";
      this.$emit("saveCard", newCard);
      this.newCard.title = "";
    },
    
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/AddCard.scss";
</style>