<script setup lang="ts">

import {onMounted, ref, watch} from "vue";

const timeOutAfterCorrect = 3000;
const words = ['cat', 'dog', 'mouse']
const word = ref<string>('')
const inputModel = defineModel<string>( { default: '' })
const isCorrect = ref<boolean>(false)
const currentIndex = ref<number>(0)

watch(inputModel, (newValue) => {
  if (newValue === word.value) {
    isCorrect.value = true
    cycleWord()
  } else {
    isCorrect.value = false
  }
})

const cycleWord = () => {
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % words.length
    inputModel.value = ''
    word.value = words[currentIndex.value]
    isCorrect.value = false
  }, timeOutAfterCorrect)
}

onMounted(() => {
  currentIndex.value = Math.floor(Math.random() * words.length)
  word.value = words[currentIndex.value]
})

</script>

<template>
  <span>Please type</span><h1>{{ word }}</h1>
  <input type="text" v-model='inputModel'
         :class="{ 'border-green-500': isCorrect, 'border border-red-500': !isCorrect }"/><p></p>
  <span v-if="isCorrect">That is Correct!</span>
  <span v-else>That is Incorrect!</span>
</template>
