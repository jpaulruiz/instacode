<template>
  <Dashboard />
</template>

<script setup lang="ts">
import Dashboard from './pages/Dashboard.vue'
import { useSeoMeta } from '@unhead/vue'
useSeoMeta({
  charset: 'utf-8',
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  title: 'Simple App',
  description: 'onlinejobs exam'
})
</script>

<style scoped>
</style>
