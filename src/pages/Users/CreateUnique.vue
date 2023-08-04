<script setup lang="ts">
import { useUsers } from 'stores/users.store'

const usersStore = useUsers()

usersStore.cleanSelected()
</script>

<template>
  <q-page>
    <q-form @submit="usersStore.create">
      <q-input v-model="usersStore.mutateName" label="Name" />
      <q-input v-model="usersStore.mutateEmail" label="Email" />
      <q-btn type="submit" label="Submit" />
    </q-form>
  </q-page>
</template>
