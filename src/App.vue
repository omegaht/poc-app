<template>
  <Navbar />
  <Alert />
  <div class="d-flex justify-content-center align-items-center vh-100">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Alert from '@/components/Alert.vue'
import { RouterView } from 'vue-router'

import './assets/base.css'
</script>
