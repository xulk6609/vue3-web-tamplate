<template>
  <div>
    <Table :tableData="tableData" :columnList="columnList">
      <template #header-Shift="{ scope }">
        <div class="text-[red] text-[24px] font-bold">
          {{ scope.item.label }}
        </div>
      </template>

      <template #Shift="{ scope }">
        <div class="text-[red] text-[24px] font-bold">
          {{ scope.row.Shift }}
        </div>
        <div>{{ scope.row.customerName }}</div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Table from '@/components/adTable/index.vue'
import { asyncPool } from '@/utils/common'

const tableData = [
  {
    ProductId: '001',
    ProductionDateTime: new Date(),
    Shift: 1,
    Operator: '003',
    Passed: true
  }
]
const columnList = [
  {
    label: '产品编号',
    prop: 'ProductId',
    width: '130px'
  },
  {
    label: '生产时间',
    prop: 'ProductionDateTime',
    sortable: true
  },
  {
    label: '班次',
    prop: 'Shift'
  },
  {
    label: '操作员',
    prop: 'Operator'
  },
  {
    label: '检测结果',
    prop: 'Passed'
  },
  {
    label: '操作',
    prop: 'Operation'
  }
]

onMounted(() => {
  const timeout = (i) =>
    new Promise((resolve) => setTimeout(() => resolve(i), i))
  asyncPool(2, [1000, 5000, 3000, 2000], timeout).then((results) => {
    console.log(results)
  })
})
</script>

<style lang="scss" scoped></style>
