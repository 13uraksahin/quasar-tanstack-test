<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')

const submit = () => {
  axios.post('http://localhost:3000/users', {
    name: name.value,
    email: email.value
  })
}
</script>

<template>
  <q-page>
    <q-form @submit="submit">
      <q-input v-model="name" label="Name" />
      <q-input v-model="email" label="Email" />
      <q-btn type="submit" label="Submit" />
    </q-form>
  </q-page>
</template>
