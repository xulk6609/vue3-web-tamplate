<template>
  <div></div>
</template>

<script setup lang="ts">
import { Subject, Observer } from '@/utils/common.ts'

let subject = new Subject()
let observer = new Observer()

observer.update = () => {
  console.log('observer update')
}

observer.subscribeTo(subject)

subject.notity()
</script>

<style lang="scss" scoped></style>
