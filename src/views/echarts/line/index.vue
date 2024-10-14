<template>
  <div>
    <div id="main" style="width: 500px; height: 500px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'

const initChart = () => {
  let myChart: any = echarts.getInstanceByDom(
    document.getElementById('main') as any
  )

  if (!myChart) {
    myChart = echarts.init(document.getElementById('main'))
  }

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  myChart.setOption(option)
}

onMounted(() => {
  initChart()
})
</script>

<style lang="scss" scoped></style>
