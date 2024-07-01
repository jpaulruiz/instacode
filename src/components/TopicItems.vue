<template>
  <ul class="topics">
    <li 
      v-for="(topic, i) in topics"
      :key="i">
      <Input
        v-if="activeTopic === topic.guid"
        ref="inputTopic"
        :value="topic.name"
        placeholder="Press ESC to exit"
        required
        @esc="activeTopic = ''"
        @focusout="activeTopic = ''"
        @update="updateTopic({ ...topic, name: $event })"
      />
      <div
        v-else
        @click="handleTopicUpdate(topic.guid)">
        <h2>{{ `&#x3010;${topic.name.trim()}&#x3011;` }}</h2>
      </div>
      <ul class="comments">
        <li 
          v-for="(comment, i) in topic.comments"
          :key="i">
          <Input
            v-if="activeComment === `${comment.by}${comment.date}`"
            ref="inputComment"
            :value="comment.comment"
            placeholder="Press ESC to exit"
            @esc="activeComment = ''"
            @focusout="activeComment = ''"
            @update="updateComment(topic.guid, { ...comment, comment: $event })"
          />
          <p 
            v-else
            @click="handleCommentUpdate(`${comment.by}${comment.date}`)"
          >
            {{ comment.comment }}
          </p>
          <p>{{ `&mdash; ${comment.by} ~ ${formatDate(comment.date)}`}}</p>
          <button 
            class="delete"
            @click="handleDelete(topic.guid, comment)">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
              <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
            </svg>
          </button>
        </li>
      </ul>
      <button 
        class="delete"
        @click="handleDelete(topic.guid)">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
        </svg>
      </button>
      <div
        class="add-comment">
        <Input
          @update="desc => handleComment(topic.guid, desc)"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Topic, Comment } from '../types/common.ts'
import Topics from '../stores/topics.ts'
import Input from '../components/Input.vue'
import { nextTick, ref } from 'vue'

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

// #region States
const activeTopic = ref('')
const activeComment = ref('')
const inputTopic = ref<InstanceType<typeof Input> | null>(null)
const inputComment = ref<InstanceType<typeof Input> | null>(null)
// #endregion

// #region Methods
const formatDate = (date: string) => {
  const format = new Date(date)
  return `${format.getMonth()}/${format.getDate()}/${format.getFullYear()}`
}

const handleDelete = (id: string, comment?: Comment) => {
  if (comment === undefined) {
    Topics.deleteTopic(id)
  } else {
    Topics.deleteComment(id, comment)
  }
}

const updateTopic = (topic: Topic) => {
  Topics.updateTopic(topic)
  activeTopic.value = ''
}

const handleTopicUpdate = (id: string) => {
  activeTopic.value = id
  nextTick(() => {
    inputTopic.value[0].$el.focus()
  })
}

const handleCommentUpdate = (id: string) => {
  activeComment.value = id
  nextTick(() => {
    inputComment.value[0].$el.focus()
  })
}

const updateComment = (id: string, comment: Comment) => {
  Topics.updateComment(id, comment)
  activeComment.value = ''
}

const handleComment = (id: string, desc: string) => {
  Topics.createComment(id, {
    comment: desc,
    by: 'You',
    date: new Date().toISOString()
  })
}
// #endregion
</script>

<style scoped>
.topics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  li > h2 {
   text-align: center; 
   cursor: pointer;
  }

  input {
    width: 80%;
    margin-bottom: 1rem;
    outline: none;
  }
}

.topics > li {
  background: #fde6e8;

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: inherit;
  }
}

li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 1rem;
}

.comments > li > p:nth-child(2) {
  text-align: right;
  font-style: italic;
  font-weight: 100;
}

.comments {
  p {
    margin: 0;
    padding-right: 2rem;
  }

  li {
    padding: 0.5rem;
  }

  .delete {
    svg {
      width: 20px;
      height: 20px;
    }
  }
}

.delete {
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background-color: inherit;
  cursor: pointer;
  padding: 0;

  svg {
    width: 36px;
    height: 36px;
  }
}

.add-comment {
  margin-top: 2rem;
  
  input {
    width: 98%;
  }
}
</style>