<template>
  <section>
    <section v-if="!isDescOpen" @click="toggleDesc" class="card-desc-close">
      <textarea v-model="card.description" placeholder="Add a more detailed description..."></textarea>
    </section>
    <section v-else class="card-desc-open">
      <textarea @blur="saveDesc" v-model="card.description" placeholder="Add a more detailed description..."></textarea>
      <div class="flex align-center">
        <button @click="saveDesc">Save</button>
        <button @click="toggleDesc">✖</button>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: ["card"],
  data() {
    return {
      isDescOpen: false
    };
  },
  methods: {
    saveDesc() {
      this.toggleDesc();
    },
    toggleDesc() {
      this.isDescOpen = !this.isDescOpen;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/CardDesc.scss";
</style>