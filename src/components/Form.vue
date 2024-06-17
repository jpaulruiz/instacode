<template>
  <form
    :name="name"
    @submit.prevent="submit"
  >
    <slot />
  </form>
</template>

<script lang="ts" setup>
// #region Props
withDefaults(defineProps<{
  name: string
}>(), {
  name: ''
})
// #endregion

// #region Emits
const emit = defineEmits<{
  submit: [any]
}>()
// #endregion

// #region Methods
const submit = (e: Event) => {
  if (e.target && e.target instanceof HTMLFormElement && e.target.checkValidity()) {
    emit('submit', e.target)
  }
}
// #endregion
</script>