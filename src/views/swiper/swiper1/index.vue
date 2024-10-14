<template>
  <swiper-container
    :slides-per-view="3"
    :space-between="spaceBetween"
    :centered-slides="true"
    :pagination="{
      hideOnClick: true
    }"
    :breakpoints="{
      768: {
        slidesPerView: 3
      }
    }"
    :loop="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }"
    @swiperrealindexchange="onSlideChange"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { register } from 'swiper/element/bundle'

register()

const spaceBetween = ref(10)
// const onProgress = (e) => {
//   const [swiper, progress] = e.detail
//   console.log(progress)
// }
const onSlideChange = (e) => {
  const [swiper, progress] = e.detail
  // const [swiper, progress] = e.detail
  // console.log('slide changed', swiper.activeIndex)
  console.log('9989', swiper.realIndex)
}
</script>
