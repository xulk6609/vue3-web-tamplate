<template>
  <el-table
    :height="height"
    :data="tableData"
    class="aid-table"
    v-loading="loading"
    v-bind="{ ...$attrs }"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
    @sort-change="handleSortChange"
  >
    <el-table-column
      v-for="(item, index) in columnList"
      :key="index"
      :type="item.type"
      :index="item.index"
      :label="item.label"
      :column-key="item.columnKey"
      :prop="item.prop"
      :width="item.width"
      :min-width="item.minWidth"
      :fixed="item.fixed"
      :render-header="
        item.renderHeader &&
        (({ column, $index }) => item.renderHeader({ column, $index }))
      "
      :sortable="item.sortable"
      :sort-method="item.sortMethod && ((a, b) => item.sortMethod(a, b))"
      :sort-by="item.sortBy && ((row, index) => item.sortBy(row, index))"
      :sort-orders="item.sortOrders"
      :resizable="item.resizable"
      :formatter="
        item.formatter &&
        ((row, column, cellValue, index) =>
          item.formatter(row, column, cellValue, index))
      "
      :show-overflow-tooltip="item.showOverflowTooltip"
      :align="item.align"
      :header-align="item.headerAlign"
      :class-name="item.className"
      :label-class-name="item.labelClassName"
      :selectable="
        item.selectable && ((row, index) => item.selectable(row, index))
      "
      :reserve-selection="item.reserveSelection"
      :filters="item.filters"
      :filter-placement="item.filterPlacement"
      :filter-multiple="item.filterMultiple"
      :filter-method="
        item.filterMethod &&
        ((value, row, column) => item.filterMethod(value, row, column))
      "
      :filtered-value="item.filteredValue"
    >
      <template #header="scope">
        <slot :name="'header-' + item.prop" :scope="scope">
          <span>{{ item.label }}</span>
        </slot>
      </template>
      <template #default="scope">
        <slot
          :name="item.prop"
          :scope="scope"
          v-if="!types.includes(item.type)"
        >
          <span>{{ scope.row[item.prop] }}</span>
        </slot>
      </template>
    </el-table-column>
    <template #empty>
      <div class="table-empty">
        <p>
          <el-image
            :src="emptyImg"
            style="width: 100%; height: 100%"
            fit="contain"
          />
        </p>
        <p>There is no content yet. Go and check the balance.</p>
      </div>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { TableProps } from './table.d'
import emptyImg from '@/assets/images/emptydata.png'

/* const props =  */ withDefaults(defineProps<TableProps>(), {
  tableData: () => [],
  columnList: () => [],
  loading: () => false,
  showBorder: true
})

const emit = defineEmits(['selection-change', 'row-click', 'sort-change'])
const types = ['selection', 'index', 'expand']

// 传递事件
const handleSelectionChange = (val: any) => {
  emit('selection-change', val)
}

const handleRowClick = (row: any, column: any, event: any) => {
  emit('row-click', row, column, event)
}

const handleSortChange = ({ column, prop, order }: any) => {
  emit('sort-change', { column, prop, order })
}
</script>

<style lang="scss" scoped>
.aid-table {
  :deep(.el-table__header) {
    color: 'red';
    th {
      color: #43445c;
      background-color: #e9e9ec;
    }
  }
  :deep(.el-table__empty-text) {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    justify-content: center;
  }
  .table-empty {
    width: 400px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    > p:first-child {
      height: calc(100% - 70px);
    }
    > p:last-child {
      height: 70px;
    }
  }
}
</style>
