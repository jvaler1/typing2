<script setup lang="ts">

import {onMounted, ref, watch} from "vue";

const words = ['cat', 'dog', 'mouse']
const word = ref<string|null>(null)
const inputModel = defineModel<string>('')
const isCorrect = ref(false)

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
    const currentIndex = words.indexOf(word.value || '')
    const nextIndex = (currentIndex + 1) % words.length
    word.value = words[nextIndex]
  }, 3000)
}

onMounted(() => {
  word.value = words[0]
})

</script>

<template>
  <span>Please type</span><h1>{{ word }}</h1>
  <input type="text" v-model='inputModel' :class="{ 'correct': isCorrect, 'incorrect': !isCorrect }"/>
  <p></p>
  <span v-if="isCorrect">That is Correct!</span>
  <span v-else>That is Incorrect!</span>
</template>

<style scoped>
.incorrect {
  border-color: red;
}
.correct {
  border-color: green;
}
</style>
