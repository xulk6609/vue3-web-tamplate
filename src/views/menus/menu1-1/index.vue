<template>
  <div>menu1-1</div>
</template>

<script setup lang="ts">
var arr = [1, 2, 3, { name: '111', arr: [789] }]
var arr2 = arr.slice()
var arr3 = arr.concat()

arr3[3].arr = 888

console.log(arr)
console.log(arr2)
console.log(arr3)
</script>
