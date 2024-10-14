<template>
  <div class="carousel-swiper">
    <swiper-container
      effect="coverflow"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :spaceBetween="10"
      :initialSlide="2"
      :coverflowEffect="{
        rotate: 30,
        stretch: 100,
        scale: 1,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }"
      :pagination="true"
      :navigation="true"
    >
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
      </swiper-slide>

      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
</script>

<style lang="scss" scoped>
.swiper {
  width: 800px;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>
