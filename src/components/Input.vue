<template>
  <input
    type="text" 
    placeholder="Add your comment..."
    required
    @keydown.enter="handleInput"
  >
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  update: [string]
}>()

const handleInput = (e: Event) => {
  if (e.target instanceof HTMLInputElement && e.target.value !== '') {
    emit('update', e.target.value as string)
    e.target.value = ''
  }
}
</script>
