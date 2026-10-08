<template>
  <div class="graph-page">
    <div class="graph-card">
      <div class="graph-head">
        <div>
          <h2 class="graph-title">知识图谱</h2>
          <p class="graph-desc">
            节点颜色表示类型，连线表示关系。拖拽节点、滚轮缩放，悬停查看说明。
          </p>
        </div>
        <div class="legend" aria-label="节点类型">
          <span v-for="item in categories" :key="item.name" class="legend-item">
            <i class="legend-dot" :style="{ background: item.color }"></i>
            {{ item.name }}
          </span>
        </div>
      </div>
      <div ref="chartRef" class="graph-canvas"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const categories = [
  { name: '主题', color: '#2a78d6' },
  { name: '概念', color: '#eb6834' },
  { name: '实体', color: '#1baf7a' }
]

const nodes = [
  { id: 'kg', name: '知识图谱', category: 0, symbolSize: 64 },
  { id: 'entity', name: '实体', category: 1, symbolSize: 46 },
  { id: 'relation', name: '关系', category: 1, symbolSize: 46 },
  { id: 'attr', name: '属性', category: 1, symbolSize: 46 },
  { id: 'person', name: '人物', category: 2, symbolSize: 36 },
  { id: 'org', name: '组织', category: 2, symbolSize: 36 },
  { id: 'place', name: '地点', category: 2, symbolSize: 36 },
  { id: 'belong', name: '属于', category: 2, symbolSize: 36 },
  { id: 'locate', name: '位于', category: 2, symbolSize: 36 },
  { id: 'name', name: '名称', category: 2, symbolSize: 32 },
  { id: 'time', name: '时间', category: 2, symbolSize: 32 }
]

const links = [
  { source: 'kg', target: 'entity' },
  { source: 'kg', target: 'relation' },
  { source: 'kg', target: 'attr' },
  { source: 'entity', target: 'person' },
  { source: 'entity', target: 'org' },
  { source: 'entity', target: 'place' },
  { source: 'relation', target: 'belong' },
  { source: 'relation', target: 'locate' },
  { source: 'attr', target: 'name' },
  { source: 'attr', target: 'time' },
  { source: 'person', target: 'belong' },
  { source: 'org', target: 'locate' },
  { source: 'place', target: 'name' }
]

const tips: Record<string, string> = {
  知识图谱: '用节点和边描述事物及其关系的结构化网络',
  实体: '图谱中可独立指称的对象',
  关系: '实体之间的有向联系',
  属性: '实体自身携带的特征',
  人物: '实体的一种：自然人',
  组织: '实体的一种：机构、公司、团体',
  地点: '实体的一种：地理位置',
  属于: '从属关系，如人物属于组织',
  位于: '空间关系，如组织位于地点',
  名称: '用来称呼实体的字符串',
  时间: '事件或状态发生的时间点'
}

const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.getInstanceByDom(chartRef.value) ?? echarts.init(chartRef.value)

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fcfcfb',
      borderColor: '#e6e4df',
      borderWidth: 1,
      textStyle: { color: '#0b0b0b', fontSize: 13 },
      extraCssText: 'box-shadow: 0 6px 20px rgba(11,11,11,0.08); border-radius: 8px;',
      formatter: (params: { dataType?: string; name?: string }) => {
        if (params.dataType !== 'node' || !params.name) return ''
        const category = nodes.find((node) => node.name === params.name)
        const kind = category ? categories[category.category].name : ''
        return `<div style="font-weight:600;margin-bottom:4px">${params.name}</div>
          <div style="color:#52514e">${kind} · ${tips[params.name] ?? ''}</div>`
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        draggable: true,
        categories: categories.map((item) => ({
          name: item.name,
          itemStyle: { color: item.color }
        })),
        data: nodes.map((node) => ({
          ...node,
          label: { show: true }
        })),
        links,
        force: {
          repulsion: 420,
          edgeLength: [80, 140],
          gravity: 0.12
        },
        lineStyle: {
          color: '#c3c2b7',
          width: 1.5,
          curveness: 0.08
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 2.5 }
        },
        label: {
          color: '#0b0b0b',
          fontSize: 13,
          fontWeight: 500
        },
        itemStyle: {
          borderColor: '#fcfcfb',
          borderWidth: 2
        }
      }
    ]
  })
}

const onResize = () => chart?.resize()

onMounted(() => {
  initChart()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  chart?.dispose()
  chart = null
})
</script>

<style lang="scss" scoped>
.graph-page {
  height: 100%;
  min-height: 640px;
}

.graph-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fcfcfb;
  border: 1px solid #e6e4df;
  border-radius: 12px;
  padding: 20px 20px 12px;
}

.graph-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.graph-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0b0b0b;
}

.graph-desc {
  margin: 6px 0 0;
  font-size: 13px;
  color: #52514e;
}

.legend {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
  padding-top: 4px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #52514e;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.graph-canvas {
  flex: 1;
  min-height: 520px;
}
</style>
