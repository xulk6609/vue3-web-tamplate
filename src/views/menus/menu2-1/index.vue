<template>
  <div class="carousel-swiper">
    <winnerCarousel :data="rightData" ref="carousel" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import winnerCarousel from '@/components/carousel/top100Carousel.vue'
import testImg from '@/assets/images/home/test2.png'

// Import Swiper Vue.js components
// import { SwiperSlide } from 'swiper/vue'

// Import Swiper styles
// import 'swiper/css'
// import 'swiper/css/effect-cards'

onMounted(() => {
  setTimeout(() => {
    rightData.value = [
      {
        mainImage: testImg,
        title: 'Vestido Pin Up Midi Bolinha Rodado Alca de Amarrar 111',
        count: '100w+'
      },
      {
        mainImage: testImg,
        title: 'Vestido Pin Up Midi Bolinha Rodado Alca de Amarrar 222',
        count: '200w+'
      },
      {
        mainImage: testImg,
        title: 'Vestido Pin Up Midi Bolinha Rodado Alca de Amarrar 333',
        count: '300w+'
      }
    ]
  }, 300)
})

const rightData = ref([])
</script>

<style lang="scss" scoped>
// // 局部引入，防止样式污染
// @import 'swiper/css';
// @import 'swiper/css/effect-cards';
.carousel-swiper {
  width: 500px;
  height: 500px;
}

// .swiper-slide {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 18px;
//   font-size: 22px;
//   width: 240px;
//   height: 320px;
//   font-weight: bold;
//   color: #fff;
// }

// .swiper-slide:nth-child(1n) {
//   background-color: rgb(206, 17, 17);
// }

// .swiper-slide:nth-child(2n) {
//   background-color: rgb(0, 140, 255);
// }

// .swiper-slide:nth-child(3n) {
//   background-color: rgb(10, 184, 111);
// }
</style>
