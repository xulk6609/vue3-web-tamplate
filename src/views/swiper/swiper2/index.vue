<template>
  <div class="carousel-swiper">
    <top100Carousel :data="rightData" ref="carousel" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import top100Carousel from '@/components/carousel/top100Carousel.vue'
import testImg from '@/assets/images/home/test2.png'

interface RightDataItem {
  mainImage: string
  title: string
  count: string
}

const rightData = ref<RightDataItem[]>([])

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
      },
      {
        mainImage: testImg,
        title: 'Vestido Pin Up Midi Bolinha Rodado Alca de Amarrar 333',
        count: '300w+'
      },
      {
        mainImage: testImg,
        title: 'Vestido Pin Up Midi Bolinha Rodado Alca de Amarrar 333',
        count: '300w+'
      },
      {
        mainImage: testImg,
        title: 'Vestido Pin Up Midi Bolinha Rodado Alca de Amarrar 333',
        count: '300w+'
      }
    ]
  }, 300)
})
</script>

<style lang="scss" scoped>
.top100-carousel {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 10px;
}

.top100-swiper {
  width: 100%;
  height: 100%;
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 380px;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    // &:hover {
    //   .img-mask {
    //     opacity: 1;
    //   }
    // }
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 18px;
    }

    .img-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      z-index: 1;
      box-sizing: border-box;
      border-radius: 18px;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 17px 25px 25px 25px;
      display: flex;
      flex-direction: column;
      // justify-content: flex-end;
      justify-content: space-between;
      box-sizing: border-box;
      opacity: 0;
      transition: all 0.3s;
      .header {
        height: 45px;
        display: flex;
        justify-content: flex-end;
        .header-imgs {
          height: 43px;
          // &:first-child {
          //   margin-right: 16px;
          // }
          + .header-imgs {
            margin-left: 16px;
          }
        }
      }
      .footer {
        height: 70px;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px;
        .footer-name {
          flex: 1;
          line-height: 23px;
          .footer-name-text {
            color: #fff;
          }
        }
        .footer-connect {
          color: #00ffff;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 80px;
          cursor: pointer;
          > span {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
