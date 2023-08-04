<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const { data } = useQuery({
  queryKey: ['users'],
  queryFn: async () => await axios.get('http://localhost:3000/users')
})

onMounted(() => {
  console.log('client - data: ', data)
})
</script>

<template>
  <q-page>
    <q-page-sticky position="top" expand>
      <q-btn square unelevated icon="add" color="positive" class="full-width" :to="{ name: 'UsersCreateUnique' }" />
    </q-page-sticky>

    <q-list style="padding-top: 100px;">
      <q-item v-for="user in data" :key="user.id">
        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
