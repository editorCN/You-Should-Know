<script setup>
import { computed } from '@vue/reactivity'
import { ref, watch } from 'vue'
const title = ref('')
const todoList = ref(localStorage['todoList'] ? JSON.parse(localStorage['todoList']) : [])
const add = _ => {
  todoList.value.push({title: title.value, done: false})
  title.value = ''
}
const clear = _ => {
  todoList.value = todoList.value.filter(todo => !todo.done)
}
const unfinished = computed(_ => todoList.value.filter(todo => !todo.done).length)
const all = computed(_ => todoList.value.length)
const allDone = computed({
  get () {
    return unfinished.value === 0
  },
  set (val) {
    todoList.value.forEach(todo => todo.done = val)
  }
})
watch(todoList, (newValue) => {
  localStorage['todoList'] = JSON.stringify(newValue)
}, {deep: true})
</script>

<template>
  <input type="text" v-model="title" placeholder="请输入内容" @keydown.enter="add">
  <button v-if="unfinished < all" @click="clear">清理</button>
  <ul v-if="all">
    <li v-for="todo in todoList">
      <input type="checkbox" v-model="todo.done">
      <span :class="{done: todo.done}">{{todo.title}}</span>
    </li>
    <li>
      <input type="checkbox" v-model="allDone">
      <span>{{unfinished}}/{{all}}</span>
    </li>
  </ul>
  <div v-else>暂无数据</div>
</template>

<style>
.done {
  text-decoration: line-through;
  color: #777777;
}
</style>