<template>
  <div class="particulars">
    <div class="active_name">
      <h1 class="title">Welcome To USAdrop Academy</h1>
      <div class="banner">
        <el-image
          class="banner-img"
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        ></el-image>
      </div>
      <div class="category">
        <div
          v-for="(item, index) in cateList"
          :key="index"
          class="category-item"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="content">
        <div
          class="content-item"
          v-for="(item, index) in videoList"
          :key="index"
        >
          <!-- video -->
          <div class="box">
            <ud-video
              :poster="item.coverUrl"
              :src="item.videoUrl"
              :controls="item.controls"
              controlslist="nodownload nofullscreen noremoteplayback"
              :ref="`video${index}`"
              :canSeeTime="30"
              @mouseover="showControls(index)"
              @mouseleave="hideControls(index)"
              @canSeePause="handleCanSeePause"
            />
          </div>
          <!-- info -->
          <div class="info">
            <div class="title">
              {{ item.videoDesc }}
            </div>
            <div class="group">
              <span>WATCH NOW</span>
              <i class="el-icon-arrow-right group-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UdVideo from '@/components/dpVideo/index.vue'

const upgradeVisible = ref(false)
const cateList = ref([
  { name: 'All' },
  { name: 'Creating a Pro Dropshipping Store' },
  { name: 'Finding Winning Products & Order Fulfillment' },
  { name: 'Facebook Ads Tutorial' },
  { name: 'USAdrop special service' }
])

const videoList = ref([
  {
    id: '1837089578383200256',
    type: 0,
    videoName: 'create your first products',
    videoDesc:
      'This course is a USAdrop overview going into the ins and outs of the supplier.',
    status: 0,
    coverUrl:
      'https://sumaieshop.oss-cn-hangzhou.aliyuncs.com/pod/material/20240920/1726831130839.png',
    videoUrl:
      'https://sumaieshop.oss-cn-hangzhou.aliyuncs.com/product/20240920/cf650a3c-dded-4573-84e4-69bd20d72634.mp4',
    sort: 7,
    playNum: 0,
    controls: false,
    createTime: 1726831261622
  }
])

const showControls = (index) => {
  videoList.value[index].controls = true
}

const hideControls = (index) => {
  videoList.value[index].controls = false
}

const handleCanSeePause = () => {
  upgradeVisible.value = true
}
</script>

<style lang="scss" scoped>
.particulars {
  width: 100%;
  min-height: 100vh;
  background: #eff1f3;
  min-width: 1320px;
  padding-bottom: 32px;
  font-family: 'Regular';
}
.active_name {
  width: 1320px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  padding-bottom: 30px;
  > .title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
  }
  > .banner {
    width: 100%;
    height: 320px;
    border-radius: 10px;
    box-shadow: 2px 7px 8.8px 0px #00000040;

    .banner-img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
  > .category {
    height: 100px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .category-item {
      border-radius: 22px;
      background-color: #15104b;
      color: #fff;
      min-width: 200px;
      height: 34px;
      display: flex;
      padding: 0 20px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  > .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    .content-item {
      height: 400px;
      box-sizing: border-box;
      box-shadow: 2px 7px 8.8px 0px #00000040;
      background-color: #fff;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
    }
    .box {
      height: 55%;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }
    .info {
      flex: 1;
      min-height: 0;
      box-sizing: border-box;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
    }
    .title {
      flex: 1;
      min-height: 0;
      box-sizing: border-box;
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      color: #000;
      display: -webkit-inline-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .group {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #15104b;
      font-weight: bold;
      font-size: 12px;
      padding-top: 10px;
      .group-icon {
        margin-left: 2px;
        font-weight: 800;
      }
    }
  }
}
</style>
