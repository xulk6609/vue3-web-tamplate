<template>
  <div class="graph-page">
    <div ref="chartRef" class="graph-canvas"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const clusters = [
  { name: '科研机构', color: '#f5a623', size: 34, leaf: 18 },
  { name: '重点企业', color: '#3cb87a', size: 34, leaf: 18 },
  { name: '相关技术', color: '#8fd14f', size: 34, leaf: 18 },
  { name: '相关专家', color: '#1aa6b7', size: 34, leaf: 18 }
]

const leaves: Record<string, string[]> = {
  科研机构: [
    '哈尔滨工业大学',
    '中国科学院上海微系统与信息技术研究所',
    '中国科学院大连化学物理研究所',
    '天津大学',
    '盐城师范学院',
    '电子科技大学中山学院',
    '中国船舶重工集团公司第七一二研究所',
    '武汉船用电力推进装置研究所'
  ],
  重点企业: [
    '江苏乐能电池股份有限公司',
    '双登集团股份有限公司',
    '风帆储能科技有限公司',
    '江苏永达电源股份有限公司',
    '深圳市比亚迪锂电池有限公司',
    '浙江超威电源有限公司',
    '天能电子科技集团有限公司',
    '贵州梅岭电源有限公司'
  ],
  相关技术: [
    '燃料电池',
    '锂电池',
    '比容量',
    '蓄电池',
    '铅蓄电池',
    '铅酸蓄电池',
    '能量密度',
    '超级电容器'
  ],
  相关专家: [
    '曹余良',
    '高立军',
    '吴浩青',
    '石世光',
    '王媛珍',
    '王京亮',
    '丁建民',
    '吴明霞'
  ]
}

const nodes = [
  {
    id: 'root',
    name: '比能量',
    symbolSize: 78,
    category: 0,
    label: { fontSize: 15, fontWeight: 600 }
  },
  ...clusters.flatMap((cluster, index) => {
    const hub = {
      id: cluster.name,
      name: cluster.name,
      symbolSize: cluster.size,
      category: index + 1
    }
    const children = leaves[cluster.name].map((name) => ({
      id: `${cluster.name}-${name}`,
      name,
      symbolSize: cluster.leaf,
      category: index + 1
    }))
    return [hub, ...children]
  })
]

const links = clusters.flatMap((cluster) => [
  { source: 'root', target: cluster.name },
  ...leaves[cluster.name].map((name) => ({
    source: cluster.name,
    target: `${cluster.name}-${name}`
  }))
])

const initChart = () => {
  if (!chartRef.value) return
  chart =
    echarts.getInstanceByDom(chartRef.value) ?? echarts.init(chartRef.value)

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        draggable: true,
        center: ['50%', '50%'],
        categories: [
          { name: '主题', itemStyle: { color: '#2f6fed' } },
          ...clusters.map((cluster) => ({
            name: cluster.name,
            itemStyle: { color: cluster.color }
          }))
        ],
        data: nodes,
        links,
        force: {
          repulsion: 260,
          edgeLength: [46, 120],
          gravity: 0.08,
          friction: 0.6
        },
        lineStyle: {
          color: 'source',
          width: 1.5,
          opacity: 0.85,
          curveness: 0.18
        },
        label: {
          show: true,
          position: 'top',
          distance: 4,
          color: '#4a4a4a',
          fontSize: 12
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 2.5 }
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
  min-height: 680px;
  background: #f7f8fb;
  border-radius: 8px;
}

.graph-canvas {
  width: 100%;
  height: 100%;
  min-height: 680px;
}
</style>
