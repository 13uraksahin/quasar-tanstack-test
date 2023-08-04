<script lang="ts">
import { preFetch } from 'quasar/wrappers'
import { useUsers } from 'stores/users.store'

export default {
  preFetch: preFetch(({ store }) => {
    return useUsers(store).fetchAll()
  })
}
</script>

<script setup lang="ts">
const usersStore = useUsers()
</script>

<template>
  <q-page>
    <q-page-sticky position="top" expand>
      <q-btn square unelevated icon="add" color="positive" class="full-width" :to="{ name: 'UsersCreateUnique' }" />
    </q-page-sticky>

    <q-list style="padding-top: 36px;">
      <q-item v-for="user in usersStore.data" :key="user.id" :to="{ name: 'UsersUpdateUnique', params: { id: user.id } }">
        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
