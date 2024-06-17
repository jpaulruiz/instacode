<template>
  <div class="main-container">
    <section>
      <Form 
        name="topic-form"
        @submit="createTopic"
      >
        <input 
          v-model="topic"
          type="text" 
          required
        >
        <button type="submit">Create</button>
      </Form>
    </section>
    <NotFound v-if="response.error" />
    <section
      v-else>
      <Loader v-if="loading" />
      <div v-else>
        <Pagination
          :current="pages.current"
          :total="pages.total"
          @update="updatePage"
        />
        <TopicItems 
          class="main-items"
          :topics="topics" 
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect } from 'vue'
import NotFound from '../components/NotFound.vue'
import request from '../composables/request.ts'
import Pagination from '../components/Pagination.vue'
import TopicItems from '../components/TopicItems.vue'
import Topics from '../stores/topics.ts'
import Loader from '../components/Loader.vue'
import Form from '../components/Form.vue'
import type { Topic, Pages } from '../types/common.ts'

// #region States
interface Response {
  error: string | null
}
const response = reactive<Response>({
  error: ''
})

const pageLimit = 20

const pages = ref<Pages>({ current: 1, total: pageLimit, previous: 1 })
const topic = ref('')
const topics = ref<Topic[]>()
const loading = ref(true)
// #endregion

// #region Methods
const updatePage = (p: number) => {
  pages.value.current = p
}

const createTopic = () => {
  Topics.createTopic({
    name: topic.value,
    guid: crypto.randomUUID()
  })
  topic.value = ''
}
// #endregion

// #region Lifecycle
onMounted(async () => {
  loading.value = true
  const { 
    data, 
    error
  } = await request('https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json')
  
  response.error = error.value
  loading.value = false

  Topics.createTopic(data.value?.topics)
  pages.value.total = Math.ceil(Topics.topics.value.length / pageLimit)
  topics.value = Topics.getTopic.value(pages.value.current, pageLimit)
})
// #endregion

// #region Watchers
watchEffect(() => {
  if (pages.value.current !== pages.value.previous) {
    topics.value = Topics.getTopic.value(pages.value.current, pageLimit)
    pages.value.previous = pages.value.current
  }
  topics.value = Topics.getTopic.value(pages.value.current, pageLimit)
  pages.value.total = Math.ceil(Topics.topics.value.length / pageLimit)
})
// #endregion
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 2rem;
  align-items: center;

  .main-items {
    width: 40vw;
  }
}
</style>