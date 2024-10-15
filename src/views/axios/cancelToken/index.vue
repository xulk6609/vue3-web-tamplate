<template>
  <div>测试cancelToken</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { testCancel } from '@/api/common'

const getData = () => {
  const postData = {
    username: 'admin',
    password: '123456'
  }
  testCancel(postData).then((res) => {
    console.log('rrrrrrr', res)
  })
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>
