//data storage
import { computed, ref } from 'vue'
import type { Topic, Comment } from '../types/common.ts'

// #region States
const topics = ref<Topic[]>([])
// #endregion

// #region Mutations
//topics
const createTopic = (topic: Topic | Topic[]) => {
  if (!Array.isArray(topic)) {
    return topics.value.unshift(topic)
  } else {
    topic.forEach(t => topics.value.unshift(t))
  }
}

const getTopic = computed(() => {
  return (page: number, limit = 20) => {
    const start = (page - 1) * limit
    const end = start + limit
    return topics.value.slice(start, end)
  }
})

const updateTopic = (topic: Topic) => {
  const index = topics.value.findIndex(t => t.guid === topic.guid)
  if (index > -1) {
    topics.value[index] = { ...topics.value[index], name: topic.name }
  }
}

const deleteTopic = (id: string) => {
  const index = topics.value.findIndex(t => t.guid === id)
  if (index > -1) {
    topics.value.splice(index, 1)
  }
}

//comments
const createComment = (id: string, comment: Comment) => {
  const index = topics.value.findIndex(t => t.guid === id)
  if ('comments' in topics.value[index] && topics.value[index].comments) {
    topics.value[index].comments.push(comment)
  } else {
    topics.value[index].comments = []
    topics.value[index].comments.push(comment)
  }
}

const updateComment = (id: string, comment: Comment) => {
  const index = topics.value.findIndex(t => t.guid === id)
  if (index > -1 
    && 'comments' in topics.value[index] 
    && topics.value[index].comments) {
    const cIndex = topics.value[index].comments.findIndex(c => c.date === comment.date && c.by === comment.by)
    if (cIndex !== undefined && cIndex > -1) {
      (topics.value[index].comments)[cIndex] = comment
    }
  }
}

const deleteComment = (id: string, comment: Comment) => {
  const index = topics.value.findIndex(t => t.guid === id)
  if (index > -1) {
    const cIndex = topics.value[index].comments?.findIndex(c => c.date === comment.date && c.by === comment.by)
    if (cIndex !== undefined && cIndex > -1) {
      topics.value[index].comments?.splice(cIndex, 1)
    }
  }
}
// #endregion

export default {
  topics,
  getTopic,

  createTopic,
  updateTopic,
  deleteTopic,

  createComment,
  updateComment,
  deleteComment
}