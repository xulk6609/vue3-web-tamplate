<template>
  <div class="top100-carousel">
    <swiper-container
      effect="coverflow"
      :grab-cursor="true"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :space-between="140"
      :loop="true"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      class="top100-swiper"
      :coverflowEffect="{
        rotate: 25,
        stretch: 80,
        scale: 1,
        depth: 160,
        modifier: 1,
        slideShadows: true
      }"
      :pagination="true"
      :navigation="false"
      @swiperrealindexchange="onRealIndexChange"
    >
      <swiper-slide v-for="(item, index) in props.data" :key="index">
        <div class="item-wrap">
          <div class="item-img">
            <img :src="item.mainImage" alt="" />
          </div>
          <div class="item-info">
            <div class="item-info-title">
              <el-text class="footer-name-text" line-clamp="2"
                >123456789135132</el-text
              >
            </div>
            <div class="item-info-sales">
              <div>
                <span
                  >Sales volume:
                  <span class="text-red">{{ item.count }}</span></span
                >
              </div>
              <el-icon class="info-icon"><Right /></el-icon>
            </div>
          </div>

          <div class="group">
            <div>
              <el-image :src="storeImg"></el-image>
            </div>
            <div>
              <el-image :src="orderImg"></el-image>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'

import 'swiper/css/effect-cards'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

defineExpose({
  setItems: (arr: any) => {
    items.value = arr
  }
})

const items = ref([])

const activeIndex = ref(0)
const onRealIndexChange = (e: any) => {
  const [swiper] = e.detail
  activeIndex.value = swiper.realIndex
}
</script>

<style lang="scss" scoped>
// @import 'swiper/css';
// @import 'swiper/css/effect-cards';

// .winner-carousel {
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
// }

// .winner-swiper {
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
// }

// .swiper-slide {
//   width: 100%;
//   height: 100%;
//   // border: 1px solid #000;

//   .item-wrap {
//     width: 100%;
//     height: calc(100% - 40px);
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     background-color: #fff;
//     box-sizing: border-box;
//     padding: 16px 20px 30px 20px;
//     border-radius: 8px;
//     box-shadow: 0 1px 4px 1px hsla(0, 0%, 0%, 0.3);
//     .group {
//       position: absolute;
//       top: 30px;
//       right: 30px;
//       > div {
//         width: 40px;
//         height: 40px;
//         box-shadow: 0px 2px 12px 0px #0000001a;
//         border-radius: 4px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         cursor: pointer;

//         & + div {
//           margin-top: 16px;
//         }
//         &:nth-child(1n) {
//           background-color: #bc0c34;
//         }
//         &:nth-child(2n) {
//           background-color: #000000;
//         }
//       }
//     }
//   }

//   .item-img {
//     flex: 1;
//     min-height: 0;
//     box-sizing: border-box;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     > img {
//       width: 260px;
//       height: 340px;
//       // width: 100%;
//       // height: 100%;
//     }
//   }

//   .item-info {
//     width: 100%;
//     height: 100px;
//     margin-top: 30px;
//     box-sizing: border-box;
//     .item-info-title {
//       font-size: 20px;
//       font-weight: 500;
//     }
//     .item-info-sales {
//       margin-top: 10px;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//     }
//   }
//   .text-red {
//     color: #ff0000;
//   }
//   .info-icon {
//     font-size: 24px;
//     color: #ff0000;
//     padding: 4px;
//     cursor: pointer;
//   }
// }

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
