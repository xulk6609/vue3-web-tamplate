<template>
  <div class="ud-video">
    <video
      v-bind="{ ...$attrs }"
      ref="videoRef"
      @seeking="handleSeeking"
      @timeupdate="handleTimeupdate"
      @seeked="handleSeeked"
    >
      <!-- 这里将事件传递给 video -->
      <source :src="src" :type="type" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, nextTick } from 'vue'

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
  },
  seekTime: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['canSeePause', 'seekedSuccess'])
const isSeeking = ref(false)
const videoRef = ref(null)

const handleSeeking = () => {
  const currentVideo: any = videoRef.value
  const videoTime = currentVideo.currentTime.toFixed(2)

  // 检查标志并处理
  if (isSeeking.value || props.canSeeTime === 0) return

  if (videoTime > props.canSeeTime) {
    isSeeking.value = true // 设置标志
    currentVideo.currentTime = props.canSeeTime
    currentVideo.pause()
    emit('canSeePause')
  }
}

const handleTimeupdate = (event) => {
  const currentVideo: any = videoRef.value
  const videoTime = currentVideo.currentTime.toFixed(2)

  // 检查标志并处理
  if (isSeeking.value) {
    currentVideo.pause()
    emit('canSeePause')
    event.preventDefault()
  }
  if (videoTime > props.canSeeTime) {
    isSeeking.value = true // 设置标志
    currentVideo.currentTime = props.canSeeTime
    currentVideo.pause()
  }
}

const handleSeeked = () => {
  const currentVideo: any = videoRef.value
  if (isSeeking.value) {
    currentVideo.pause()
    currentVideo.currentTime = props.canSeeTime // 重新设置时间
    isSeeking.value = false // 重置标志
  }
  emit('seekedSuccess')
}

watch(
  () => props.seekTime,
  () => {
    nextTick(() => {
      const currentVideo: any = videoRef?.value
      if (currentVideo) {
        currentVideo.currentTime = props.seekTime
      }
    })
  },
  {
    immediate: true
  }
)

// 这里可以添加 videoRef 的时间更新监听
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
