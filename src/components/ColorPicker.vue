<template>
  <section class="color-picker">
    <div
      @click="selectBgc('img1','https://images.unsplash.com/photo-1596016691838-70260f1e21c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')"
      :class="{ selected: img1 }"
      class="color-container"
      :style="backgroundImage1"
    ></div>
    <div
      @click="selectBgc('img2','https://images.unsplash.com/photo-1596435450055-cabe20834ebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80')"
      :class="{ selected: img2 }"
      class="color-container"
      :style="backgroundImage2"
    ></div>
    <div
      @click="selectBgc('img3','https://images.unsplash.com/photo-1596547321335-d35f7b1bc8e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1123&q=80')"
      :class="{ selected: img3 }"
      class="color-container"
      :style="backgroundImage3"
    ></div>
    <div
      @click="selectBgc('red','#f44336')"
      :class="{ selected: red }"
      class="color-container"
      style=" backgroundColor:#f44336"
    ></div>
    <div
      @click="selectBgc('pink','#e91e63')"
      :class="{ selected:pink }"
      class="color-container"
      style=" backgroundColor:#e91e63"
    ></div>
    <div
      @click="selectBgc('purple','#9c27b0')"
      :class="{ selected:purple }"
      class="color-container"
      style=" backgroundColor:#9c27b0"
    ></div>

    <div
      @click="selectBgc('blue','#3f51b5')"
      :class="{ selected: blue }"
      class="color-container"
      style=" backgroundColor:#3f51b5"
    ></div>
    <div
      @click="selectBgc('lightBlue','#03a9f4')"
      :class="{ selected: lightBlue }"
      class="color-container"
      style=" backgroundColor:#03a9f4"
    ></div>
    <div
      @click="selectBgc('turquoise','#009688')"
      :class="{ selected: turquoise }"
      class="color-container"
      style=" backgroundColor:#009688"
    ></div>
    <!-- <div
      @click="selectBgc('green','#15af1b')"
      :class="{ selected:green }"
      class="color-container"
      style=" backgroundColor:#15af1b"
    ></div>
    <div
      @click="selectBgc('yellow','#ffeb3b')"
      :class="{ selected: yellow }"
      class="color-container"
      style=" backgroundColor:#ffeb3b"
    ></div>
    <div
      @click="selectBgc('orange','#ff9800')"
      :class="{ selected:orange }"
      class="color-container"
      style=" backgroundColor:#ff9800"
    ></div>-->
  </section>
</template>

<script>
export default {
  props: ["selectedColor"],
  data() {
    return {
      red: false,
      green: false,
      blue: false,
      lightBlue: false,
      turquoise: false,
      yellow: false,
      pink: false,
      purple: false,
      orange: false,
      img1: false,
      img2: false,
      img3: false,
      img4: false
    };
  },
  created() {
    console.log(this.selectedColor)
    this.makeAllFalse()
    this[this.selectedColor] = true
  },
  computed: {
    backgroundImage1() {
      return {
        backgroundImage:
          "url(https://images.unsplash.com/photo-1596016691838-70260f1e21c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)"
      };
    },
    backgroundImage2() {
      return {
        backgroundImage:
          "url(https://images.unsplash.com/photo-1596435450055-cabe20834ebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80)"
      };
    },
    backgroundImage3() {
      return {
        backgroundImage:
          "url(https://images.unsplash.com/photo-1596547321335-d35f7b1bc8e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1123&q=80)"
      };
    }
  },
  methods: {
    selectBgc(colorName, bgc) {
      this.$emit("selectBgc", bgc , colorName);
      this.makeAllFalse();
      this[colorName] = true;
    },
    makeAllFalse() {
      for (let color in this._data) {
        this[color] = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/ColorPicker";
</style>