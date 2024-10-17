<template>
  <div>
    测试cancelToken
    <el-button @click="handleTest">开始测试</el-button>
    <el-button @click="handleCancel">取消</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { testCancel } from '@/api/common'
import axios from 'axios'

const request = ref(null)

const handleTest = () => {
  const req = axios.CancelToken.source()
  request.value = req
  testCancel({ username: 'admin', password: '123456' }, request.value.token)
    .then((res) => {})
    .catch((err) => {})
}

const handleCancel = () => {
  request.value.cancel('中断请求')
}

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
