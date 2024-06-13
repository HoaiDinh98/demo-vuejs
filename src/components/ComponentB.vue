<template>
  <div>
    <img
      :src="'https://cdn2.yame.vn/pimg/ao-khoac-khong-non-vai-thun-thoang-mat-bieu-tuong-dang-vua-the-thao-beginner-09-0023174/db1b4e71-f3d9-3600-595b-001b511fbac4.jpg?w=540&h=756'"
      alt="Zoom Image"
      
      @mouseenter="zoomIn"
      @mouseleave="zoomOut"
      :style="{ transform: `scale(${scale})` }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: '/assets/2.jpg',
      scale: 1
    };
  },
  methods: {
    zoomIn() {
      this.scale = 1.2; 
    },
    zoomOut() {
      this.scale = 1; 
    }
  }
};
</script>

<style scoped>
img {
  margin-top: 100px;
  height: 200px;
  width: 200px;
  transition: transform 0.5s; 
}
</style>