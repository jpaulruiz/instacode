<template>
  <ul v-if="pages.total > 1" class="pagination">
    <li>
      <a href="#" :class="{ 'page_link': true, 'disabled-link': pages.current === 1 }" @click.prevent="changePage(pages.current - 1)">&lt;</a>
    </li>
    <li v-for="(page, i) in displayPages" :key="i" :class="{ active: pages.current === page || page === '...' }">
      <p v-if="page === '...'" href="#" @click.prevent>...</p>
      <a v-else href="#" @click.prevent="changePage(Number(page))">{{ page }}</a>
    </li>
    <li>
      <a href="#" :class="{ 'page_link': true, 'disabled-link': pages.current === pages.total }" @click.prevent="changePage(pages.current + 1)">&gt;</a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Pages } from '../types/common.ts'

// #region States
const pages = ref<Pages>({ current: 1, total: 20 })
// #endregion

// #region Props
const props = withDefaults(defineProps<Pages>(), {
  current: 1,
  total: 20
})

pages.value = props
// #endregion

// #region Emits
const emit = defineEmits<{
  'update': [number]
}>()
// #endregion

// #region Computed
const displayPages = computed(() => {
  const result = [];
  if (pages.value.total <= 6) {
    for (let i = 1; i <= pages.value.total; i++) {
      result.push(i);
    }
  } else {
    if (pages.value.current <= 3) {
      result.push(...[1, 2, 3, 4, 5], '...', pages.value.total);
    } else if (pages.value.current > pages.value.total - 2) {
      result.push(1, '...', pages.value.total - 5, pages.value.total - 4, pages.value.total - 3, pages.value.total - 2, pages.value.total - 1, pages.value.total);
    } else if (pages.value.current === pages.value.total - 2) {
      result.push(1, '...', pages.value.current - 3, pages.value.current - 2, pages.value.current - 1, pages.value.current, pages.value.current + 1, pages.value.current + 2);
    } else {
      result.push(1, '...', pages.value.current - 2, pages.value.current - 1, pages.value.current, pages.value.current + 1, pages.value.current + 2, '...', pages.value.total);
    }
  }
  return result;
})
// #endregion

// #region Methods
const changePage = (page: number) => {
  if (page >= 1 && page <= pages.value.total) {
    emit('update', page)
  }
}
// #endregion
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
.pagination {
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
}
/* start */
.pagination li {
  padding: 5px;
  list-style-type: none;
  p {
    margin: 0;
  }
}
.pagination a:hover {
  color: #02b5ba;
}
.pagination li.active a {
  color: #02b5ba;
  font-weight: bold;
}
a.disabled-link {
  color: gray; 
  cursor: not-allowed; 
}
a.disabled-link:hover {
  color: gray; 
  cursor: not-allowed; 
}
</style>