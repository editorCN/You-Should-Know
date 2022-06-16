import {ref, watchEffect} from 'vue'
export const useStorage = (key, value) => {
  let data = ref(localStorage[key] ? JSON.parse(localStorage[key]) : value)
  watchEffect(_ => {
    localStorage[key] = JSON.stringify(data.value)
  })
  return data
}
