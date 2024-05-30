<template>
  <div>
    <p>组合式函数</p>
    <p>
      Load post id:
      <button v-for="i in 5" @click="id = `${i}`">{{ i }}</button>

      <!-- <el-input v-model="inputVal" v-focus ></el-input> -->
      <input v-model="inputVal" v-focus />

      <div v-if="error" >
        <p>Oops! Error encountered: {{ error.message }}</p>
        <button @click="retry">Retry</button>
      </div>

      <div v-else-if="data"> Data Loaded: <pre>{{ data }}</pre> </div>
      <div v-else >Loading...</div>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toValue } from 'vue'
import { useFetch } from '@/hooks/useFetch'
import { watchEffect } from 'vue';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
const id = ref('1')
const inputVal = ref('')
const url = computed(() => baseUrl + id.value)

const testid = toValue(id)

const { data, error } = useFetch(url)

console.log('iiii', toValue(id))

const retry = () => {
  id.value = ''
  id.value = '1'
}

watchEffect(() => {
  console.log('mmmm', toValue(inputVal))
  console.log('wwwww',toValue(id), testid)
})

</script>

<style lang="scss" scoped></style>
