<template>
  <div class="top100-carousel">
    <swiper-container
      effect="coverflow"
      :grab-cursor="true"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :space-between="200"
      :initial-slide="2"
      class="top100-swiper"
      :coverflowEffect="{
        rotate: 30,
        stretch: 100,
        scale: 1,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }"
      :pagination="true"
      :navigation="false"
    >
      <swiper-slide
        v-for="(item, index) in items"
        :key="index"
        @click="itemClick(item)"
      >
        <img :src="item.mainImage" />
        <!-- mask -->
        <div class="img-mask">
          <div class="footer">
            <div class="footer-name">
              <el-text class="footer-name-text" line-clamp="2">{{
                productName(item)
              }}</el-text>
            </div>
            <div class="footer-connect" @click.stop="connectData(item)">
              <span>Connect</span>
              <el-icon><CaretRight /></el-icon>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
import { GlobalStore } from '@/store/modules/global.ts'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['didConnectClick', 'didItemClick'])

const globalStore = GlobalStore()

const items: any = computed(() => {
  return props.data
})

const productName = (item: any) => {
  const findTrans = item.goodsTransList?.find(
    (item: any) => item.country === globalStore.language
  )
  if (findTrans) {
    return findTrans.subjectTrans
  }
  return item.subject
}

const itemClick = (item: any) => {
  emits('didItemClick', item)
}

const connectData = (item: any) => {
  emits('didConnectClick', item)
}
</script>

<style lang="scss" scoped>
.top100-carousel {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 40px;
}

.top100-swiper {
  width: 100%;
  height: 100%;
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 350px;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    &:hover {
      .img-mask {
        opacity: 1;
      }
    }
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
      justify-content: flex-end;
      box-sizing: border-box;
      opacity: 0;
      transition: all 0.3s;
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
