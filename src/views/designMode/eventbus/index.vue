<template>
  <div></div>
</template>

<script setup lang="ts">
import { EventBus } from '@/utils/common'

const eventBus = new EventBus()

eventBus.on('test', (data) => {
  console.log(data)
})

eventBus.emit('test', 111)
</script>

<style lang="scss" scoped></style>
