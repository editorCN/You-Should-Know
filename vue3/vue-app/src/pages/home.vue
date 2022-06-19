<script setup>
import { ref } from 'vue'

import TodoList from '../components/TodoList.vue'
import Rate from '../components/Rate.vue'
import Rate1 from '../components/Rate1.vue'
const rate = ref(0)
const onChange = num => rate.value = num
const source = ref(0)
</script>

<template>
  <h1>这是首页</h1>
  <TodoList></TodoList>
  <Rate :value="rate" @change="onChange"></Rate>
  <Rate1 v-model="source">
    评价：
  </Rate1>
</template>

<style>

</style>