<script lang="ts">
import { preFetch } from 'quasar/wrappers'
import { useUsers } from 'stores/users.store'

export default {
  preFetch: preFetch(({ store, currentRoute }) => {
    return useUsers(store).fetchOne(String(currentRoute.params.id))
  })
}
</script>

<script setup lang="ts">
const usersStore = useUsers()
</script>

<template>
  <q-page>
    <q-form @submit="usersStore.update">
      <q-input v-model="usersStore.mutateName" label="Name" />
      <q-input v-model="usersStore.mutateEmail" label="Email" />
      <q-btn type="submit" label="Submit" />
    </q-form>
  </q-page>
</template>
