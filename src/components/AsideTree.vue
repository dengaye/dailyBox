<script lang="ts" setup>
import { ref, watch } from 'vue'
import BookmarkItem from './BookmarkItem.vue'
import { Bookmark } from '../types/bookmark'
import store from '../store'

defineProps<{
  sourceData: Bookmark[]
}>()

const treeDefaultProps = {
  children: 'children',
  label: 'title',
}

const handleTreeClick = (data: any) => {
  if (data.url) {
    store.updateMarkbookDetail(null)
    window.open(data.url)
  } else {
    store.updateMarkbookDetail(data)
  }
}

const filterText = ref('')
const treeRef = ref()

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})


const filterTreeNode = (value: string, data: any) => {
  if (!value) return true
  return data.title?.includes?.(value)
}

</script>

<template>
  <section class="input-wrapper">
    <el-input v-model="filterText" placeholder="搜索" />
  </section>

  <el-tree
    ref="treeRef"
    :data="sourceData"
    :props="treeDefaultProps"
    @node-click="handleTreeClick"
    :filter-node-method="filterTreeNode"
    node-key="id"
    class="tree"
    :indent="12"
  >
    <template #default="{data}">
      <BookmarkItem :icon-size="14" :bookmark="data" />
    </template>
  </el-tree>
</template>
<style scoped>
.tree {
  margin-top: 10px;
  min-height: calc(100vh - 84px);
  max-height: calc(100vh - 84px);
}
.tree ::v-deep(.el-tree-node__label),
.tree ::v-deep(.el-tree-node__content) {
  height: auto;
  line-height: 26px;
  white-space: break-spaces;
  align-items: baseline;
}

.input-wrapper {
  position: sticky;
  top: 0;
  z-index: 33;
  background-color: var(--el-bg-color-overlay);
}
</style>
