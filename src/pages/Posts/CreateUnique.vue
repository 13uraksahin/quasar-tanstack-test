<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const title = ref('')
const content = ref('')
const authorId = ref('')

const submit = () => {
  axios.post('http://localhost:3000/posts', {
    title: title.value,
    content: content.value,
    authorId: authorId.value
  })
}
</script>

<template>
  <q-page>
    <q-form @submit="submit">
      <q-input v-model="title" label="Title" />
      <q-input v-model="content" label="Content" />
      <q-input v-model="authorId" label="Author ID" />
      <q-btn type="submit" label="Submit" />
    </q-form>
  </q-page>
</template>
