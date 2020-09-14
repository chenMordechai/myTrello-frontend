<template>
  <section  v-if="newList" class="list-preview">
    <div class="container">
      <div class="list-name-container">
        <contenteditable
          class="list-name"
          tag="div"
          :contenteditable="isEditable"
          v-model="newList.title"
          :noNL="true"
          @input="saveList"
        />
        <!-- <input type="text" v-model="newList.title" @keyup="listTitleChange"/> -->
        <button>
          <span>⋯</span>
        </button>
      </div>
      <!-- <CardPreview
        @openEditCard="openEditCard"
        v-for="card in list.cards"
        :key="card._id"
        :card="card"
        :listId="list._id"
      />-->
      <draggable v-model='myCards' group="people" @start="drag=true" @end="drag=false">
        <div v-for="card in newList.cards" :key="card._id">{{card.title}}</div>
      </draggable>
      <!-- <span>{{addCard}}</span> -->
    </div>
    <!-- <AddCard :str="str" @saveCard="saveCard" /> -->
    <OpenClose
      @toggle="toggle"
      :value="value"
      btnStr="Add Card"
      @save="saveCard"
      @doFocus="doFocus"
    >
      <div class="flex space-between" slot="close">
        <button>
          <vue-fontawesome icon="plus" size="1" color="#707c90"></vue-fontawesome>
          <h3>{{str}}</h3>
        </button>
        <button>
          <img src="../assets/img/palette.svg" />
        </button>
      </div>
      <div slot="open">
        <textarea
          ref="input"
          v-model="newCard.title"
          type="text"
          placeholder="Enter a title for this card..."
        />
        <!-- <div class="btn-container">
          <button>
            <span>⋯</span>
          </button>
        </div>-->
      </div>
    </OpenClose>
  </section>
</template>

<script>
import draggable from "vuedraggable";

import CardPreview from "@/components/CardPreview";
import AddCard from "@/components/AddCard";
import OpenClose from "@/components/OpenClose";
export default {
  props: ["list"],
  data() {
    return {
      value: false,
      isEditable: true,
      newList: null,
      newCard: {
        title: ""
      }
    };
  },
  created() {
      this.$store.dispatch({ type: "loadList", listId: this.list._id })
      .then(list=>{
        console.log('list from the store :',list)
        this.newList = list
      })
  },

  methods: {
    toggle() {
      this.value = !this.value;
      if (this.value) {
        this.doFocus();
      }
    },
    doFocus() {
      setTimeout(() => {
        this.$refs.input.focus();
      }, 0);
    },
    openEditCard(card) {
      this.$emit("openEditCard", card);
    },
    saveList() {
      let list = JSON.parse(JSON.stringify(this.newList));
      this.$emit("saveList", list);
    },
    saveCard() {
      if (!this.newCard.title) return;
      let newCard = JSON.parse(JSON.stringify(this.newCard));
      newCard.description = "";
      newCard.activity = "";
      this.newCard.title = "";
      this.$store
        .dispatch({ type: "saveCard", listId: this.list._id, card: newCard })
        .then(newCard => {});
      // this.newList.cards.push(newCard);
      // this.saveList();
    }
  },
  computed: {
    myCards: {
        get() {
            return this.$store.state.list.cards
        },
        set(value) {
          console.log('value',value)
            // this.$store.dispatch('saveList', value)
        }
    },
    str() {
      if (!this.list.cards.length) {
        return "Add a card";
      } else {
        return "Add another card";
      }
    }
  },
  components: {
    draggable,
    CardPreview,
    AddCard,
    OpenClose
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/ListPreview";
</style>