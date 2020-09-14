<template>
  <section class="add-list">
    <section v-if="!addListOpen" class="add-list-close">
      <button @click="toggleAddList">
        <vue-fontawesome icon="plus" size="1.2" color="white"></vue-fontawesome>
        <span>Add another list</span>
      </button>
    </section>
    <section v-else class="add-list-open">
        <input ref="input" v-model="newList.title" type="text" placeholder="Enter list title..." />
        <div class="btn-container">
          <button @click="saveList">Add list</button>
          <button @click="toggleAddList">✖</button>
        </div>
    </section>
  </section>
</template>


<script>
export default {
  data() {
    return {
      addListOpen: false,
      newList: {
        title: ""
      }
    };
  },

  methods: {
    saveList() {
      if (!this.newList.title) return;
      let list = JSON.parse(JSON.stringify(this.newList));
      list.cards = [];
    
      this.$emit("saveList", list);
      this.newList.title = "";
    },
    toggleAddList() {
      this.addListOpen = !this.addListOpen;
      if (this.addListOpen) {
        setTimeout(() => {
          this.$refs.input.focus();
        }, 0);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/AddList";
</style>