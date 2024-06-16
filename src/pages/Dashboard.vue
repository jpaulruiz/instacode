<template>
  <NotFound v-if="response.error" />
  <Pagination
    :current="pages.current"
    :total="pages.total"
    @update="updatePage"
  />
  <ul>
    <li 
      v-for="(topic, i) in topics"
      :key="i">
      <span>{{ topic.name }}</span>
      <ul>
        <li 
          v-for="(comment, i) in topic.comments"
          :key="i">
          <span>{{ comment.comment }}</span>
          <span>{{ comment.by }}</span>
          <span>{{ comment.date }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect } from 'vue'
import NotFound from './NotFound.vue'
import request from '../composables/request.ts'
import Pagination from '../components/Pagination.vue'
import Topics from '../stores/topics.ts'
import type { Topic, Pages } from '../types/common.ts'

// #region States
interface Response {
  error: string | null
  isLoading: boolean 
}
const response = reactive<Response>({
  error: '',
  isLoading: false
})

const pageLimit = 20

const pages = ref<Pages>({ current: 1, total: pageLimit, previous: 1 })
const topics = ref<Topic[]>()
// #endregion

// #region Methods
const updatePage = (p: number) => {
  pages.value.current = p
}
// #endregion

// #region Lifecycle
onMounted(async () => {
  const { 
    data, 
    error, 
    isLoading 
  } = await request('https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json')
  
  response.error = error.value
  response.isLoading = isLoading.value

  Topics.createTopic(data.value?.topics)
  pages.value.total = Math.ceil(Topics.topics.value.length / pageLimit)
  topics.value = Topics.getTopic(pages.value.current, pageLimit)
})
// #endregion

// #region Watchers
watchEffect(() => {
  if (pages.value.current !== pages.value.previous) {
    topics.value = Topics.getTopic(pages.value.current, pageLimit)
    pages.value.previous = pages.value.current
  }
})
// #endregion
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
}
li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
}
</style>
