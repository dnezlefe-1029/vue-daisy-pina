<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const login = () => {
  // Implement login logic here
};

</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1" for="email">Email</label>
        <input class="input" type="email" id="email" v-model="email" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1" for="password">Password</label>
        <input class="input" type="password" id="password" v-model="password" required />
      </div>
      <button class="btn" type="submit">Login</button>
    </form>
  </div>
</template>