<template>
  <input
    type="text" 
    :placeholder="placeholder"
    :value="value"
    required
    @keydown.esc="emit('esc', undefined)"
    @keydown.enter="handleInput"
    @focusout="emit('focusout', undefined)"
  >
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  value?: string
  placeholder?: string
}>(), {
  value: '',
  placeholder: ''
})

const emit = defineEmits<{
  update: [string]
  esc: [undefined]
  focusout: [undefined]
}>()

const handleInput = (e: Event) => {
  if (e.target instanceof HTMLInputElement && e.target.value !== '') {
    emit('update', e.target.value as string)
    e.target.value = ''
  }
}
</script>
