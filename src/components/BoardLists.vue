<template>
  <section v-if="boardList" class="board-lists">
    <ListPreview
      @openEditCard="openEditCard"
      @saveList="saveList"
      v-for="list in boardList"
      :key="list._id"
      :list="list"
    />
    <!-- <AddList @saveList="saveList" /> -->
    <OpenClose
      @toggle="toggle"
      :value="value"
      btnStr="Add List"
      @save="saveList"
      class="container"
    >
      <div class="btn-container" slot="close">
        <button>
          <vue-fontawesome icon="plus" size="1.2" color="white"></vue-fontawesome>
          <span>Add another list</span>
        </button>
      </div>
      <div slot="open" >
        <input ref="input" v-model="newList.title" type="text" placeholder="Enter list title..." />
      </div>
    </OpenClose>
  </section>
</template>

<script>
import ListPreview from "@/components/ListPreview.vue";
import AddList from "@/components/AddList.vue";
import OpenClose from "@/components/OpenClose.vue";

export default {
  props: ["boardList"],
  data() {
    return {
      value: false,
      newList: {
        title: ""
      }
    };
  },
  created() {},
  methods: {
    toggle() {
      this.value = !this.value;
      if (this.value) {
        this.doFocus()
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
      if (!this.newList.title) return;
      let list = JSON.parse(JSON.stringify(this.newList));
      list.cards = [];
      this.newList.title = "";
      this.$emit("saveList", list);
    }
  },
  components: {
    ListPreview,
    AddList,
    OpenClose
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/BoardLists";
</style>

