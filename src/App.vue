<script setup lang="ts">

import {onMounted, ref, watch} from "vue";

// Delay in milliseconds before moving to next word after correct answer
const timeOutAfterCorrect = 3000;
// Array of words to test typing against
const words = ['cat', 'dog', 'mouse']
// Currently displayed word to type
const word = ref<string>('')
// Two-way binding for input field value
const inputModel = defineModel<string>({default: ''})
// Tracks if current input matches word
const isCorrect = ref<boolean>(false)
// Index of current word in words array
const currentIndex = ref<number>(0)

// Watch input field value and check if it matches current word
watch(inputModel, (newValue) => {
  if (newValue === word.value) {
    isCorrect.value = true
    cycleWord()
  } else {
    isCorrect.value = false
  }
})

// Function to move to next word after correct answer
const cycleWord = () => {
  setTimeout(() => {
    // Increment index and wrap around if at end of array
    currentIndex.value = (currentIndex.value + 1) % words.length
    // Clear input field
    inputModel.value = ''
    // Set new word to display
    word.value = words[currentIndex.value]
    // Reset correct status
    isCorrect.value = false
  }, timeOutAfterCorrect)
}

// Initialize with random word on component mount
onMounted(() => {
  currentIndex.value = Math.floor(Math.random() * words.length)
  word.value = words[currentIndex.value]
})

</script>

<template>
  <span>Please type</span>
  <h1>{{ word }}</h1>
  <input type="text" v-model='inputModel'
         :class="{ 'border-green-500': isCorrect, 'border border-red-500': !isCorrect }"/>
  <p></p>
  <span v-if="isCorrect">That is Correct!</span>
  <span v-else>That is Incorrect!</span>
</template>