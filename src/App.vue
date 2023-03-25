<template>
  <Alert />

  <RouterView />
</template>

<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import { RouterView } from 'vue-router'

import './assets/base.css'
</script>
