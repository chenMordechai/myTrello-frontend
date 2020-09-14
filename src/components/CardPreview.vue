<template>
   <section @click="openEditCard" class="card-preview">
    <p>{{card.title}}</p>
    <button @click.stop="openSmallEditCard"></button>
  </section>
</template>


<script>
export default {
  props: ["card", "listId"],
  methods: {
    openSmallEditCard() {
      console.log("openSmallEditCard");
    },
    openEditCard() {
      this.$store.dispatch({ type: "loadList", listId: this.listId })
        .then(() => {
          this.$emit("openEditCard", this.card);
        //   this.$store.dispatch({ type: "loadCard", cardId: this.card._id });
        });
    },
    // loadCard() {
    //   this.$store
    //     .dispatch({ type: "loadCard", cardId: this.card._id })
    //     .then(card => {});
    // }
  },
   components: {
            
        },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/CardPreview";
</style>