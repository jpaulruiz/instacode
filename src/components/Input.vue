<template>
  <input
    type="text" 
    :placeholder="placeholder"
    :value="value"
    required
    @keydown.enter="handleInput"
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
}>()

const handleInput = (e: Event) => {
  if (e.target instanceof HTMLInputElement && e.target.value !== '') {
    emit('update', e.target.value as string)
    e.target.value = ''
  }
}
</script>
