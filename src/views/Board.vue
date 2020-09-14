<template>
  <section class="board">
    <BoardHeader />
    <!-- boards -->
    <router-view />
  </section>
</template>

<script>
import BoardHeader from "@/components/BoardHeader.vue";

export default {
  data() {
    return {};
  },
  created(){
    this.$store.dispatch({type:'loadBoards'})
    this.$store.dispatch({type:'loadLoggedinUser'})
  },
  methods: {},
  components: {
    BoardHeader
  }
};
</script>