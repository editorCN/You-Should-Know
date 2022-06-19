<script setup>
import { computed } from '@vue/reactivity'
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  theme: {
    type: Object,
    default: {
      'orange': '#ff6700'
    }
  }
})
const emits = defineEmits(['change'])
let width = ref(props.value)
const mouseover = i => {
  width.value = i
}
const mouseout = _ => {
  width.value = props.value
}
const fontStyle = computed(_ => `width: ${width.value}em`)
const onRate = num => {
  emits('change', num)
}
</script>

<template>
<!-- {{'★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)}} -->
  <div :style="fontStyle">
    <div class="rate-wrapper" @mouseout="mouseout">
      <span v-for="num in 5" @mouseover="mouseover(num)">☆</span>
      <div :style="fontStyle">
        <span v-for="num in 5" @click="onRate(num)" @mouseover="mouseover(num)">★</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rate-wrapper {
 position: relative;
 display: inline-block;
  div {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
  }
  span {
    font-size: 20px;
  }
}
</style>