<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: async () => await axios.get('http://localhost:3000/posts')
})

onMounted(() => {
  console.log('client - data: ', data)
})
</script>

<template>
  <q-page>
    <q-page-sticky position="top" expand>
      <q-btn square unelevated icon="add" color="positive" class="full-width" :to="{ name: 'PostsCreateUnique' }" />
    </q-page-sticky>

    <q-list style="padding-top: 36px;">
      <q-item v-for="post in data" :key="post.id" :to="{ name: 'PostsUpdateUnique', params: { id: post.id } }">
        <q-item-section>
          <q-item-label>{{ post.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
