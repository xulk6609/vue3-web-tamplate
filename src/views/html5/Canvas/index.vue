<template>
  <div>
    <canvas id="canvas" width="800" height="700"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import logoImg from '@/assets/images/logo.png'

const draw = () => {
  var ctx = document.getElementById('canvas').getContext('2d')
  // drawImage(ctx)
  drawCircle(ctx)
}

const drawImage = (ctx: any) => {
  var img = new Image()
  img.onload = function () {
    ctx.drawImage(img, 0, 0)
    ctx.beginPath()
    ctx.moveTo(30, 96)
    ctx.lineTo(70, 66)
    ctx.lineTo(103, 76)
    ctx.lineTo(170, 15)
    ctx.stroke()
  }
  img.src = logoImg
}

const addDragFunc = () => {}

const drawCircle = (ctx: any) => {
  ctx.beginPath()
  ctx.fillStyle = 'pink'
  ctx.arc(400, 300, 50, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath() //结束
}

onMounted(() => {
  draw()
})
</script>

<style lang="scss" scoped>
#canvas {
  border: 1px solid #ccc;
}
</style>
