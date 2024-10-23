<template>
  <div id="dplayer"></div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue'
import DPlayer from 'dplayer'

const props = defineProps({
  src: {
    type: String,
    default: '',
    required: true // 必须传递 src 属性
  },
  type: {
    type: String,
    default: 'video/mp4'
  },
  // 可以查看视频的时间，为0不限制，超出则暂停
  canSeeTime: {
    type: Number,
    default: 0
  }
})

let dp: any = null

const initVideo = () => {
  dp = new DPlayer({
    container: document.getElementById('dplayer'),
    autoplay: false,
    video: {
      url: 'https://sumaieshop.oss-cn-hangzhou.aliyuncs.com/product/20240920/cf650a3c-dded-4573-84e4-69bd20d72634.mp4',
      pic: 'https://sumaieshop.oss-cn-hangzhou.aliyuncs.com/pod/material/20240920/1726831130839.png'
    }
  })
  dp.seek(100)
  dp.on('timeupdate', handleTimeupdate)
  dp.on('seeked', handleSeeked())
}

const emit = defineEmits(['canSeePause', 'seekedSuccess'])
const handleTimeupdate = () => {
  const currentTime = dp.video.currentTime
  if (currentTime > props.canSeeTime) {
    dp.pause()
    emit('canSeePause')
    dp.seek(props.canSeeTime)
  }
}

const handleSeeked = () => {
  const currentTime = dp.video.currentTime
  if (currentTime > props.canSeeTime) {
    dp.pause()
    dp.seek(props.canSeeTime)
    emit('seekedSuccess')
  }
}

onMounted(() => {
  initVideo()
})
</script>

<style scoped lang="scss">
.ud-video {
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
  }
}
</style>
