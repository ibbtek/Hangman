<template>
  <div id="app">
    <Hangman class="text-dark is-text-center"/>
  </div>
</template>

<script>
import Hangman from './components/Hangman.vue'

export default {
  name: 'app',
  components: {
    Hangman
  }
}
</script>
