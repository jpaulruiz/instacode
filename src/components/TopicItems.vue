<template>
  <ul class="topics">
    <li 
      v-for="(topic, i) in topics"
      :key="i">
      <h2>{{ `&#x3010;${topic.name.trim()}&#x3011;` }}</h2>
      <ul class="comments">
        <li 
          v-for="(comment, i) in topic.comments"
          :key="i">
          <p>{{ comment.comment }}</p>
          <p>{{ `&mdash; ${comment.by} ~ ${formatDate(comment.date)}`}}</p>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Topic } from '../types/common.ts'

// #region Interfaces
interface Props {
  topics?: Topic[]
}
// #endregion

// #region Props
withDefaults(defineProps<Props>(), {
  topics: undefined
})
// #endregion

// #region Methods
const formatDate = (date: string) => {
  const format = new Date(date)
  return `${format.getMonth()}/${format.getDate()}/${format.getFullYear()}`
}
// #endregion
</script>

<style scoped>
.topics {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li > h2 {
   text-align: center; 
  }
}

.topics > li > ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comments > li > p:nth-child(2) {
  text-align: right;
  font-style: italic;
  font-weight: 100;
}

li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem;
}
</style>