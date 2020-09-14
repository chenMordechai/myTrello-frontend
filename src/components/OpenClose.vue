<template>
  <section class="open-close">
    <section v-if="!isOpen" @click="toggleOpenClose" class="close">
      <slot name="close"></slot>
    </section>
    <section v-else class="open">
      <slot name="open"></slot>
      <div class="flex align-center btn-container">
        <button @click="save">{{btnStr}}</button>
        <button @click="toggleOpenClose">✖</button>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: ["btnStr" , 'value'],
  data() {
    return {
    };
  },
  methods: {
    save() {
      this.$emit("save");
      // this.toggleOpenClose()
    },
    toggleOpenClose() {
      this.$emit("toggle");
      // this.isOpen = !this.isOpen;
      
    }
  },
  computed:{
    isOpen(){
      return this.value
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/styles/components/OpenClose.scss";
</style>