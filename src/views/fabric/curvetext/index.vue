<template>
  <div class="page">
    <div class="left">
      <!-- fontSize -->
      <label class="title">FontSize: {{ textInfo.fontSize }}</label>
      <el-slider v-model="textInfo.fontSize" :min="0" :max="60" :step="1" />
      <!-- curve -->
      <label class="title">Bending: {{ textInfo.curve }}</label>
      <el-slider v-model="textInfo.curve" :min="0" :max="360" :step="1" />
      <!-- spacing -->
      <label class="title">Spacing: {{ textInfo.charSpacing }}</label>
      <el-slider v-model="textInfo.charSpacing" :min="0" :max="100" :step="1" />
      <!-- diameter -->
      <label class="title">Diameter: {{ textInfo.diameter }}</label>
      <el-slider v-model="textInfo.diameter" :min="10" :max="360" :step="1" />
    </div>
    <div class="right">
      <canvas id="canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted, ref } from 'vue'

let canvas = null
const curveData = ref()

const textInfo = ref({
  curve: 0,
  diameter: 30,
  charSpacing: 20,
  fontSize: 36
})

const addListeners = () => {
  // 监听选中对象的事件
  canvas.on('selection:created', (e) => {
    const selectedObject = e.selected[0] // 获取选中的第一个对象
    if (selectedObject) {
      console.log('Selected Object:', selectedObject)
      // 可以访问选中对象的相关属性
      console.log('Type:', selectedObject.type)
      console.log('Text:', selectedObject.text) // 如果是文本对象
      console.log('Font Size:', selectedObject.fontSize)
      console.log('Curve:', selectedObject.curve) // 如果是自定义的 CurveText
      console.log('Diameter:', selectedObject.diameter)
    }
  })

  // 如果需要监听每次选中对象的变化，使用以下事件：
  canvas.on('object:selected', (e) => {
    const selectedObject = e.target
    console.log('Selected Object in object:selected:', selectedObject)
  })
}

const initFabric = () => {
  canvas = new fabric.Canvas('canvas', { width: 1200, height: 780 })

  curveData.value = new fabric.CurveText('Text on a path', {
    textAlign: 'center',
    fontSize: textInfo.value.fontSize,
    curve: textInfo.value.curve,
    diameter: textInfo.value.diameter,
    charSpacing: textInfo.value.charSpacing
  })

  canvas.add(curveData.value)

  addListeners()
}

onMounted(() => {
  initFabric()
})
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 360px;
    margin-right: 20px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 20px;
  }
  .right {
    flex: 1;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .canvas {
      width: 600px;
      height: 600px;
      background-color: #fff;
    }
  }
}

.title {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 18px;
  color: #666666;
}

.text-content {
  margin-left: 5px;
  margin-right: 5px;
  width: 100%;
}
</style>
