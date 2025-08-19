<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import axios from 'axios';

// Delay in milliseconds before moving to next word after correct answer
const timeOutAfterCorrect = 3000;
// Array of words to test typing against
const words = ref<string[]>([]);
// Currently displayed word to type
const word = ref<string>('');
// Two-way binding for input field value
const inputModel = defineModel<string>({default: ''});
// Tracks if current input matches word
const isCorrect = ref<boolean>(false);
// Index of current word in words array
const currentIndex = ref<number>(0);

// Watch the input field value and check if it matches the current word
watch(inputModel, (newValue) => {
  if (newValue === word.value) {
    isCorrect.value = true;
    cycleWord();
  } else {
    isCorrect.value = false;
  }
});

// Function to move to next word after correct answer
const cycleWord = () => {
  setTimeout(() => {
    // Increment index and wrap around if at the end of the array
    currentIndex.value = (currentIndex.value + 1) % words.value.length;
    // Clear input field
    inputModel.value = '';
    // Set new word to display
    word.value = words.value[currentIndex.value];
    // Reset correct status
    isCorrect.value = false;
  }, timeOutAfterCorrect);
};

// Initialize with random word on component mount
onMounted(async () => {
  words.value = await axios.get('http://localhost:8080/api/words').then(response => response.data);
  currentIndex.value = Math.floor(Math.random() * words.value.length);
  word.value = words.value[currentIndex.value];
});

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