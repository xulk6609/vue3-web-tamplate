<template>
  <div id="mse"></div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue'
import Player from 'xgplayer'
import { Events } from 'xgplayer'
import 'xgplayer/dist/index.min.css'

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

let player: any = null

const initVideo = () => {
  player = new Player({
    id: 'mse',
    url: 'https://sumaieshop.oss-cn-hangzhou.aliyuncs.com/product/20240920/cf650a3c-dded-4573-84e4-69bd20d72634.mp4',
    poster:
      'https://sumaieshop.oss-cn-hangzhou.aliyuncs.com/pod/material/20240920/1726831130839.png',
    height: '100%',
    width: '100%'
  })

  player.on(Events.SEEKING, handleTimeupdate)
  player.on(Events.TIME_UPDATE, handleTimeupdate)
  player.on(Events.SEEKED, handleSeeked)
}

const emit = defineEmits(['canSeePause', 'seekedSuccess'])

const handleSeeking = () => {
  console.log('66666')
  // const currentVideo: any = videoRef.value
  // const videoTime = currentVideo.currentTime.toFixed(2)
  // // 检查标志并处理
  // if (isSeeking.value || props.canSeeTime === 0) return
  // if (videoTime > props.canSeeTime) {
  //   isSeeking.value = true // 设置标志
  //   currentVideo.currentTime = props.canSeeTime
  //   currentVideo.pause()
  //   emit('canSeePause')
  // }
}

const handleTimeupdate = () => {
  console.log('1111')
  // const currentTime = dp.video.currentTime
  // if (currentTime > props.canSeeTime) {
  //   dp.pause()
  //   emit('canSeePause')
  //   dp.seek(props.canSeeTime)
  // }
}

const handleSeeked = () => {
  console.log('2222')
  // const currentTime = dp.video.currentTime
  // if (currentTime > props.canSeeTime) {
  //   dp.pause()
  //   dp.seek(props.canSeeTime)
  //   emit('seekedSuccess')
  // }
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
