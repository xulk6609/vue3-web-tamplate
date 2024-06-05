<template>
  <div>
    <canvas id="canvas" width="800" height="700"></canvas>
    <img :src="logoImg" id="my-image" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import logoImg from '@/assets/images/logo.png'
import { fabric } from 'fabric'

const init = () => {
  const canvas = new fabric.Canvas('canvas')
  /*  */
  // 创建一个矩形
  const rect = new fabric.Rect({
    top: 100, // 距离容器顶部 30px
    left: 200, // 距离容器左侧 30px
    width: 100, // 宽 100px
    height: 60, // 高 60px
    fill: 'red' // 填充 红色
  })

  canvas.add(rect)
  rect.animate('angle', '+=100', {
    onChange: canvas.renderAll.bind(canvas),
    duration: 1000,
    easing: fabric.util.ease.easeOutBounce
  })

  /*  */
  /*  */
  // 添加图像
  // var imgElement = document.getElementById('my-image')
  // imgElement.onload = () => {
  //   let imgInstance = new fabric.Image(imgElement, {
  //     left: 100,
  //     top: 100,
  //     angle: 30,
  //     opacity: 0.85
  //   })
  //   canvas.add(imgInstance)
  // }

  // // fabric.Image.fromURL(
  // //   'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  // //   function (img: any) {
  // //     canvas.add(img)
  // //   }
  // // )
  /*  */
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
#canvas {
  border: 1px solid #ccc;
}
</style>
