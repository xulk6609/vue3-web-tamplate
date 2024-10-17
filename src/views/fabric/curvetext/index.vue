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
// 引入文字曲线
import { onMounted, ref, watch, nextTick } from 'vue'

let canvas: any = null
let nowSelectObj = {}
let curveData = {}

const textInfo = ref({
  text: 'Text on a path',
  curve: 0,
  diameter: 30,
  charSpacing: 20,
  fontSize: 36
})

watch(
  textInfo.value,
  () => {
    nextTick(() => {
      const info = {
        text: textInfo.value.text,
        curve: textInfo.value.curve,
        diameter: textInfo.value.diameter,
        charSpacing: textInfo.value.charSpacing,
        fontSize: textInfo.value.fontSize
      }
      nowSelectObj.set(info)
      nowSelectObj.setCoords() // 更新坐标
      canvas.renderAll()
    })
  },
  {
    deep: true
  }
)

const addListeners = () => {
  // 监听对象被选中的事件
  canvas.getObjects().forEach((obj) => {
    obj.on('selected', function (e) {
      console.log('对象被选中:', e, obj)
      nowSelectObj = obj
    })
  })
}

const initFabric = () => {
  canvas = new fabric.Canvas('canvas', { width: 1200, height: 780 })
  curveData = new fabric.CurveText(textInfo.value.text, {
    top: 200,
    left: 200,
    id: 0o1,
    fontSize: textInfo.value.fontSize,
    curve: textInfo.value.curve,
    diameter: textInfo.value.diameter,
    charSpacing: textInfo.value.charSpacing
  })

  canvas.add(curveData)
  canvas.renderAll()
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
